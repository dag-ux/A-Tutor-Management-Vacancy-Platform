import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignOutButton from "@/app/components/SignOutButton"; // <-- Import it

export default async function ParentDashboard() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user.role !== "PARENT") redirect("/dashboard");

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-900">Parent Dashboard</h1>
      <p className="text-gray-600 mt-2">Welcome, {session.user.name}</p>
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="font-semibold text-lg mb-2">Your Tutor Requests</h2>
        <p className="text-gray-500">You haven't requested any tutors yet.</p>
      </div>
      
      <SignOutButton /> {/* <-- Add the button here */}
    </div>
  );
}