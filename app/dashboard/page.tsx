// app/dashboard/page.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // 1. Fetch the session on the server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 2. If no session, kick them back to login
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">Welcome, {session.user.name}</h1>
      <p className="mt-2 text-gray-600">
        Your role: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{session.user.role}</span>
      </p>
      
      {/* 3. RBAC Test: Only Admin sees this */}
      {session.user.role === "ADMIN" && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded">
           Admin-only content here!
        </div>
      )}
    </div>
  );
}