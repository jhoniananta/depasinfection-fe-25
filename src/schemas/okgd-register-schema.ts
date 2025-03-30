// schemas/udsrc-schemas.ts
import { zDateFromString } from "@/lib/zod-helpers";
import { z } from "zod";

// Step 1: Team Information
export const stepTeamSchema = z.object({
  teamName: z.string().nonempty({ message: "Team name is required" }),
  schoolName: z.string().nonempty({ message: "School is required" }),
  schoolAddress: z.string().nonempty({ message: "School address is required" }),
  integrityPact: z.instanceof(File),
});

// Step 2: Leader Information
export const stepLeaderSchema = z.object({
  leaderName: z.string().nonempty({ message: "Leader name is required" }),
  leaderEmail: z
    .string()
    .nonempty({ message: "Leader email is required" })
    .email("Invalid email"),
  leaderNIK: z.string().nonempty({ message: "Leader NIK is required" }),
  leaderNISN: z.string().nonempty({ message: "Leader NISN is required" }),
  leaderWhatsApp: z
    .string()
    .nonempty({ message: "Leader WhatsApp is required" }),
  leaderStudentCard: z.instanceof(File),
  leaderTwibbonProof: z.instanceof(File),
});

// Step 3: Members Information
export const stepMembersSchema = z.object({
  member1Name: z.string().nonempty({ message: "Member 1 name is required" }),
  member1Email: z
    .string()
    .nonempty({ message: "Member 1 email is required" })
    .email("Invalid email"),
  member1NIK: z.string().nonempty({ message: "Member 1 NIK is required" }),
  member1NISN: z.string().nonempty({ message: "Member 1 NISN is required" }),
  member1WhatsApp: z
    .string()
    .nonempty({ message: "Member 1 WhatsApp is required" }),
  member1StudentCard: z.instanceof(File),
  member1TwibbonProof: z.instanceof(File),

  member2Name: z.string().nonempty({ message: "Member 2 name is required" }),
  member2Email: z
    .string()
    .nonempty({ message: "Member 2 email is required" })
    .email("Invalid email"),
  member2NIK: z.string().nonempty({ message: "Member 2 NIK is required" }),
  member2NISN: z.string().nonempty({ message: "Member 2 NISN is required" }),
  member2WhatsApp: z
    .string()
    .nonempty({ message: "Member 2 WhatsApp is required" }),
  member2StudentCard: z.instanceof(File),
  member2TwibbonProof: z.instanceof(File),
});

// Step 4: Teacher Information
export const stepTeacherSchema = z.object({
  teacherName: z.string().nonempty({ message: "Teacher name is required" }),
  teacherEmail: z
    .string()
    .nonempty({ message: "Teacher email is required" })
    .email("Invalid email"),
  teacherWhatsApp: z
    .string()
    .nonempty({ message: "Teacher WhatsApp is required" }),
});

// Step 5: Payment
export const stepPaymentSchema = z.object({
  proofOfTransfer: z.instanceof(File),
  senderName: z.string().nonempty({ message: "Sender name is required" }),
  senderEmail: z
    .string()
    .nonempty({ message: "Sender email is required" })
    .email("Invalid email"),
  dateOfTransfer: zDateFromString(),
});

// Full form schema (merging all steps)
export const fullOKGDschema = stepTeamSchema
  .merge(stepLeaderSchema)
  .merge(stepMembersSchema)
  .merge(stepTeacherSchema)
  .merge(stepPaymentSchema);
