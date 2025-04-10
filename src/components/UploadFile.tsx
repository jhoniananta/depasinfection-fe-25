"use client";

import { useMutation } from "@tanstack/react-query";
import React, { ReactNode, useCallback, useState } from "react";
import { Accept, FileRejection, useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { BsFileEarmarkRichtext } from "react-icons/bs";
import { MdOutlineFileUpload } from "react-icons/md";
import { twMerge } from "tailwind-merge";

import Typography from "@/components/Typography";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { ApiResponse } from "@/types/api";

type UploadFileProps = {
  id: string;
  accept?: Accept;
  className?: string;
  title: string;
  description?: string | ReactNode;
  isRequired?: boolean;
  variant: "md" | "lg";
  maxSizeInBytes?: number;
  children?: React.ReactNode;
  uploadType?: string;
};

// Fungsi pembantu untuk menyimpan dan mengambil data ke/dari sessionStorage
const setSessionStorage = (key: string, value: object) =>
  sessionStorage.setItem(key, JSON.stringify(value));
const getSessionStorage = (key: string) => {
  const item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

// Tipe untuk parameter mutation: kita akan mengirim objek yang mengemas FormData dan nama file asli.
type UploadParams = {
  formData: FormData;
  originalFileName: string;
};

export default function UploadFile({
  id,

  accept = {},
  className,
  title,
  description,
  isRequired,
  variant,
  maxSizeInBytes,
  children,
  uploadType = "/upload-image",
}: UploadFileProps) {
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const { setValue, clearErrors } = useFormContext();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ formData, originalFileName }: UploadParams) => {
      setUploading(true);
      const response = await api.post<ApiResponse<{ path_file: string }>>(
        uploadType,
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, timeout: 60000 },
      );
      setUploading(false);
      if (!response.data?.data?.path_file) {
        throw new Error("Invalid response structure");
      }
      const filePath = response.data.data.path_file;
      setValue(id, filePath, { shouldValidate: true });
      clearErrors(id);

      setSessionStorage(id, {
        name: filePath.split("/").pop() || "",
        link: filePath,
        user_file_name: originalFileName,
      });
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Upload successful",
      });
    },
    onError: (error: Error | unknown) => {
      const errorMsg =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast({
        title: "Upload failed",
        description: errorMsg,
        variant: "destructive",
      });
      setError(errorMsg);
      setUploading(false);
    },
  });

  // onDrop: menangani file yang diterima atau ditolak
  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const { code, message } = fileRejections[0].errors[0];
        let errorMessage = "";
        if (code === "file-too-large") {
          errorMessage = "Filesize is too big. Please click here to re-upload";
        } else if (code === "file-invalid-type") {
          errorMessage = "Invalid filetype. Please click here to re-upload";
        } else {
          errorMessage = message;
        }
        setError(errorMessage);
      } else if (acceptedFiles.length > 0) {
        setError("");
        const file = acceptedFiles[0];
        const originalFileName = file.name;
        const formData = new FormData();
        formData.append("file", file);
        // Panggil mutation dengan mengirim formData dan nama file asli
        await mutateAsync({ formData, originalFileName });
      }
    },
    [mutateAsync],
  );

  // Konfigurasi Dropzone: hanya menerima satu file dengan ukuran maksimal sesuai properti.
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: maxSizeInBytes,
    accept,
    multiple: false,
  });

  // Jika sudah ada file tersimpan (dari sessionStorage) atau file baru yang diterima
  const storedFile = getSessionStorage(id);
  const uploadedFileName =
    storedFile?.user_file_name || acceptedFiles[0]?.name || "";

  function formatAcceptList(accept?: Accept): string | null {
    if (!accept) return null;
    const exts = Object.keys(accept).map((type) => {
      const parts = type.split("/");
      return parts.length === 2 ? `.${parts[1]}` : type;
    });
    return exts.join(", ");
  }

  return (
    <section className={twMerge(className, "flex w-full flex-col")}>
      <div className="mb-[6px]">
        <Typography
          className={twMerge(
            "text-[16px] md:text-[18px]",
            isRequired
              ? "after:text-danger after:ml-0.5 after:content-['*']"
              : "",
          )}
          weight="semibold"
        >
          {title}
        </Typography>
      </div>
      {children && (
        <div className="mb-2 flex flex-col gap-1">
          <Typography className="ml-1.5 mt-0.5 text-[12px] text-neutral-400 md:text-[12px] lg:text-[12px]">
            File yang telah kamu upload sebelumnya (klik untuk lihat lebih
            detail)
          </Typography>
          <div>{children}</div>
        </div>
      )}
      <div>
        {uploadedFileName || uploading ? (
          <div
            {...getRootProps()}
            className={twMerge(
              "relative flex cursor-pointer flex-row items-center justify-center rounded-2xl bg-[#F4F4F5] hover:bg-neutral-100 max-md:py-[18px]",
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center gap-2 px-4 text-center">
              <BsFileEarmarkRichtext
                className={twMerge("text-xl text-neutral-900 lg:text-2xl")}
              />
              <div className="flex flex-col gap-1">
                {uploading ? (
                  <Typography
                    className={twMerge(
                      "px-4 font-medium text-neutral-900 max-md:text-sm",
                      variant === "md" ? "text-[12px]" : "text-lg",
                    )}
                  >
                    Uploading your file, please wait...
                  </Typography>
                ) : (
                  <>
                    <Typography
                      className={twMerge(
                        "px-4 font-medium text-neutral-900 max-md:text-sm",
                        variant === "md" ? "text-[12px]" : "text-lg",
                      )}
                    >
                      {uploadedFileName}
                    </Typography>
                    <Typography
                      className={twMerge(
                        "text-[12px] text-neutral-400 md:text-[12px] lg:text-[12px]",
                      )}
                    >
                      Click or drag & drop to change file
                    </Typography>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={twMerge(
              "relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-0 max-md:py-[18px]",
              error
                ? "bg-red-200 hover:bg-red-50"
                : "bg-[#F4F4F5] hover:bg-neutral-100",
              variant === "md" ? "py-6" : "py-[18px]",
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <MdOutlineFileUpload
                className={twMerge(
                  `text-xl ${error ? "text-red-700" : "text-neutral-600"} max-md:text-3xl md:text-3xl`,
                )}
              />
              <div className="flex flex-col gap-1">
                <Typography
                  className={twMerge(
                    `px-4 ${error ? "text-red-700" : "text-neutral-600"} max-md:text-sm`,
                    variant === "md" ? "text-[12px]" : "text-lg",
                  )}
                >
                  Click or drag & drop to upload
                </Typography>

                {!error && (
                  <Typography
                    className={twMerge(
                      `px-4 text-[12px] text-neutral-400 md:text-[12px] lg:text-[12px]`,
                    )}
                  >
                    {description}
                  </Typography>
                )}

                {(accept || maxSizeInBytes) && (
                  <Typography
                    className={`px-4 pt-4 text-[12px] ${error ? "text-red-700" : "text-neutral-400"} md:text-[12px] lg:text-[12px]`}
                  >
                    {accept && (
                      <>
                        *Supported files: {formatAcceptList(accept)}
                        {maxSizeInBytes ? " and " : ""}
                      </>
                    )}
                    {maxSizeInBytes && (
                      <>Max size: {(maxSizeInBytes / 1000000).toFixed(1)}MB</>
                    )}
                  </Typography>
                )}

                {error && (
                  <Typography
                    className={twMerge(
                      "px-4 text-[12px] text-red-700 md:text-[12px] lg:text-[12px]",
                    )}
                  >
                    {error}
                  </Typography>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
