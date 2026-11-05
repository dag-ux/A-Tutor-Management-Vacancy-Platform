// app/actions/request.ts
"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { parentRequestSchema } from "@/lib/validations/request";
import { revalidatePath } from "next/cache";

export type RequestActionState =
  | { success: true; message: string }
  | { success: false; error: string };

export async function createParentRequest(
  _prevState: RequestActionState | null,
  formData: FormData
): Promise<RequestActionState> {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session) return { success: false, error: "You must be logged in." };
  if (session.user.role !== "PARENT") return { success: false, error: "Only parents can create requests." };

  // Safely extract values and handle nulls/empties
  const raw = {
    childName: formData.get("childName") || undefined,
    childAge: formData.get("childAge") || undefined,
    gradeLevel: formData.get("gradeLevel"),
    language: formData.get("language") || "English",
    
    subject: formData.get("subject"),
    specificTopics: formData.get("specificTopics") || undefined,
    learningStyle: formData.get("learningStyle") || undefined,
    currentPerformance: formData.get("currentPerformance") || undefined,
    
    genderPreference: formData.get("genderPreference") || "Any",
    mode: formData.get("mode") || "Online",
    
    location: formData.get("location"),
    schedule: formData.get("schedule"),
    duration: formData.get("duration") || undefined,
    budget: formData.get("budget"),
  };

  const parsed = parentRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await prisma.parentRequest.create({
      data: {
        ...parsed.data,
        parentId: session.user.id,
      },
    });

    revalidatePath("/dashboard/parent");
    return { success: true, message: "Request created successfully!" };
  } catch (error) {
    console.error("Request Error:", error);
    return { success: false, error: "Failed to create request." };
  }
}

// Keep your cancelParentRequest function at the bottom...
export async function cancelParentRequest(requestId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "PARENT") return { success: false, error: "Unauthorized" };

  try {
    const request = await prisma.parentRequest.findUnique({ where: { id: requestId } });
    if (!request || request.parentId !== session.user.id) return { success: false, error: "Request not found" };
    if (request.status !== "PENDING") return { success: false, error: "Cannot cancel a processed request." };

    await prisma.parentRequest.delete({ where: { id: requestId } });
    revalidatePath("/dashboard/parent");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to cancel request." };
  }
}