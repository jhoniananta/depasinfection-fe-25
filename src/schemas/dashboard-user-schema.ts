import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const userProfileSchema = z.object({
  full_name: z
    .string()
    .min(1, { message: "Full name is required" })
    .max(60, { message: "Full name must be at most 60 characters" })
    .regex(/[A-Za-z]/, {
      message: "Team name must contain at least one letter",
    }),
  phone_number: z
    .string()
    .min(1, { message: "WhatsApp Number is required" })
    .refine((val) => isValidPhoneNumber(val), {
      message: "Invalid WhatsApp number",
    }),
});
