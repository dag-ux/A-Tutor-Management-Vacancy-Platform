// app/components/PublicFooter.tsx
import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="bg-[#069494] p-1.5 rounded-md text-white">
            <GraduationCap size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">A+ Tutor</span>
        </div>
        <p className="text-zinc-500 text-sm text-center">
          © 2026 A+ Tutor Management. Empowering graduates, supporting parents.
        </p>
        <div className="flex gap-6 text-sm font-medium text-zinc-500">
          <Link href="/about" className="hover:text-black dark:hover:text-white transition">About</Link>
          <Link href="/contact" className="hover:text-black dark:hover:text-white transition">Contact</Link>
          <Link href="/vacancies" className="hover:text-black dark:hover:text-white transition">Jobs</Link>
        </div>
      </div>
    </footer>
  );
}