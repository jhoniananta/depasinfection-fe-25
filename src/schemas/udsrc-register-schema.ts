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
  university: z.string().min(1).max(60, { message: "University is required" }),
  nationality: z
    .string()
    .min(1)
    .max(60, { message: "Nationality is required" }),
  subCompetition: z.string().min(1, { message: "Sub competition is required" }),
  statementLetter: maxFileUploadTypeSize({
    allowedTypes: ["application/pdf"],
    maxSizeInMB: 10,
  }),
});

export const stepLeaderSchema = z.object({
  leaderName: z.string().min(1).max(60, { message: "Leader name is required" }),
  leaderEmail: z
    .string()
    .min(1)
    .max(100, { message: "Leader email must be at most 100 characters" })
    .email({ message: "Invalid email" }),
  leaderNIK: z.string().regex(nikRegex, { message: "NIK must be 16 digits" }),
  leaderNIM: z.string().regex(nimRegex, { message: "NIM must be 9-24 digits" }),
  leaderWhatsApp: z
    .string()
    .min(1)
    .refine((val) => isValidPhoneNumber(val), {
      message: "Invalid WhatsApp number",
    }),
  leaderStudentCard: maxFileUploadTypeSize({
    allowedTypes: ["application/pdf"],
    maxSizeInMB: 10,
  }),
  leaderTwibbonProof: maxFileUploadTypeSize({
    allowedTypes: ["application/pdf"],
    maxSizeInMB: 10,
  }),
});

export const stepMembersSchema = z.object({
  member1Name: z.string().min(1).max(60),
  member1Email: z.string().min(1).max(100).email(),
  member1NIK: z.string().regex(nikRegex, { message: "NIK must be 16 digits" }),
  member1NIM: z
    .string()
    .regex(nimRegex, { message: "NIM must be 9-24 digits" }),
  member1WhatsApp: z
    .string()
    .min(1)
    .refine((val) => isValidPhoneNumber(val), {
      message: "Invalid WhatsApp number",
    }),
  member1StudentCard: maxFileUploadTypeSize({
    allowedTypes: ["application/pdf"],
    maxSizeInMB: 10,
  }),
  member1TwibbonProof: maxFileUploadTypeSize({
    allowedTypes: ["application/pdf"],
    maxSizeInMB: 10,
  }),

  member2Name: z.string().min(1).max(60),
  member2Email: z.string().min(1).max(100).email(),
  member2NIK: z.string().regex(nikRegex, { message: "NIK must be 16 digits" }),
  member2NIM: z
    .string()
    .regex(nimRegex, { message: "NIM must be 9-24 digits" }),
  member2WhatsApp: z
    .string()
    .min(1)
    .refine((val) => isValidPhoneNumber(val), {
      message: "Invalid WhatsApp number",
    }),
  member2StudentCard: maxFileUploadTypeSize({
    allowedTypes: ["application/pdf"],
    maxSizeInMB: 10,
  }),
  member2TwibbonProof: maxFileUploadTypeSize({
    allowedTypes: ["application/pdf"],
    maxSizeInMB: 10,
  }),

  member3Name: z.string().min(1).max(60),
  member3Email: z.string().min(1).max(100).email(),
  member3NIK: z.string().regex(nikRegex, { message: "NIK must be 16 digits" }),
  member3NIM: z
    .string()
    .regex(nimRegex, { message: "NIM must be 9-24 digits" }),
  member3WhatsApp: z
    .string()
    .min(1)
    .refine((val) => isValidPhoneNumber(val), {
      message: "Invalid WhatsApp number",
    }),
  member3StudentCard: maxFileUploadTypeSize({
    allowedTypes: ["application/pdf"],
    maxSizeInMB: 10,
  }),
  member3TwibbonProof: maxFileUploadTypeSize({
    allowedTypes: ["application/pdf"],
    maxSizeInMB: 10,
  }),
});

export const stepPaymentSchema = z.object({
  proofOfTransfer: maxFileUploadTypeSize({
    allowedTypes: [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "jpg",
      "jpeg",
      "png",
      "pdf",
    ],
    maxSizeInMB: 5,
  }),
  bankName: z.string().min(1).max(60, { message: "Bank name is required" }),
  senderEmail: z
    .string()
    .min(1)
    .max(100, { message: "Sender email must be at most 100 characters" })
    .email({ message: "Invalid email" }),
  dateOfTransfer: zDateFromString(),
});
