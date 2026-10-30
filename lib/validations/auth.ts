// lib/validations/auth.ts
import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
  role: z.enum(["PARENT", "TUTOR"]),
});

export type RegisterInput = z.infer<typeof registerSchema>;