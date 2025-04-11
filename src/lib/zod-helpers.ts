import { z } from "zod";

// NIK: 16 digits, NISN: 10 digits
export const nikRegex = /^\d{16}$/;
export const nisnRegex = /^\d{10}$/;
export const nimRegex = /^\d{9,24}$/;

export function zDateFromString(): z.ZodType<Date, z.ZodTypeDef, unknown> {
  return z.preprocess(
    (arg) => {
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
      return undefined;
    },
    z.date({ required_error: "Date is required" }),
  );
}

export const maxFileUploadTypeSize = (options: {
  allowedTypes: string[];
  maxSizeInMB: number;
}) =>
  z.union([
    // Case 1: File object (from input)
    z
      .instanceof(File, { message: "File is required" })
      .refine(
        (file) => {
          const type = file.type.toLowerCase();
          const ext = file.name.split(".").pop()?.toLowerCase() || "";
          return (
            options.allowedTypes.includes(type) ||
            options.allowedTypes.includes(ext)
          );
        },
        {
          message: `File must be one of: ${options.allowedTypes.join(", ")}`,
        },
      )
      .refine((file) => file.size <= options.maxSizeInMB * 1024 * 1024, {
        message: `File must be smaller than ${options.maxSizeInMB}MB`,
      }),

    // Case 2: File path from sessionStorage
    z
      .string()
      .min(1, { message: "File is required" })
      .refine(
        (val) => {
          const ext = val.split(".").pop()?.toLowerCase() ?? "";
          const allowedExts = options.allowedTypes
            .map((t) => t.split("/").pop())
            .filter(Boolean);

          return allowedExts.includes(ext);
        },
        {
          message: "Uploaded file is invalid or missing",
        },
      ),
  ]);
