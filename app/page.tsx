// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import PublicNavbar from "./components/PublicNavbar";
import PublicFooter from "./components/PublicFooter";
import WriteReviewModal from "./components/WriteReviewModal";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { 
  Users, 
  ArrowRight, 
  Star, 
  MapPin, 
  Banknote, 
  Briefcase,
  ShieldCheck,
  FileText,
  UserCheck
} from "lucide-react";

export default async function Home() {
  // 1. Check if a user is logged in
  const session = await auth.api.getSession({ headers: await headers() });

  // 2. Fetch the 3 most recent open jobs
  const recentJobs = await prisma.vacancy.findMany({
    where: { isOpen: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  // 3. Fetch the 3 most recent reviews
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-[#069494] selection:text-white transition-colors duration-300">
      
      {/* REUSABLE NAVBAR */}
      <PublicNavbar />

      {/* 1. HERO SECTION (Balanced for Parents and Tutors) */}
      <section id="home" className="relative flex items-center justify-center pt-40 pb-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#069494] rounded-[100%] blur-[150px] opacity-10 dark:opacity-20 pointer-events-none transition-opacity duration-300"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#069494]/30 bg-[#069494]/10 text-[#069494] text-xs font-semibold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-[#069494] animate-pulse"></span>
            The #1 Tutoring Marketplace
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Connecting Brilliant Minds <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#069494] to-teal-600 dark:to-teal-300">
              With Ambitious Students
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Are you a parent looking for the perfect tutor for your child? Or a graduate looking for flexible teaching work? You are in the right place.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Parent CTA */}
            <Link href={session ? "/dashboard/parent" : "/register"} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#069494] text-white hover:bg-[#057a7a] px-8 py-4 rounded-full font-bold transition shadow-[0_8px_20px_rgba(6,148,148,0.3)]">
              <Users size={18} /> I Need a Tutor (Parents)
            </Link>
            {/* Tutor CTA */}
            <Link href={session ? "/dashboard/tutor" : "/register"} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 px-8 py-4 rounded-full font-bold transition">
              <Briefcase size={18} /> I Want to Teach (Tutors)
            </Link>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (For Parents) */}
      <section id="how-it-works" className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works for Parents</h2>
            <p className="text-zinc-600 dark:text-zinc-400">Finding the right tutor for your child is simple, secure, and transparent.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center border-4 border-zinc-50 dark:border-zinc-950 shadow-xl mb-6 relative z-10">
                <FileText className="text-[#069494]" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Register & Request</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Create a secure account, then submit a request detailing your child's subject, schedule, and budget.</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center border-4 border-zinc-50 dark:border-zinc-950 shadow-xl mb-6 relative z-10">
                <ShieldCheck className="text-[#069494]" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">2. We Vet the Tutors</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Our admin team reviews applications and matches your request with the most qualified university graduates.</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center border-4 border-zinc-50 dark:border-zinc-950 shadow-xl mb-6 relative z-10">
                <UserCheck className="text-[#069494]" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Get Contacted</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Log back into your dashboard to instantly see your assigned tutor's name, email, and phone number.</p>
            </div>

            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-zinc-200 dark:bg-zinc-800 -z-0"></div>
          </div>
        </div>
      </section>

      {/* 3. TRUSTED BY UNIVERSITIES (With Names and Real Logos) */}
      <div className="py-16 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-zinc-500 mb-10 font-bold uppercase tracking-widest">Tutors from top universities</p>
          <div className="flex flex-wrap justify-center items-start gap-8 md:gap-12">
             {/* AAU */}
             <div className="flex flex-col items-center gap-3 group">
               <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-full p-2 shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:scale-110 group-hover:border-[#069494]/50 transition-all duration-300">
                 <Image src="/image/aau-logo.png" alt="Addis Ababa University" width={64} height={64} className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
               </div>
               <span className="text-xs md:text-sm font-bold text-zinc-700 dark:text-zinc-300 text-center w-24 leading-tight">Addis Ababa University</span>
             </div>
             {/* Adama */}
             <div className="flex flex-col items-center gap-3 group">
               <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-full p-2 shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:scale-110 group-hover:border-[#069494]/50 transition-all duration-300">
                 <Image src="/image/adama-logo.png" alt="Adama Science and Technology University" width={64} height={64} className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
               </div>
               <span className="text-xs md:text-sm font-bold text-zinc-700 dark:text-zinc-300 text-center w-24 leading-tight">Adama Science & Tech</span>
             </div>
             {/* Bahir Dar */}
             <div className="flex flex-col items-center gap-3 group">
               <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-full p-2 shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:scale-110 group-hover:border-[#069494]/50 transition-all duration-300">
                 <Image src="/image/bahirdar.png" alt="Bahir Dar University" width={64} height={64} className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
               </div>
               <span className="text-xs md:text-sm font-bold text-zinc-700 dark:text-zinc-300 text-center w-24 leading-tight">Bahir Dar University</span>
             </div>
             {/* Haramaya */}
             <div className="flex flex-col items-center gap-3 group">
               <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-full p-2 shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:scale-110 group-hover:border-[#069494]/50 transition-all duration-300">
                 <Image src="/image/haramaya.png" alt="Haramaya University" width={64} height={64} className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
               </div>
               <span className="text-xs md:text-sm font-bold text-zinc-700 dark:text-zinc-300 text-center w-24 leading-tight">Haramaya University</span>
             </div>
             {/* Jimma */}
             <div className="flex flex-col items-center gap-3 group">
               <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-full p-2 shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:scale-110 group-hover:border-[#069494]/50 transition-all duration-300">
                 <Image src="/image/jima.png" alt="Jimma University" width={64} height={64} className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
               </div>
               <span className="text-xs md:text-sm font-bold text-zinc-700 dark:text-zinc-300 text-center w-24 leading-tight">Jimma University</span>
             </div>
          </div>
        </div>
      </div>

      {/* 4. RECENT JOBS PREVIEW */}
      <section id="jobs" className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Latest Tutoring Jobs</h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-xl text-lg">Real parents are looking for help right now. Browse the latest requests.</p>
            </div>
            <Link href="/vacancies" className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition">
              View All Jobs <ArrowRight size={18} />
            </Link>
          </div>

          {recentJobs.length === 0 ? (
            <div className="text-center p-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 border-dashed">
              <Briefcase size={48} className="mx-auto text-zinc-300 mb-4" />
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">No jobs posted yet</h3>
              <p className="text-zinc-500">Check back soon. Parents are actively posting requests.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {recentJobs.map((job) => (
                <div key={job.id} className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-[#069494]/50 transition-all duration-300 group flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-[#069494]/10 text-[#069494] rounded-2xl flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform">
                      {job.subject.charAt(0).toUpperCase()}
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      Open
                    </span>
                  </div>
                  <h3 className="font-bold text-xl mb-2 leading-tight">{job.title}</h3>
                  <p className="text-sm text-zinc-500 mb-6 line-clamp-2 flex-1">{job.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <MapPin size={16} className="text-zinc-400" /> {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <Banknote size={16} className="text-zinc-400" /> {job.rate} ETB / hour
                    </div>
                  </div>

                  <Link href={session ? `/dashboard/tutor?tab=vacancies` : `/login`} className="w-full block text-center bg-zinc-900 dark:bg-white text-white dark:text-black py-3 rounded-xl font-bold hover:bg-[#069494] dark:hover:bg-[#069494] hover:text-white transition-colors">
                    Apply Now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. REVIEWS SECTION (Dynamic) */}
      <section id="reviews" className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">Hear from graduates and parents using our platform.</p>
            <WriteReviewModal />
          </div>
          
          {reviews.length === 0 ? (
            <div className="text-center p-12 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
              <p className="text-zinc-500">No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div key={review.id} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl shadow-sm relative">
                  <div className="flex text-[#069494] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-[#069494]" : "text-zinc-300 dark:text-zinc-700"} />
                    ))}
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300 mb-6 text-lg">"{review.comment}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#069494] to-teal-700 text-white flex items-center justify-center font-bold text-lg shadow-md">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 dark:text-white">{review.userName}</h4>
                      <p className="text-sm text-zinc-500">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* REUSABLE FOOTER */}
      <PublicFooter />
    </div>
  );
}