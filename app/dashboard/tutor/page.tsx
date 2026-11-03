// app/dashboard/tutor/page.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ApplyForm from "@/app/components/ApplyForm";
import { 
  Briefcase, 
  MapPin, 
  Banknote, 
  FileText,
  Search
} from "lucide-react";

export default async function TutorDashboard({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; id?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user.role !== "TUTOR") redirect("/dashboard");

  const vacancies = await prisma.vacancy.findMany({
    where: { isOpen: true },
    orderBy: { createdAt: "desc" },
  });

  const applications = await prisma.application.findMany({
    where: { tutorId: session.user.id },
    include: { vacancy: true },
    orderBy: { createdAt: "desc" },
  });

  const resolvedParams = await searchParams;
  const activeTab = resolvedParams.tab || "overview";
  const jobId = resolvedParams.id;

  // If the user is on the apply tab, find the specific job they are applying for
  const jobToApply = activeTab === "apply" && jobId 
    ? await prisma.vacancy.findUnique({ where: { id: jobId } }) 
    : null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* ======================================================== */}
      {/* VIEW 1: OVERVIEW TAB                                     */}
      {/* ======================================================== */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Tutor Overview</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">Welcome back, {session.user.name}. Ready to find your next student?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
                  <Briefcase size={26} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">Available Vacancies</p>
                  <h3 className="text-4xl font-extrabold text-zinc-900 dark:text-white">{vacancies.length}</h3>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-900/10 text-green-600 rounded-2xl flex items-center justify-center shadow-inner">
                  <FileText size={26} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">My Applications</p>
                  <h3 className="text-4xl font-extrabold text-zinc-900 dark:text-white">{applications.length}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 2: FIND VACANCIES TAB                               */}
      {/* ======================================================== */}
      {activeTab === "vacancies" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Find Vacancies</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">Browse open tutoring jobs and apply.</p>
          </div>

          {vacancies.length === 0 ? (
            <div className="p-16 bg-white dark:bg-zinc-900 rounded-3xl text-center border border-zinc-200 dark:border-zinc-800 border-dashed">
              <Search size={48} className="mx-auto text-zinc-300 mb-4" />
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No vacancies available</h3>
              <p className="text-zinc-500">Check back later for new tutoring opportunities.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {vacancies.map((vacancy) => {
                const hasApplied = applications.some(app => app.vacancyId === vacancy.id);

                return (
                  <div key={vacancy.id} className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-md transition">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#069494]/10 text-[#069494] rounded-xl flex items-center justify-center font-bold text-xl">
                          {vacancy.subject.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-zinc-900 dark:text-white">{vacancy.title}</h3>
                          <p className="text-sm text-zinc-500">{vacancy.gradeLevel}</p>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{vacancy.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl">
                        <div className="flex items-center gap-2"><MapPin size={16} /> {vacancy.location}</div>
                        <div className="flex items-center gap-2"><Banknote size={16} /> {vacancy.rate} ETB/hr</div>
                      </div>
                    </div>
                    
                    {hasApplied ? (
                      <div className="px-6 py-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-xl text-sm font-semibold w-full md:w-auto text-center border border-zinc-200 dark:border-zinc-700">
                        Applied
                      </div>
                    ) : (
                      // LINK TO THE NEW PAGE FORM (No more Modal)
                      <Link 
                        href={`/dashboard/tutor?tab=apply&id=${vacancy.id}`}
                        className="w-full md:w-auto text-center flex items-center justify-center gap-2 bg-[#069494] hover:bg-[#057a7a] text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-[0_4px_10px_rgba(6,148,148,0.2)]"
                      >
                        Apply Now
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 3: THE FULL PAGE APPLY FORM                         */}
      {/* ======================================================== */}
      {activeTab === "apply" && jobToApply && (
        <ApplyForm vacancyId={jobToApply.id} vacancyTitle={jobToApply.title} />
      )}

      {/* ======================================================== */}
      {/* VIEW 4: MY APPLICATIONS TAB                              */}
      {/* ======================================================== */}
      {activeTab === "applications" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">My Applications</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">Track the status of your job applications.</p>
          </div>

          {applications.length === 0 ? (
            <div className="p-16 bg-white dark:bg-zinc-900 rounded-3xl text-center border border-zinc-200 dark:border-zinc-800 border-dashed">
              <FileText size={48} className="mx-auto text-zinc-300 mb-4" />
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No applications yet</h3>
              <p className="text-zinc-500 mb-6">You haven't applied for any tutoring jobs.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {applications.map((app) => (
                <div key={app.id} className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-white">{app.vacancy.title}</h3>
                    <p className="text-sm text-zinc-500">Applied on {new Date(app.createdAt).toLocaleDateString()}</p>
                  </div>
                  
                  <span className={`px-4 py-1.5 text-xs font-bold rounded-full border ${
                    app.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                    app.status === 'ACCEPTED' ? 'bg-green-50 text-green-700 border-green-200' :
                    app.status === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' :
                    'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {app.status.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}