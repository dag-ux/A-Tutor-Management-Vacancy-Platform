// app/actions/review.ts
"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateApplicationStatus(applicationId: string, status: "ACCEPTED" | "REJECTED") {
  // 1. Security Check
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // 2. Update the database
    await prisma.application.update({
      where: { id: applicationId },
      data: { status },
    });
    
    // 3. Refresh the admin dashboard
    revalidatePath("/dashboard/admin");
    return { success: true };
  } catch (error) {
    console.error("Review Error:", error);
    return { success: false, error: "Failed to update status." };
  }
}