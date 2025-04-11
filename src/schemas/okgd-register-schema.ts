// schemas/udsrc-schemas.ts
import {
  maxFileUploadTypeSize,
  nikRegex,
  nisnRegex,
  zDateFromString,
} from "@/lib/zod-helpers";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

// Step 1: Team Information
export const stepTeamSchema = z.object({
  teamName: z
    .string()
    .min(1, { message: "Team name is required" })
    .max(60, { message: "Team name must be at most 60 characters" })
    .regex(/[A-Za-z]/, {
      message: "Team name must contain at least one letter",
    }),
  schoolName: z
    .string()
    .min(1, { message: "School is required" })
    .max(60, { message: "School name must be at most 60 characters" })
    .regex(/[A-Za-z]/, {
      message: "School name must contain at least one letter",
    }),
  schoolAddress: z
    .string()
    .min(20, { message: "School address must be at least 20 characters" })
    .max(120, { message: "School address must be at most 120 characters" }),
  integrityPact: maxFileUploadTypeSize({
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
  leaderNIK: z.string().regex(nikRegex, { message: "NIK must be 16 digits" }),
  leaderNISN: z
    .string()
    .regex(nisnRegex, { message: "NISN must be 10 digits" }),
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
    .max(60, { message: "Member 1 name must be at most 60 characters" }),
  member1Email: z
    .string()
    .min(1, { message: "Member 1 email is required" })
    .max(100, { message: "Member 1 email must be at most 100 characters" })
    .email({ message: "Invalid email" }),
  member1NIK: z.string().regex(nikRegex, { message: "NIK must be 16 digits" }),
  member1NISN: z
    .string()
    .regex(nisnRegex, { message: "NISN must be 10 digits" }),
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
    .max(60, { message: "Member 2 name is required" }),
  member2Email: z
    .string()
    .min(1, { message: "Member 2 email is required" })
    .max(100, { message: "Member 2 email must be at most 100 characters" })
    .email({ message: "Invalid email" }),
  member2NIK: z.string().regex(nikRegex, { message: "NIK must be 16 digits" }),
  member2NISN: z
    .string()
    .regex(nisnRegex, { message: "NISN must be 10 digits" }),
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

export const stepTeacherSchema = z.object({
  teacherName: z
    .string()
    .min(1, { message: "Teacher name is required" })
    .max(60, { message: "Teacher name must be at most 60 characters" }),
  teacherEmail: z
    .string()
    .min(1, { message: "Teacher email is required" })
    .email({ message: "Invalid email" }),
  teacherWhatsApp: z
    .string()
    .min(1, { message: "Teacher WhatsApp is required" })
    .refine((val) => isValidPhoneNumber(val), {
      message: "Invalid WhatsApp number",
    }),
  teacherAgreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to proceed",
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
