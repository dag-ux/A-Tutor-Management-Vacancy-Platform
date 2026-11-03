// app/vacancies/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MapPin, Banknote, GraduationCap, ArrowRight, Briefcase } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function PublicVacanciesPage() {
  // Fetch open vacancies
  const vacancies = await prisma.vacancy.findMany({
    where: { isOpen: true },
    orderBy: { createdAt: "desc" },
  });

  // Check if a user is logged in
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      {/* Simple Navbar */}
      <header className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-[#069494] p-1.5 rounded-lg text-white">
              <GraduationCap size={20} />
            </div>
            <span className="text-xl font-bold">A+ Tutor</span>
          </Link>
          <Link href={session ? "/dashboard" : "/login"} className="text-sm font-semibold bg-zinc-900 text-white dark:bg-white dark:text-black px-4 py-2 rounded-lg hover:opacity-90 transition">
            {session ? "Go to Dashboard" : "Sign In"}
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4">Available Tutoring Jobs</h1>
          <p className="text-zinc-500 text-lg">Browse open vacancies and apply to start teaching today.</p>
        </div>

        {vacancies.length === 0 ? (
          <div className="text-center p-12 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
            <Briefcase size={48} className="mx-auto text-zinc-300 mb-4" />
            <h2 className="text-xl font-bold mb-2">No vacancies available</h2>
            <p className="text-zinc-500">Please check back later for new opportunities.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {vacancies.map((job) => (
              <div key={job.id} className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-4">
                    <span className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg"><GraduationCap size={16} /> {job.gradeLevel}</span>
                    <span className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg"><MapPin size={16} /> {job.location}</span>
                    <span className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg"><Banknote size={16} /> {job.rate} ETB/hr</span>
                  </div>
                  <p className="text-zinc-500 text-sm max-w-2xl">{job.description}</p>
                </div>
                
                {/* The Magic Link: If logged in, go to dashboard, if not, go to register! */}
                <Link 
                  href={session ? `/dashboard/tutor?tab=vacancies` : `/register`} 
                  className="whitespace-nowrap flex items-center gap-2 bg-[#069494] hover:bg-[#057a7a] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md"
                >
                  Apply Now <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}