"use client";

import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import { Accept, FileRejection, useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { BsFileEarmarkRichtext } from "react-icons/bs";
import { MdOutlineFileUpload } from "react-icons/md";
import { twMerge } from "tailwind-merge";

import { useFormField } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { ApiResponse } from "@/types/api";

export type UploadFileProps = {
  sessionIdName: string;
  accept?: Accept;
  maxSizeInBytes?: number;
  uploadType: string;
  onChange?: (file: File) => void;
};

const isClient = typeof window !== "undefined";

const setSessionStorage = (key: string, value: object) => {
  if (isClient) sessionStorage.setItem(key, JSON.stringify(value));
};

const getSessionStorage = (key: string) => {
  if (!isClient) return null;
  const item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

type UploadParams = {
  formData: FormData;
  originalFileName: string;
};

const UploadFile = React.forwardRef<HTMLDivElement, UploadFileProps>(
  (
    { sessionIdName, accept = {}, maxSizeInBytes, uploadType, onChange },
    ref,
  ) => {
    const [uploading, setUploading] = useState(false);
    const { setValue, clearErrors } = useFormContext();
    const { error: formError } = useFormField();

    const { mutateAsync } = useMutation({
      mutationFn: async ({ formData, originalFileName }: UploadParams) => {
        setUploading(true);
        const response = await api.post<ApiResponse<{ path_file: string }>>(
          uploadType,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 60000,
          },
        );
        setUploading(false);
        if (!response.data?.data?.path_file) {
          throw new Error("Invalid response structure");
        }
        const filePath = response.data.data.path_file;
        setValue(sessionIdName, filePath, { shouldValidate: true });
        clearErrors(sessionIdName);
        setSessionStorage(sessionIdName, {
          name: filePath.split("/").pop() || "",
          link: filePath,
          user_file_name: originalFileName,
        });
        return response;
      },
      onSuccess: () => {
        toast({ title: "Upload successful" });
      },
      onError: (error: Error | unknown) => {
        const errorMsg =
          error instanceof Error ? error.message : "Unknown error occurred";
        toast({
          title: "Upload failed",
          description: errorMsg,
          variant: "destructive",
        });
        setUploading(false);
      },
    });

    const onDrop = useCallback(
      async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
        if (fileRejections.length > 0) {
          const firstError = fileRejections[0].errors[0];
          let errorMessage = "";

          if (firstError.code === "file-too-large") {
            const sizeInMB = (maxSizeInBytes || 0) / 1000000;
            errorMessage = `File is larger than ${sizeInMB}MB`;
          } else if (firstError.code === "file-invalid-type") {
            errorMessage = "Invalid filetype. Please upload a valid file.";
          } else {
            errorMessage = firstError.message || "Upload error";
          }

          toast({
            title: "Upload failed",
            description: errorMessage,
            variant: "destructive",
          });

          return;
        }

        if (acceptedFiles.length > 0) {
          const file = acceptedFiles[0];
          const originalFileName = file.name;
          const formData = new FormData();
          formData.append("file", file);
          await mutateAsync({ formData, originalFileName });

          if (typeof onChange === "function") {
            onChange(file);
          }
        }
      },
      [mutateAsync, onChange, maxSizeInBytes],
    );

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: maxSizeInBytes,
      accept,
      multiple: false,
    });

    const storedFile = getSessionStorage(sessionIdName);
    const uploadedFileName =
      storedFile?.user_file_name || acceptedFiles[0]?.name || "";

    const formatAcceptList = (accept?: Accept): string | null => {
      if (!accept) return null;
      const exts = Object.keys(accept).map((type) => {
        const parts = type.split("/");
        return parts.length === 2 ? `.${parts[1]}` : type;
      });
      return exts.join(", ");
    };

    return (
      <div
        ref={ref}
        {...getRootProps()}
        className={twMerge(
          "w-full relative flex cursor-pointer flex-col items-center justify-center rounded-md border border-input bg-background px-4 py-6 text-center text-sm transition-colors hover:bg-muted",
          formError && "border-destructive bg-destructive/10",
        )}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <p className="text-sm font-medium text-foreground">
            Uploading your file, please wait...
          </p>
        ) : uploadedFileName ? (
          <>
            <BsFileEarmarkRichtext className="mb-1 text-2xl text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">
              {uploadedFileName}
            </p>
            <p className="text-xs text-muted-foreground">
              Click or drag & drop to change file
            </p>
          </>
        ) : (
          <>
            <MdOutlineFileUpload className="mb-1 text-2xl text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">
              Click or drag & drop to upload
            </p>

            {(accept || maxSizeInBytes) && (
              <p className="pt-2 text-xs text-muted-foreground">
                {accept && (
                  <>
                    Supported files: {formatAcceptList(accept)}
                    {maxSizeInBytes ? " and " : ""}
                  </>
                )}
                {maxSizeInBytes && (
                  <>Max size: {(maxSizeInBytes / 1_000_000).toFixed(1)}MB</>
                )}
              </p>
            )}
          </>
        )}
      </div>
    );
  },
);

UploadFile.displayName = "UploadFile";
export default UploadFile;
