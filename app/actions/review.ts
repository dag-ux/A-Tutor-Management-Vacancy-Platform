// app/actions/review.ts
"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateApplicationStatus(applicationId: string, status: "ACCEPTED" | "REJECTED") {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // 1. Fetch the application and its related vacancy
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { vacancy: true }
    });

    if (!application) return { success: false, error: "Application not found." };

    if (status === "ACCEPTED") {
      // 2. Update this application to ACCEPTED
      await prisma.application.update({
        where: { id: applicationId },
        data: { status: "ACCEPTED" },
      });

      // 3. Create the Assignment record
      await prisma.assignment.create({
        data: { applicationId: application.id },
      });

      // 4. Close the Vacancy so no one else can apply
      await prisma.vacancy.update({
        where: { id: application.vacancyId },
        data: { isOpen: false },
      });

      // 5. Update the Parent Request status to ASSIGNED
      if (application.vacancy.requestId) {
        await prisma.parentRequest.update({
          where: { id: application.vacancy.requestId },
          data: { status: "ASSIGNED" },
        });
      }

      // 6. Auto-reject any other pending applications for this same vacancy
      await prisma.application.updateMany({
        where: {
          vacancyId: application.vacancyId,
          id: { not: applicationId },
        },
        data: { status: "REJECTED" },
      });
    } else {
      // If rejected, just update the status
      await prisma.application.update({
        where: { id: applicationId },
        data: { status: "REJECTED" },
      });
    }

    // 7. Refresh all dashboards
    revalidatePath("/dashboard/admin");
    revalidatePath("/dashboard/parent");
    revalidatePath("/dashboard/tutor");
    return { success: true };
    
  } catch (error) {
    console.error("Review Error:", error);
    return { success: false, error: "Failed to update status." };
  }
}