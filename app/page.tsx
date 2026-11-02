// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./components/ThemeToggle";
import { BookOpen, GraduationCap, Users, CheckCircle, ArrowRight, Star, MonitorPlay } from "lucide-react";

export default function Home() {
  return (
    // Added light mode background and text colors
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-[#069494] selection:text-white transition-colors duration-300">
      
      {/* 1. NAVBAR (Glassmorphism) */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#069494] p-2 rounded-lg text-white group-hover:scale-105 transition-transform">
              <GraduationCap size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight">A+ Tutor</span>
          </Link>
          
          <nav className="hidden md:flex gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link href="#home" className="hover:text-black dark:hover:text-white transition">Home</Link>
            <Link href="#about" className="hover:text-black dark:hover:text-white transition">About Us</Link>
            <Link href="#reviews" className="hover:text-black dark:hover:text-white transition">Reviews</Link>
            <Link href="#contact" className="hover:text-black dark:hover:text-white transition">Contact</Link>
          </nav>

          <div className="flex items-center gap-6">
            <ThemeToggle />
            <Link href="/register" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-[#069494] dark:hover:text-[#069494] transition hidden md:block">
              Sign In
            </Link>
            <Link href="/login" className="bg-[#069494] hover:bg-[#057a7a] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-[0_0_20px_rgba(6,148,148,0.2)]">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION (Glowing Mesh Gradient) */}
      <section id="home" className="relative flex items-center justify-center pt-40 pb-32 overflow-hidden min-h-[90vh]">
        {/* The Glowing Background Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#069494] rounded-[100%] blur-[150px] opacity-10 dark:opacity-20 pointer-events-none transition-opacity duration-300"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-500 rounded-full blur-[120px] opacity-5 dark:opacity-10 pointer-events-none transition-opacity duration-300"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#069494]/30 bg-[#069494]/10 text-[#069494] text-xs font-semibold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-[#069494] animate-pulse"></span>
            Elevate Your Learning Experience
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Find the Perfect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#069494] to-teal-600 dark:to-teal-300">
              Tutor
            </span> for Your Future
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Connecting ambitious students with world-class educators. Join our platform to manage applications, discover opportunities, and achieve academic excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/login" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 px-8 py-4 rounded-full font-bold transition">
              Find a Tutor <ArrowRight size={18} />
            </Link>
            <Link href="/login" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white px-8 py-4 rounded-full font-bold transition">
              Apply as Tutor
            </Link>
          </div>
        </div>
      </section>

      {/* 3. TRUSTED BY / LOGOS */}
      <div className="border-y border-zinc-200 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-950/50 py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-zinc-500 mb-6 font-medium">TRUSTED BY STUDENTS FROM TOP UNIVERSITIES</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale text-zinc-900 dark:text-zinc-100">
            
             <span className="text-xl font-bold font-serif">Addis Ababa University</span>
             <span className="text-xl font-bold font-sans">Addis Ababa Science and Technology University</span>
             <span className="text-xl font-bold font-mono">Haramaya University</span>
             <span className="text-xl font-bold font-serif">Bahir Dar University</span>
             <span className="text-xl font-bold font-sans">Jimma University</span>
          </div>
        </div>
      </div>

      {/* 4. ABOUT / FEATURES (Bento Box Style) */}
      <section id="about" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Essential Attributes <br/>That Set Us Apart</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-xl text-lg">
              We provide a seamless ecosystem for parents, tutors, and administrators to connect and manage educational needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Big Feature Card */}
            <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-[#069494]/50 transition-colors">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#069494] blur-[100px] opacity-5 dark:opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="w-14 h-14 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                <Users className="text-[#069494]" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Seamless Matching</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                Our platform bridges the gap between parents seeking quality education and tutors looking for meaningful teaching opportunities.
              </p>
              <Image 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80" 
                alt="Tutoring session" 
                width={600}
                height={400}
                className="rounded-xl border border-zinc-200 dark:border-zinc-700 w-full object-cover aspect-video grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Small Feature Cards */}
            <div className="grid gap-6">
              <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 group hover:border-[#069494]/50 transition-colors">
                <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <CheckCircle className="text-[#069494]" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Vetted Tutors</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">Every tutor goes through a rigorous application process to ensure top-tier quality for your child.</p>
              </div>
              
              <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 group hover:border-[#069494]/50 transition-colors">
                <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <MonitorPlay className="text-[#069494]" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Centralized Management</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">Track requests, view vacancies, and manage your dashboard all in one beautiful interface.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. REVIEWS SECTION */}
      <section id="reviews" className="py-24 bg-zinc-50 dark:bg-zinc-900/30 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Reviews from Our Clients</h2>
            <p className="text-zinc-600 dark:text-zinc-400">Hear what parents and tutors have to say about us.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm">
                <div className="flex text-[#069494] mb-4">
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 mb-6 italic">"This platform made finding a math tutor for my daughter incredibly easy. The dashboard is so simple to use!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center font-bold text-sm">
                    {i === 1 ? "SJ" : i === 2 ? "MK" : "AL"}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{i === 1 ? "Sarah J." : i === 2 ? "Michael K." : "Alice L."}</h4>
                    <p className="text-xs text-zinc-500">{i === 1 ? "Parent" : "Tutor"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#069494] rounded-full blur-[200px] opacity-5 dark:opacity-10 pointer-events-none transition-opacity duration-300"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-10 text-lg">
            Join our community today and take the first step towards academic success or finding your next tutoring opportunity.
          </p>
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl shadow-xl">
            <form className="space-y-4 text-left">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-1 focus:ring-[#069494] outline-none transition" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-1 focus:ring-[#069494] outline-none transition" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">Message</label>
                <textarea rows={3} className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-1 focus:ring-[#069494] outline-none transition" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="w-full bg-[#069494] hover:bg-[#057a7a] text-white py-4 rounded-xl font-bold transition shadow-[0_0_20px_rgba(6,148,148,0.3)]">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-[#069494] p-1.5 rounded-md text-white">
              <GraduationCap size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">A+ Tutor</span>
          </div>
          <p className="text-zinc-500 text-sm">
            © 2026 A+ Tutor Management. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium text-zinc-500">
            <Link href="#" className="hover:text-black dark:hover:text-white transition">Privacy</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition">Terms</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition">Twitter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}