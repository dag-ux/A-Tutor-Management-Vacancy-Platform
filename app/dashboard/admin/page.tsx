import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignOutButton from "@/app/components/SignOutButton"; // <-- Import it

export default async function AdminDashboard() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-red-900">Admin Dashboard</h1>
      <p className="text-gray-600 mt-2">Welcome, System Administrator</p>
      <div className="mt-8 p-6 bg-red-50 rounded-lg border border-red-200">
        <h2 className="font-semibold text-lg mb-2">System Overview</h2>
        <p className="text-gray-500">Manage users, vacancies, and tutor assignments here.</p>
      </div>
      
      <SignOutButton /> {/* <-- Add the button here */}
    </div>
  );
}