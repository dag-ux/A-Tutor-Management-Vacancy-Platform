// app/dashboard/parent/page.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ParentRequestForm from "@/app/components/ParentRequestForm";
import CancelRequestButton from "@/app/components/CancelRequestButton";
import { 
  CheckCircle2, Clock, FileText, MapPin, Calendar, Banknote, 
  PlusCircle, ArrowLeft, ArrowRight, ShieldCheck, Phone, UserCheck
} from "lucide-react";

export default async function ParentDashboard({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user.role !== "PARENT") redirect("/dashboard");

  // FETCH REQUESTS INCLUDING THE ACCEPTED TUTOR DETAILS
  const requests = await prisma.parentRequest.findMany({
    where: { parentId: session.user.id },
    include: {
      vacancy: {
        include: {
          applications: {
            where: { status: "ACCEPTED" },
            include: { tutor: true }
          }
        }
      }
    },
    orderBy: { createdAt: "desc" },
  });

  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === "PENDING").length;
  const completedRequests = requests.filter(r => r.status === "ASSIGNED").length;

  const resolvedParams = await searchParams;
  const activeTab = resolvedParams.tab || "overview";

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {activeTab === "overview" && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Dashboard Overview</h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-1">Welcome back, {session.user.name}. Here is your summary.</p>
            </div>
            <Link href="/dashboard/parent?tab=new" className="flex items-center gap-2 bg-[#069494] hover:bg-[#057a7a] text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-[0_8px_20px_rgba(6,148,148,0.25)] hover:shadow-[0_8px_25px_rgba(6,148,148,0.4)] hover:-translate-y-0.5">
              <PlusCircle size={20} /> New Request
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-5">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center"><FileText size={26} /></div>
              <div><p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">Total Requests</p><h3 className="text-4xl font-extrabold text-zinc-900 dark:text-white">{totalRequests}</h3></div>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-5">
              <div className="w-14 h-14 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 rounded-2xl flex items-center justify-center"><Clock size={26} /></div>
              <div><p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">Pending</p><h3 className="text-4xl font-extrabold text-zinc-900 dark:text-white">{pendingRequests}</h3></div>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-5">
              <div className="w-14 h-14 bg-green-50 dark:bg-green-900/30 text-green-600 rounded-2xl flex items-center justify-center"><CheckCircle2 size={26} /></div>
              <div><p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">Assigned</p><h3 className="text-4xl font-extrabold text-zinc-900 dark:text-white">{completedRequests}</h3></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "requests" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">My Requests</h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-1">Manage and track the progress of your tutor requests.</p>
            </div>
            <Link href="/dashboard/parent?tab=new" className="hidden sm:flex items-center gap-2 bg-[#069494] hover:bg-[#057a7a] text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md">
              <PlusCircle size={18} /> New Request
            </Link>
          </div>

          {requests.length === 0 ? (
            <div className="p-16 bg-white dark:bg-zinc-900 rounded-3xl text-center border border-zinc-200 dark:border-zinc-800 border-dashed">
              <FileText size={48} className="mx-auto text-zinc-300 mb-4" />
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No requests found</h3>
              <p className="text-zinc-500 text-base max-w-sm mx-auto mb-6">You haven't requested a tutor yet. Create your first request.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {requests.map((req) => {
                const isPending = req.status === "PENDING";
                const isVacancy = req.status === "VACANCY_CREATED";
                const isAssigned = req.status === "ASSIGNED";
                
                // Find the accepted application to show the Tutor details
                const assignedTutor = req.vacancy?.applications[0]?.tutor;
                const tutorPhone = req.vacancy?.applications[0]?.phoneNumber;

                return (
                  <div key={req.id} className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                    <div className="bg-zinc-50 dark:bg-zinc-950/50 px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-zinc-900 dark:text-zinc-300 bg-zinc-200/50 dark:bg-zinc-800 px-2 py-1 rounded-md">#{req.id.slice(-6).toUpperCase()}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-4 py-1.5 text-xs font-bold rounded-full border ${
                          isPending ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                          isVacancy ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          'bg-green-50 text-green-700 border-green-200'
                        }`}>{req.status.replace("_", " ")}</span>
                        {isPending && <CancelRequestButton requestId={req.id} />}
                      </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-[#069494]/20 to-[#069494]/5 text-[#069494] rounded-2xl flex items-center justify-center font-bold text-3xl shadow-inner border border-[#069494]/10">{req.subject.charAt(0).toUpperCase()}</div>
                          <div>
                            <h3 className="font-bold text-2xl text-zinc-900 dark:text-white mb-1">{req.subject}</h3>
                            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg">{req.gradeLevel}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2 text-sm mt-6">
                          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400"><MapPin size={18} className="text-zinc-400" /> {req.location}</div>
                          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400"><Calendar size={18} className="text-zinc-400" /> {req.schedule}</div>
                          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400"><Banknote size={18} className="text-zinc-400" /> {req.budget} ETB/hr</div>
                        </div>

                        {/* THE NEW TUTOR ASSIGNED CARD */}
                        {assignedTutor && (
                          <div className="mt-6 p-5 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-2xl">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center"><UserCheck size={20} /></div>
                              <h4 className="font-bold text-green-800 dark:text-green-400">Tutor Assigned!</h4>
                            </div>
                            <div className="space-y-1 text-sm text-green-700 dark:text-green-300">
                              <p><span className="font-semibold">Name:</span> {assignedTutor.name}</p>
                              <p className="flex items-center gap-2"><span className="font-semibold">Phone:</span> {tutorPhone || "Not provided"} <Phone size={14} /></p>
                              <p><span className="font-semibold">Email:</span> {assignedTutor.email}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="md:w-64 bg-zinc-50 dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800/50">
                        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Request Progress</h4>
                        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 before:to-transparent">
                          <div className="relative flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center z-10 ${isPending || isVacancy || isAssigned ? 'bg-[#069494] text-white' : 'bg-zinc-200'}`}><CheckCircle2 size={12} /></div>
                            <span className={`text-sm ${isPending || isVacancy || isAssigned ? 'font-bold text-zinc-900 dark:text-white' : 'text-zinc-400'}`}>Requested</span>
                          </div>
                          <div className="relative flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center z-10 ${isVacancy || isAssigned ? 'bg-[#069494] text-white' : 'bg-zinc-200'}`}>{isVacancy || isAssigned ? <CheckCircle2 size={12} /> : <div className="w-2 h-2 bg-white rounded-full"></div>}</div>
                            <span className={`text-sm ${isVacancy || isAssigned ? 'font-bold text-zinc-900 dark:text-white' : 'text-zinc-400'}`}>Admin Review</span>
                          </div>
                          <div className="relative flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center z-10 ${isAssigned ? 'bg-[#069494] text-white' : 'bg-zinc-200'}`}>{isAssigned ? <CheckCircle2 size={12} /> : <div className="w-2 h-2 bg-white rounded-full"></div>}</div>
                            <span className={`text-sm ${isAssigned ? 'font-bold text-zinc-900 dark:text-white' : 'text-zinc-400'}`}>Tutor Assigned</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

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
          <ParentRequestForm />
        </div>
      )}
    </div>
  );
}