// app/actions/vacancy.ts
"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createVacancy(requestId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  
  // Security: Only Admins can do this
  if (session?.user.role !== "ADMIN") {
    return { success: false, error: "Unauthorized. Only admins can create vacancies." };
  }

  try {
    // Find the parent request
    const request = await prisma.parentRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) return { success: false, error: "Request not found." };
    if (request.status !== "PENDING") return { success: false, error: "Request already processed." };

    // Create the vacancy linked to the request
    await prisma.vacancy.create({
      data: {
        title: `Tutor needed for ${request.subject}`,
        description: `Looking for a tutor for ${request.gradeLevel} in ${request.location}. Schedule: ${request.schedule}.`,
        subject: request.subject,
        gradeLevel: request.gradeLevel,
        location: request.location,
        rate: request.budget,
        requestId: request.id,
      },
    });

    // Update the request status so it disappears from the "Pending" list
    await prisma.parentRequest.update({
      where: { id: requestId },
      data: { status: "VACANCY_CREATED" },
    });

    revalidatePath("/dashboard/admin");
    return { success: true, message: "Vacancy created successfully!" };
    
  } catch (error) {
    console.error("Vacancy Error:", error);
    return { success: false, error: "Failed to create vacancy." };
  }
}