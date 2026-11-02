// app/components/SidebarNav.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LayoutDashboard, FileText, PlusCircle, Settings, Briefcase, Users, CheckSquare } from "lucide-react";

export default function SidebarNav({ role }: { role: string }) {
  const searchParams = useSearchParams();
  // Get the current tab from URL, default to "overview"
  const currentTab = searchParams.get("tab") || "overview";
  const basePath = `/dashboard/${role.toLowerCase()}`;

  const getLinkClasses = (tabName: string) => {
    const isActive = currentTab === tabName;
    return `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
      isActive
        ? "bg-[#069494]/10 text-[#069494] font-bold"
        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
    }`;
  };

  return (
    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
      <p className="px-4 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 mt-4">Menu</p>
      
      {/* SHARED LINK: Everyone can see Overview */}
      <Link href={`${basePath}?tab=overview`} className={getLinkClasses("overview")}>
        <LayoutDashboard size={20} /> Overview
      </Link>

      {/* PARENT LINKS */}
      {role === "PARENT" && (
        <>
          <Link href={`${basePath}?tab=requests`} className={getLinkClasses("requests")}>
            <FileText size={20} /> My Requests
          </Link>
          <Link href={`${basePath}?tab=new`} className={getLinkClasses("new")}>
            <PlusCircle size={20} /> Create Request
          </Link>
        </>
      )}

      {/* TUTOR LINKS */}
      {role === "TUTOR" && (
        <>
          <Link href={`${basePath}?tab=vacancies`} className={getLinkClasses("vacancies")}>
            <Briefcase size={20} /> Find Vacancies
          </Link>
          <Link href={`${basePath}?tab=applications`} className={getLinkClasses("applications")}>
            <FileText size={20} /> My Applications
          </Link>
        </>
      )}

      {/* ADMIN LINKS */}
      {role === "ADMIN" && (
        <>
          <Link href={`${basePath}?tab=requests`} className={getLinkClasses("requests")}>
            <CheckSquare size={20} /> Parent Requests
          </Link>
          <Link href={`${basePath}?tab=vacancies`} className={getLinkClasses("vacancies")}>
            <Briefcase size={20} /> Manage Vacancies
          </Link>
          <Link href={`${basePath}?tab=users`} className={getLinkClasses("users")}>
            <Users size={20} /> All Users
          </Link>
        </>
      )}

      {/* SHARED LINK: Settings */}
      <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition font-medium mt-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">
        <Settings size={20} /> Settings
      </Link>
    </nav>
  );
}