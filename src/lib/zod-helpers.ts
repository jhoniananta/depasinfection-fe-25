// lib/zod-helpers.ts
import { z } from "zod";

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
    });

// NIK: 16 digits, NISN: 10 digits
export const nikRegex = /^\d{16}$/;
export const nisnRegex = /^\d{10}$/;
export const nimRegex = /^\d{9,24}$/;
