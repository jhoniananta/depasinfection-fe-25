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
