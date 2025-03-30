// schemas/udsrc-schemas.ts
import { z } from "zod";

// Step 1: Team Information
export const stepTeamSchema = z.object({
  teamName: z.string().nonempty({ message: "Team name is required" }),
  university: z.string().nonempty({ message: "University is required" }),
  nationality: z.string().nonempty({ message: "Nationality is required" }),
  subCompetition: z
    .string()
    .nonempty({ message: "Sub competition is required" }),
  // Required file upload
  statementLetter: z.instanceof(File),
});

// Step 2: Leader Information
export const stepLeaderSchema = z.object({
  leaderName: z.string().nonempty({ message: "Leader name is required" }),
  leaderEmail: z
    .string()
    .nonempty({ message: "Leader email is required" })
    .email("Invalid email"),
  leaderNIK: z.string().nonempty({ message: "Leader NIK is required" }),
  leaderNIM: z.string().nonempty({ message: "Leader NIM is required" }),
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
  member1NIM: z.string().nonempty({ message: "Member 1 NIM is required" }),
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
  member2NIM: z.string().nonempty({ message: "Member 2 NIM is required" }),
  member2WhatsApp: z
    .string()
    .nonempty({ message: "Member 2 WhatsApp is required" }),
  member2StudentCard: z.instanceof(File),
  member2TwibbonProof: z.instanceof(File),

  member3Name: z.string().nonempty({ message: "Member 3 name is required" }),
  member3Email: z
    .string()
    .nonempty({ message: "Member 3 email is required" })
    .email("Invalid email"),
  member3NIK: z.string().nonempty({ message: "Member 3 NIK is required" }),
  member3NIM: z.string().nonempty({ message: "Member 3 NIM is required" }),
  member3WhatsApp: z
    .string()
    .nonempty({ message: "Member 3 WhatsApp is required" }),
  member3StudentCard: z.instanceof(File),
  member3TwibbonProof: z.instanceof(File),
});

// Step 4: Payment
export const stepPaymentSchema = z.object({
  proofOfTransfer: z.instanceof(File),
  senderName: z.string().nonempty({ message: "Sender name is required" }),
  senderEmail: z
    .string()
    .nonempty({ message: "Sender email is required" })
    .email("Invalid email"),
  dateOfTransfer: z.preprocess(
    (arg) => {
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    },
    z.date({ invalid_type_error: "Date is required" }),
  ),
});

// Full form schema (merging all steps)
export const fullUDSRCSchema = stepTeamSchema
  .merge(stepLeaderSchema)
  .merge(stepMembersSchema)
  .merge(stepPaymentSchema);
