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

export const stepLeaderSchema = z.object({
  leaderName: z
    .string()
    .min(1, { message: "Leader name is required" })
    .max(60, { message: "Leader name must be at most 60 characters" }),
  leaderEmail: z
    .string()
    .min(1, { message: "Leader email is required" })
    .max(100, { message: "Leader email must be at most 100 characters" })
    .email({ message: "Invalid email" }),
  leaderNIK: z
    .string()
    .regex(nikRegex, { message: "NIK must be 16 digits" })
    .optional(),
  leaderNIM: z
    .string()
    .regex(nimRegex, { message: "NIM must be 9-24 digits" })
    .optional(),
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
});

export const stepMembersSchema = z.object({
  member1Name: z
    .string()
    .min(1, { message: "Member 1 name is required" })
    .max(60, { message: "Member 1 must be at most 60 characters" }),
  member1Email: z
    .string()
    .min(1, { message: "Member 1 email is required" })
    .max(100, { message: "Member 1 email must be at most 100 characters" })
    .email({ message: "Invalid email" }),
  member1NIK: z
    .string()
    .regex(nikRegex, { message: "NIK must be 16 digits" })
    .optional(),
  member1NIM: z
    .string()
    .regex(nimRegex, { message: "NIM must be 9-24 digits" })
    .optional(),
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

  member2Name: z
    .string()
    .min(1, { message: "Member 2 name is required" })
    .max(60, { message: "Member 2 must be at most 60 characters" }),
  member2Email: z
    .string()
    .min(1, { message: "Member 2 email is required" })
    .max(100, { message: "Member 2 email must be at most 100 characters" })
    .email({ message: "Invalid email" }),
  member2NIK: z
    .string()
    .regex(nikRegex, { message: "NIK must be 16 digits" })
    .optional(),
  member2NIM: z
    .string()
    .regex(nimRegex, { message: "NIM must be 9-24 digits" })
    .optional(),
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
