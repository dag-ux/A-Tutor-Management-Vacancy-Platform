// app/(auth)/register/page.tsx
import Link from "next/link";
import ThemeToggle from "@/app/components/ThemeToggle";
import AuthForm from "@/app/components/AuthForm";
import { GraduationCap, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <header className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#069494] p-1.5 rounded-lg text-white group-hover:scale-105 transition-transform">
              <GraduationCap size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">A+ Tutor</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-[#069494] flex items-center gap-1 transition">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-5xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden grid lg:grid-cols-2">
          <div className="hidden lg:flex flex-col justify-between relative bg-zinc-950 p-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[#069494] opacity-20 blur-[120px] rounded-full translate-y-[-20%] translate-x-[-20%] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-teal-500 opacity-10 blur-[100px] rounded-full translate-y-[20%] translate-x-[20%] pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="bg-[#069494] w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#069494]/30">
                <GraduationCap size={28} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Start Your Journey Today.</h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Create an account to find the perfect tutor or apply for tutoring vacancies.
              </p>
            </div>
          </div>
          
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <AuthForm defaultIsLogin={false} />
          </div>
        </div>
      </main>

      <footer className="w-full py-6 text-center border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-zinc-500">© 2026 A+ Tutor Management. All rights reserved.</p>
      </footer>
    </div>
  );
}