// lib/validations/request.ts
import { z } from "zod";

export const parentRequestSchema = z.object({
  subject: z.string().min(2, "Subject is required"),
  gradeLevel: z.string().min(1, "Grade level is required"),
  location: z.string().min(2, "Location is required"),
  schedule: z.string().min(2, "Schedule is required"),
  budget: z.coerce.number().min(1, "Budget must be greater than 0"),
});

export type ParentRequestInput = z.infer<typeof parentRequestSchema>;