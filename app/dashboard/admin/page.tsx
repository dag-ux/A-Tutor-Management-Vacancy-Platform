// app/dashboard/admin/page.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CreateVacancyButton from "@/app/components/CreateVacancyButton";
import ReviewButtons from "@/app/components/ReviewButtons"; // <-- Imported the new component
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Calendar, 
  Banknote, 
  Users, 
  Briefcase, 
  ShieldAlert,
  FileText
} from "lucide-react";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user.role !== "ADMIN") redirect("/dashboard");

  // Fetch all necessary data
  const [pendingRequests, allVacancies, allUsers] = await Promise.all([
    prisma.parentRequest.findMany({
      where: { status: "PENDING" },
      include: { parent: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.vacancy.findMany({
      orderBy: { createdAt: "desc" },
      include: { 
        applications: {
          include: { tutor: true } // <-- Fetch the Tutor's name and email!
        } 
      },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    })
  ]);

  const resolvedParams = await searchParams;
  const activeTab = resolvedParams.tab || "overview";

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* ======================================================== */}
      {/* VIEW 1: OVERVIEW TAB                                     */}
      {/* ======================================================== */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Admin Overview</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">Welcome back. Here is the system health.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="relative overflow-hidden bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-900/10 text-yellow-600 dark:text-yellow-400 rounded-2xl flex items-center justify-center shadow-inner">
                  <Clock size={26} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">Pending Requests</p>
                  <h3 className="text-4xl font-extrabold text-zinc-900 dark:text-white">{pendingRequests.length}</h3>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative overflow-hidden bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-900/10 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center shadow-inner">
                  <Briefcase size={26} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">Active Vacancies</p>
                  <h3 className="text-4xl font-extrabold text-zinc-900 dark:text-white">{allVacancies.length}</h3>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative overflow-hidden bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shadow-inner">
                  <Users size={26} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">Total Users</p>
                  <h3 className="text-4xl font-extrabold text-zinc-900 dark:text-white">{allUsers.length}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Banner */}
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-900 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#069494]/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Pending Parent Requests</h2>
              <p className="text-zinc-300 text-lg max-w-lg">You have {pendingRequests.length} requests waiting to be reviewed and converted into vacancies.</p>
            </div>
            <a href="?tab=requests" className="relative z-10 whitespace-nowrap bg-[#069494] text-white hover:bg-[#057a7a] px-8 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2">
              Review Requests
            </a>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 2: PARENT REQUESTS TAB                              */}
      {/* ======================================================== */}
      {activeTab === "requests" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Parent Requests</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">Review requests and convert them into public vacancies.</p>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="p-16 bg-white dark:bg-zinc-900 rounded-3xl text-center border border-zinc-200 dark:border-zinc-800 border-dashed">
              <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">All caught up!</h3>
              <p className="text-zinc-500">There are no pending parent requests right now.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {pendingRequests.map((req) => (
                <div key={req.id} className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  
                  {/* Request Info */}
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#069494]/10 text-[#069494] rounded-xl flex items-center justify-center font-bold text-xl">
                        {req.subject.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-zinc-900 dark:text-white">{req.subject} - {req.gradeLevel}</h3>
                        <p className="text-sm text-zinc-500">
                          Requested by <span className="font-semibold">{req.parent.name}</span> ({req.parent.email})
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl">
                      <div className="flex items-center gap-2"><MapPin size={16} /> {req.location}</div>
                      <div className="flex items-center gap-2"><Calendar size={16} /> {req.schedule}</div>
                      <div className="flex items-center gap-2"><Banknote size={16} /> {req.budget} ETB/hr</div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="w-full md:w-auto">
                    <CreateVacancyButton requestId={req.id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 3: MANAGE VACANCIES TAB                             */}
      {/* ======================================================== */}
      {activeTab === "vacancies" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Manage Vacancies</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">Review applicants and manage job postings.</p>
          </div>

          {allVacancies.length === 0 ? (
            <div className="p-16 bg-white dark:bg-zinc-900 rounded-3xl text-center border border-zinc-200 dark:border-zinc-800 border-dashed">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No vacancies yet</h3>
              <p className="text-zinc-500">Create a vacancy from the Parent Requests tab.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {allVacancies.map((vacancy) => (
                <div key={vacancy.id} className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col">
                  
                  {/* Vacancy Header */}
                  <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-2xl text-zinc-900 dark:text-white">{vacancy.title}</h3>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                        vacancy.isOpen ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {vacancy.isOpen ? "Open" : "Closed"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-4">
                      <span className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg"><MapPin size={16} /> {vacancy.location}</span>
                      <span className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg"><Banknote size={16} /> {vacancy.rate} ETB/hr</span>
                    </div>
                  </div>

                  {/* Applicants List */}
                  <div className="p-6 bg-zinc-50 dark:bg-zinc-950/50 flex-1">
                    <h4 className="font-bold text-sm text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Users size={16} /> Applicants ({vacancy.applications.length})
                    </h4>
                    
                    {vacancy.applications.length === 0 ? (
                      <p className="text-sm text-zinc-400 italic bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">No one has applied for this position yet.</p>
                    ) : (
                      <div className="space-y-4">
                        {vacancy.applications.map((app) => (
                          <div key={app.id} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                  {app.tutor.name ? app.tutor.name.charAt(0).toUpperCase() : "T"}
                                </div>
                                <div>
                                  <p className="font-bold text-zinc-900 dark:text-white text-lg">{app.tutor.name}</p>
                                  <p className="text-xs text-zinc-500">{app.tutor.email}</p>
                                </div>
                              </div>
                              <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                                app.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                                app.status === 'ACCEPTED' ? 'bg-green-50 text-green-700 border-green-200' : 
                                'bg-red-50 text-red-700 border-red-200'
                              }`}>
                                {app.status}
                              </span>
                            </div>
                            
                            {/* The Cover Letter */}
                            {app.coverLetter && (
                              <div className="mt-4 p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800 relative">
                                <FileText size={16} className="absolute top-4 right-4 text-zinc-300" />
                                <p className="text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">Cover Letter</p>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300 italic">"{app.coverLetter}"</p>
                              </div>
                            )}

                            {/* Action Buttons for Admin */}
                            {app.status === "PENDING" && (
                              <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                                <ReviewButtons applicationId={app.id} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 4: ALL USERS TAB                                    */}
      {/* ======================================================== */}
      {activeTab === "users" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">User Directory</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">Manage all registered Parents, Tutors, and Admins.</p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800">
                    <th className="px-6 py-4 text-sm font-bold text-zinc-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-sm font-bold text-zinc-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-sm font-bold text-zinc-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-4 text-sm font-bold text-zinc-500 uppercase tracking-wider text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {allUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-bold text-sm">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                          </div>
                          <div>
                            <p className="font-bold text-zinc-900 dark:text-white">{user.name}</p>
                            <p className="text-sm text-zinc-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-md ${
                          user.role === "ADMIN" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                          user.role === "TUTOR" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                          "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                        }`}>
                          {user.role === "ADMIN" && <ShieldAlert size={12} />}
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-500">
                        {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}