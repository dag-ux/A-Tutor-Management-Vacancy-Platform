// app/contact/page.tsx
import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      <PublicNavbar />
      
      <main className="pt-32 pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Get in Touch</h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">Have questions? We're here to help parents and tutors alike.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#069494]/10 text-[#069494] rounded-xl flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Email Us</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-2">Our team will respond within 24 hours.</p>
                <a href="mailto:support@aplustutor.com" className="text-[#069494] font-semibold hover:underline">support@aplustutor.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#069494]/10 text-[#069494] rounded-xl flex items-center justify-center shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Call Us</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-2">Mon-Fri from 8am to 5pm.</p>
                <a href="tel:+251912345678" className="text-[#069494] font-semibold hover:underline">+251 912 345 678</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#069494]/10 text-[#069494] rounded-xl flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Visit Us</h3>
                <p className="text-zinc-600 dark:text-zinc-400">Bole Road, Addis Ababa<br />Ethiopia</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Full Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 focus:border-[#069494] focus:ring-2 focus:ring-[#069494]/20 outline-none transition" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 focus:border-[#069494] focus:ring-2 focus:ring-[#069494]/20 outline-none transition" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 focus:border-[#069494] focus:ring-2 focus:ring-[#069494]/20 outline-none transition resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="w-full flex items-center justify-center gap-2 bg-[#069494] hover:bg-[#057a7a] text-white py-4 rounded-xl font-bold transition shadow-[0_8px_20px_rgba(6,148,148,0.25)]">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}