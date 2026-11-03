// app/actions/application.ts
"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function applyForVacancy(vacancyId: string, phoneNumber: string, coverLetter: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session || session.user.role !== "TUTOR") {
    return { success: false, error: "Only tutors can apply for vacancies." };
  }

  if (!phoneNumber || phoneNumber.trim().length < 9) {
    return { success: false, error: "Please provide a valid phone number." };
  }

  if (!coverLetter || coverLetter.trim().length < 10) {
    return { success: false, error: "Please write a short cover letter (min 10 characters)." };
  }

  try {
    const existingApplication = await prisma.application.findFirst({
      where: { vacancyId, tutorId: session.user.id },
    });

    if (existingApplication) {
      return { success: false, error: "You have already applied for this vacancy." };
    }

    await prisma.application.create({
      data: {
        vacancyId,
        tutorId: session.user.id,
        phoneNumber,
        coverLetter,
        status: "PENDING",
      },
    });

    revalidatePath("/dashboard/tutor");
    return { success: true, message: "Application submitted successfully!" };
    
  } catch (error) {
    console.error("Application Error:", error);
    return { success: false, error: "Failed to submit application." };
  }
}