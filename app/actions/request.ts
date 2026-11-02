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

  const raw = {
    subject: formData.get("subject"),
    gradeLevel: formData.get("gradeLevel"),
    location: formData.get("location"),
    schedule: formData.get("schedule"),
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
    return { success: false, error: "Failed to create request." };
  }
}
// app/actions/request.ts (Add this to the bottom of the file)

export async function cancelParentRequest(requestId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session || session.user.role !== "PARENT") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Find the request first to ensure the parent actually owns it
    const request = await prisma.parentRequest.findUnique({
      where: { id: requestId }
    });

    if (!request || request.parentId !== session.user.id) {
      return { success: false, error: "Request not found or unauthorized" };
    }

    // Only allow cancellation if it's still PENDING
    if (request.status !== "PENDING") {
      return { success: false, error: "Cannot cancel a request that is already processed." };
    }

    await prisma.parentRequest.delete({
      where: { id: requestId }
    });

    revalidatePath("/dashboard/parent");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to cancel request." };
  }
}