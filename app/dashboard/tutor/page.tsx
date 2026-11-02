import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignOutButton from "@/app/components/SignOutButton"; // <-- Import it

export default async function TutorDashboard() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user.role !== "TUTOR") redirect("/dashboard");

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-green-900">Tutor Dashboard</h1>
      <p className="text-gray-600 mt-2">Welcome, {session.user.name}</p>
      <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
        <h2 className="font-semibold text-lg mb-2">Available Vacancies</h2>
        <p className="text-gray-500">No vacancies available right now.</p>
      </div>
      
      <SignOutButton /> {/* <-- Add the button here */}
    </div>
  );
}