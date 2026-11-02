// app/dashboard/page.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardRouter() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // The Traffic Cop: Route based on role
  switch (session.user.role) {
    case "PARENT":
      redirect("/dashboard/parent");
    case "TUTOR":
      redirect("/dashboard/tutor");
    case "ADMIN":
      redirect("/dashboard/admin");
    default:
      redirect("/login"); // Fallback just in case
  }
}