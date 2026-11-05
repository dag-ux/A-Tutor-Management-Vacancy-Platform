// app/about/page.tsx
import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";
import { GraduationCap, Target, Heart, Shield, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      <PublicNavbar />
      
      <main className="pt-32 pb-24">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 text-center mb-24">
          <div className="inline-flex items-center justify-center p-3 bg-[#069494]/10 text-[#069494] rounded-full mb-6">
            <Heart size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">Our Mission</h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We believe that knowledge should be shared, and that every graduate deserves the opportunity to earn while they build their careers. We also believe every parent deserves access to high-quality, affordable tutoring for their children.
          </p>
        </section>

        {/* Values */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800">
              <Target className="text-[#069494] mb-6" size={32} />
              <h3 className="text-xl font-bold mb-3">Empowering Graduates</h3>
              <p className="text-zinc-600 dark:text-zinc-400">We bridge the gap between university and the workforce by providing flexible, meaningful income opportunities for fresh graduates.</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800">
              <Users className="text-[#069494] mb-6" size={32} />
              <h3 className="text-xl font-bold mb-3">Supporting Parents</h3>
              <p className="text-zinc-600 dark:text-zinc-400">We make it easy for parents to find trusted, vetted tutors who can help their children excel academically.</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800">
              <Shield className="text-[#069494] mb-6" size={32} />
              <h3 className="text-xl font-bold mb-3">Security & Trust</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Every tutor application is reviewed by our admin team. We ensure a safe, transparent environment for all users.</p>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}