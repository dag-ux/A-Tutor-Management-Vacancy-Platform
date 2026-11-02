// app/dashboard/parent/page.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ParentRequestForm from "@/app/components/ParentRequestForm";
import CancelRequestButton from "@/app/components/CancelRequestButton";
import { CheckCircle2, Clock, FileText, MapPin, Calendar, Banknote, PlusCircle, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";

export default async function ParentDashboard({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user.role !== "PARENT") redirect("/dashboard");

  const requests = await prisma.parentRequest.findMany({
    where: { parentId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === "PENDING").length;
  const completedRequests = requests.filter(r => r.status === "ASSIGNED").length;

  const resolvedParams = await searchParams;
  const activeTab = resolvedParams.tab || "overview";

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* ======================================================== */}
      {/* VIEW 1: OVERVIEW TAB                                     */}
      {/* ======================================================== */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Dashboard Overview</h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-1">Welcome back, {session.user.name}. Here is your summary.</p>
            </div>
            <Link href="/dashboard/parent?tab=new" className="flex items-center gap-2 bg-[#069494] hover:bg-[#057a7a] text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-[0_8px_20px_rgba(6,148,148,0.25)] hover:shadow-[0_8px_25px_rgba(6,148,148,0.4)] hover:-translate-y-0.5">
              <PlusCircle size={20} /> New Request
            </Link>
          </div>

          {/* Premium Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="relative overflow-hidden bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/10 transition-colors"></div>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shadow-inner">
                  <FileText size={26} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">Total Requests</p>
                  <h3 className="text-4xl font-extrabold text-zinc-900 dark:text-white">{totalRequests}</h3>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative overflow-hidden bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-yellow-500/10 transition-colors"></div>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-900/10 text-yellow-600 dark:text-yellow-400 rounded-2xl flex items-center justify-center shadow-inner">
                  <Clock size={26} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">Pending</p>
                  <h3 className="text-4xl font-extrabold text-zinc-900 dark:text-white">{pendingRequests}</h3>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative overflow-hidden bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-green-500/10 transition-colors"></div>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-900/10 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center shadow-inner">
                  <CheckCircle2 size={26} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">Assigned</p>
                  <h3 className="text-4xl font-extrabold text-zinc-900 dark:text-white">{completedRequests}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action / Banner */}
          <div className="bg-gradient-to-r from-[#069494] to-teal-600 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Need help with another subject?</h2>
              <p className="text-teal-50 text-lg max-w-lg">Our expert tutors are ready to help you achieve your academic goals. Submit a new request today.</p>
            </div>
            <Link href="/dashboard/parent?tab=new" className="relative z-10 whitespace-nowrap bg-white text-[#069494] hover:bg-zinc-50 px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
              Create Request <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 2: MY REQUESTS LIST TAB                             */}
      {/* ======================================================== */}
      {activeTab === "requests" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">My Requests</h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-1">View and manage all your tutor requests.</p>
            </div>
            <Link href="/dashboard/parent?tab=new" className="hidden sm:flex items-center gap-2 bg-[#069494] hover:bg-[#057a7a] text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md">
              <PlusCircle size={18} /> New Request
            </Link>
          </div>

          {requests.length === 0 ? (
            <div className="p-16 bg-white dark:bg-zinc-900 rounded-3xl text-center border border-zinc-200 dark:border-zinc-800 border-dashed">
              <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-400">
                <FileText size={32} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No requests found</h3>
              <p className="text-zinc-500 text-base max-w-sm mx-auto mb-6">You haven't requested a tutor yet. Create your first request and we will match you with an expert.</p>
              <Link href="/dashboard/parent?tab=new" className="inline-flex items-center gap-2 bg-[#069494] text-white px-6 py-3 rounded-xl font-semibold transition">
                <PlusCircle size={18} /> Create First Request
              </Link>
            </div>
          ) : (
            <div className="grid gap-5">
              {requests.map((req) => (
                <div key={req.id} className="group bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden">
                  
                  {/* Decorative hover accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#069494] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    {/* Left: Subject Info */}
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#069494]/20 to-[#069494]/5 text-[#069494] rounded-2xl flex items-center justify-center font-bold text-2xl shadow-inner border border-[#069494]/10">
                        {req.subject.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-zinc-900 dark:text-white mb-1">{req.subject}</h3>
                        <p className="text-sm font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md inline-block">{req.gradeLevel}</p>
                      </div>
                    </div>

                    {/* Middle: Logistics */}
                    <div className="flex flex-wrap gap-4 md:gap-8 flex-1 md:justify-center">
                      <div className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        <MapPin size={18} className="text-zinc-400" /> {req.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        <Calendar size={18} className="text-zinc-400" /> {req.schedule}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        <Banknote size={18} className="text-zinc-400" /> {req.budget} ETB/hr
                      </div>
                    </div>

                    {/* Right: Status & Actions */}
                    <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-3">
                      <span className={`px-4 py-1.5 text-xs font-bold rounded-full border ${
                        req.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/50' : 
                        req.status === 'VACANCY_CREATED' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/50' :
                        'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/50'
                      }`}>
                        {req.status.replace("_", " ")}
                      </span>
                      
                      {req.status === "PENDING" && (
                        <div className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <CancelRequestButton requestId={req.id} />
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 3: CREATE NEW REQUEST TAB                           */}
      {/* ======================================================== */}
      {activeTab === "new" && (
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <Link href="/dashboard/parent?tab=requests" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-[#069494] mb-6 transition bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg">
              <ArrowLeft size={16} /> Back to Requests
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="text-[#069494]" size={28} />
              <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Create New Request</h1>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">Fill out the details below to request a tutor. We'll match you with the best fit.</p>
          </div>
          
          {/* The Form Component */}
          <ParentRequestForm />
        </div>
      )}

    </div>
  );
}