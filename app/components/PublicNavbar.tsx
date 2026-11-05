// app/components/PublicNavbar.tsx
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function PublicNavbar() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-[#069494] p-2 rounded-lg text-white group-hover:scale-105 transition-transform">
            <GraduationCap size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight">A+ Tutor</span>
        </Link>
        
        <nav className="hidden md:flex gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link href="/" className="hover:text-[#069494] transition">Home</Link>
          <Link href="/about" className="hover:text-[#069494] transition">About Us</Link>
          <Link href="/vacancies" className="hover:text-[#069494] transition">Find Jobs</Link>
          <Link href="/reviews" className="hover:text-[#069494] transition">Reviews</Link>
          <Link href="/contact" className="hover:text-[#069494] transition">Contact</Link>
        </nav>

        <div className="flex items-center gap-6">
          <ThemeToggle />
          <Link href={session ? "/dashboard" : "/login"} className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-[#069494] transition hidden md:block">
            {session ? "Dashboard" : "Sign In"}
          </Link>
          <Link href={session ? "/dashboard" : "/register"} className="bg-[#069494] hover:bg-[#057a7a] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-[0_0_20px_rgba(6,148,148,0.2)]">
            {session ? "Go to App" : "Get Started"}
          </Link>
        </div>
      </div>
    </header>
  );
}