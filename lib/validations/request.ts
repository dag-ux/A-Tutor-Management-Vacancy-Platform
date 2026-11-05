// lib/validations/request.ts
import { z } from "zod";

export const parentRequestSchema = z.object({
  // Child Info
  childName: z.string().optional(),
  childAge: z.string().optional(),
  gradeLevel: z.string().min(1, "Grade level is required"),
  language: z.string().default("English"),

  // Academic Needs
  subject: z.string().min(2, "Subject is required"),
  specificTopics: z.string().optional(),
  learningStyle: z.string().optional(),
  currentPerformance: z.string().optional(),

  // Preferences
  genderPreference: z.enum(["Any", "Male", "Female"]).default("Any"),
  mode: z.enum(["Online", "In-Person"]).default("Online"),

  // Logistics
  location: z.string().min(2, "Location is required"),
  schedule: z.string().min(2, "Schedule is required"),
  duration: z.string().optional(),
  budget: z.coerce.number().min(1, "Budget must be greater than 0"),
});

export type ParentRequestInput = z.infer<typeof parentRequestSchema>;