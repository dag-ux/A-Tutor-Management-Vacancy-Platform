// app/dashboard/layout.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "@/app/components/ThemeToggle";
import SignOutButton from "@/app/components/SignOutButton";
import SidebarNav from "@/app/components/SidebarNav";
import { GraduationCap } from "lucide-react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const initial = session.user.name ? session.user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col md:flex-row transition-colors duration-300">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col hidden md:flex h-screen sticky top-0">
        
        <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-[#069494] p-1.5 rounded-lg text-white shadow-sm">
              <GraduationCap size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">A+ Tutor</span>
          </Link>
        </div>

        {/* Dynamic Sidebar Links */}
        <SidebarNav role={session.user.role} />

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 p-2 rounded-2xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800/50 mb-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#069494] to-teal-700 flex items-center justify-center text-white font-bold text-sm shadow-md">
                {initial}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full"></div>
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                {session.user.name}
              </p>
              <p className="text-xs font-medium text-zinc-500 truncate capitalize">
                {session.user.role.toLowerCase()}
              </p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="hidden md:block">
            <h2 className="text-zinc-500 dark:text-zinc-400 text-sm">Logged in as <span className="font-bold text-zinc-900 dark:text-white">{session.user.name}</span></h2>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}