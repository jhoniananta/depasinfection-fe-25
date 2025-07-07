// schemas/udsrc-schemas.ts
import {
  maxFileUploadTypeSize,
  nikRegex,
  nimRegex,
  zDateFromString,
} from "@/lib/zod-helpers";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const stepTeamSchema = z.object({
  teamName: z.string().min(1).max(60, { message: "Team name is required" }),
  university: z
    .string()
    .min(1, { message: "University is required" })
    .max(60, { message: "University name must be at most 60 characters" }),
  nationality: z.string().min(1, { message: "Nationality is required" }),
  subCompetition: z.string().min(1, { message: "Sub competition is required" }),
  statementLetter: maxFileUploadTypeSize({
    allowedTypes: ["application/pdf"],
    maxSizeInMB: 5,
  }),
});

export const stepLeaderSchema = z
  .object({
    leaderName: z
      .string()
      .min(1, { message: "Leader name is required" })
      .max(60, { message: "Leader name must be at most 60 characters" }),
    leaderEmail: z
      .string()
      .min(1, { message: "Leader email is required" })
      .max(100, { message: "Leader email must be at most 100 characters" })
      .email({ message: "Invalid email" }),
    // Base type: string, nullable, optional
    leaderNIK: z.string().nullable().optional(),
    leaderNIM: z.string().nullable().optional(),
    leaderWhatsApp: z
      .string()
      .min(1, { message: "Leader WhatsApp is required" })
      .refine((val) => isValidPhoneNumber(val), {
        message: "Invalid WhatsApp number",
      }),
    leaderStudentCard: maxFileUploadTypeSize({
      allowedTypes: [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "jpg",
        "jpeg",
        "png",
      ],
      maxSizeInMB: 5,
    }),
    leaderTwibbonProof: maxFileUploadTypeSize({
      allowedTypes: [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "jpg",
        "jpeg",
        "png",
      ],
      maxSizeInMB: 5,
    }),
    // Include nationality here if it's part of the data being validated by this schema resolver setup
    // This depends on how you configure the resolver in page.tsx
    nationality: z.string().optional(), // Make it optional here as it's primarily defined in stepTeamSchema
  })
  .superRefine((data, ctx) => {
    // Check if nationality is Indonesian
    if (data.nationality === "IDN") {
      // Validate leaderNIK
      if (!data.leaderNIK) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "NIK is required for Indonesian nationality",
          path: ["leaderNIK"],
        });
      } else if (!nikRegex.test(data.leaderNIK)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom, // Or invalid_string if you prefer
          message: "NIK must be 16 digits",
          path: ["leaderNIK"],
        });
      }

      // Validate leaderNIM
      if (!data.leaderNIM) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "NIM is required for Indonesian nationality",
          path: ["leaderNIM"],
        });
      } else if (!nimRegex.test(data.leaderNIM)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom, // Or invalid_string
          message: "NIM must be 5-24 digits",
          path: ["leaderNIM"],
        });
      }
    }
    // No explicit validation needed if nationality is not IDN,
    // as the base types are nullable/optional.
  });

export const stepMembersSchema = z
  .object({
    // Member 1 Fields
    member1Name: z
      .string()
      .min(1, { message: "Member 1 name is required" })
      .max(60, { message: "Member 1 must be at most 60 characters" }),
    member1Email: z
      .string()
      .min(1, { message: "Member 1 email is required" })
      .max(100, { message: "Member 1 email must be at most 100 characters" })
      .email({ message: "Invalid email" }),
    member1NIK: z.string().nullable().optional(), // Base type
    member1NIM: z.string().nullable().optional(), // Base type
    member1WhatsApp: z
      .string()
      .min(1, { message: "Member 1 WhatsApp is required" })
      .refine((val) => isValidPhoneNumber(val), {
        message: "Invalid WhatsApp number",
      }),
    member1StudentCard: maxFileUploadTypeSize({
      allowedTypes: [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "jpg",
        "jpeg",
        "png",
      ],
      maxSizeInMB: 5,
    }),
    member1TwibbonProof: maxFileUploadTypeSize({
      allowedTypes: [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "jpg",
        "jpeg",
        "png",
      ],
      maxSizeInMB: 5,
    }),

    // Member 2 Fields
    member2Name: z
      .string()
      .min(1, { message: "Member 2 name is required" })
      .max(60, { message: "Member 2 must be at most 60 characters" }),
    member2Email: z
      .string()
      .min(1, { message: "Member 2 email is required" })
      .max(100, { message: "Member 2 email must be at most 100 characters" })
      .email({ message: "Invalid email" }),
    member2NIK: z.string().nullable().optional(), // Base type
    member2NIM: z.string().nullable().optional(), // Base type
    member2WhatsApp: z
      .string()
      .min(1, { message: "Member 2 WhatsApp is required" })
      .refine((val) => isValidPhoneNumber(val), {
        message: "Invalid WhatsApp number",
      }),
    member2StudentCard: maxFileUploadTypeSize({
      allowedTypes: [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "jpg",
        "jpeg",
        "png",
      ],
      maxSizeInMB: 5,
    }),
    member2TwibbonProof: maxFileUploadTypeSize({
      allowedTypes: [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "jpg",
        "jpeg",
        "png",
      ],
      maxSizeInMB: 5,
    }),

    // Include nationality for superRefine context
    nationality: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Check if nationality is Indonesian
    if (data.nationality === "IDN") {
      // --- Validate Member 1 NIK ---
      if (!data.member1NIK) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Member 1 NIK is required for Indonesian nationality",
          path: ["member1NIK"],
        });
      } else if (!nikRegex.test(data.member1NIK)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Member 1 NIK must be 16 digits",
          path: ["member1NIK"],
        });
      }

      // --- Validate Member 1 NIM ---
      if (!data.member1NIM) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Member 1 NIM is required for Indonesian nationality",
          path: ["member1NIM"],
        });
      } else if (!nimRegex.test(data.member1NIM)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Member 1 NIM must be 5-24 digits",
          path: ["member1NIM"],
        });
      }

      // --- Validate Member 2 NIK ---
      if (!data.member2NIK) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Member 2 NIK is required for Indonesian nationality",
          path: ["member2NIK"],
        });
      } else if (!nikRegex.test(data.member2NIK)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Member 2 NIK must be 16 digits",
          path: ["member2NIK"],
        });
      }

      // --- Validate Member 2 NIM ---
      if (!data.member2NIM) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Member 2 NIM is required for Indonesian nationality",
          path: ["member2NIM"],
        });
      } else if (!nimRegex.test(data.member2NIM)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Member 2 NIM must be 5-24 digits",
          path: ["member2NIM"],
        });
      }
    }
  });

export const stepPaymentSchema = z.object({
  amount: z.number({ message: "Amount is required" }),
  proofOfTransfer: maxFileUploadTypeSize({
    allowedTypes: [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "jpg",
      "jpeg",
      "png",
    ],
    maxSizeInMB: 5,
  }),
  bankName: z
    .string()
    .min(1, { message: "Bank name is required" })
    .max(60, { message: "Bank name must be at most 60 characters" }),
  senderName: z
    .string()
    .min(1, { message: "Sender name is required" })
    .max(60, { message: "Sender name must be at most 60 characters" }),
  dateOfTransfer: zDateFromString(),
  bankId: z.number({ message: "Payment method is required" }),
});
