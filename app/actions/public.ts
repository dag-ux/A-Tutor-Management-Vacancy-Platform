// app/actions/public.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const reviewSchema = z.object({
  userName: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["Parent", "Tutor"]),
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(10, "Review must be at least 10 characters"),
});

export type ReviewState = { success: boolean; error?: string; message?: string };

export async function submitReview(prevState: ReviewState | null, formData: FormData): Promise<ReviewState> {
  const raw = {
    userName: formData.get("userName"),
    role: formData.get("role"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
  };

  const parsed = reviewSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await prisma.review.create({ data: parsed.data });
    revalidatePath("/");
    return { success: true, message: "Review submitted successfully!" };
  } catch (error) {
    return { success: false, error: "Failed to submit review." };
  }
}