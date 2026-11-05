// app/components/MobileSidebar.tsx
"use client";

import { useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import Link from "next/link";
import SidebarNav from "./SidebarNav";
import SignOutButton from "./SignOutButton";

export default function MobileSidebar({ role, name }: { role: string, name: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const initial = name ? name.charAt(0).toUpperCase() : "U";

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button onClick={() => setIsOpen(true)} className="p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
        <Menu size={24} />
      </button>

      {/* Slide-out Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Dark Backdrop */}
          <div className="fixed inset-0 bg-zinc-950/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          
          {/* Sidebar Content */}
          <div className="relative w-72 bg-white dark:bg-zinc-900 h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="h-20 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <div className="bg-[#069494] p-1.5 rounded-lg text-white">
                  <GraduationCap size={20} />
                </div>
                <span className="text-xl font-bold tracking-tight">A+ Tutor</span>
              </Link>
              <button onClick={() => setIsOpen(false)} className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto" onClick={() => setIsOpen(false)}>
              <SidebarNav role={role} />
            </div>

            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-3 p-2 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#069494] to-teal-700 flex items-center justify-center text-white font-bold text-sm">
                  {initial}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">{name}</p>
                  <p className="text-xs font-medium text-zinc-500 capitalize">{role.toLowerCase()}</p>
                </div>
              </div>
              <SignOutButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}