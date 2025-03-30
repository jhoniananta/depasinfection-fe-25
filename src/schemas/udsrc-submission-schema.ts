// schemas/udsrc-schemas.ts
import { maxFileUploadTypeSize } from "@/lib/zod-helpers";
import { z } from "zod";

export const UDSRCPosterSubmissionSchema = z.object({
  posterFile: maxFileUploadTypeSize({
    allowedTypes: ["application/pdf"],
    maxSizeInMB: 25,
  }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(200, { message: "Description must be at most 200 characters" }),
  validationSheet: maxFileUploadTypeSize({
    allowedTypes: ["application/pdf"],
    maxSizeInMB: 10,
  }),
});

export const UDSRC3MOPSubmissionSchema = z.object({
  abstractFile: maxFileUploadTypeSize({
    allowedTypes: ["application/pdf"],
    maxSizeInMB: 25,
  }),

  validationSheet: maxFileUploadTypeSize({
    allowedTypes: ["application/pdf"],
    maxSizeInMB: 10,
  }),
});

export type UDSRCPosterSubmissionData = z.infer<
  typeof UDSRCPosterSubmissionSchema
>;
export type UDSRC3MOPSubmissionData = z.infer<typeof UDSRC3MOPSubmissionSchema>;
