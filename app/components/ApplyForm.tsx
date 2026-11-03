// app/components/ApplyForm.tsx
"use client";

import { useState } from "react";
import { applyForVacancy } from "@/app/actions/application";
import { useRouter } from "next/navigation";
import { Loader2, Send, ArrowLeft, Phone, FileText } from "lucide-react";
import Link from "next/link";

export default function ApplyForm({ vacancyId, vacancyTitle }: { vacancyId: string, vacancyTitle: string }) {
  const [isPending, setIsPending] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError("");
    
    const result = await applyForVacancy(vacancyId, phoneNumber, coverLetter);
    
    if (result.success) {
      // Redirect back to the applications tab on success
      router.push("/dashboard/tutor?tab=applications");
    } else {
      setError(result.error || "Something went wrong");
      setIsPending(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link href="/dashboard/tutor?tab=vacancies" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-[#069494] mb-6 transition bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg">
        <ArrowLeft size={16} /> Back to Vacancies
      </Link>

      <div className="bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-2">Apply for this Job</h1>
          <p className="text-[#069494] font-semibold">{vacancyTitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Phone Number */}
          <div>
            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                type="text"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g. +251 912 345 678"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition text-zinc-900 dark:text-white"
              />
            </div>
            <p className="text-xs text-zinc-500 mt-1">Parents will use this to contact you if accepted.</p>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Cover Letter / Pitch</label>
            <div className="relative">
              <FileText className="absolute left-4 top-4 text-zinc-400" size={18} />
              <textarea
                required
                rows={6}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Tell the parent why you are the perfect tutor for this specific role. Mention your experience, teaching style, and why you love teaching..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition resize-none text-zinc-900 dark:text-white"
              />
            </div>
          </div>

          {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 font-medium">{error}</div>}

          <button
            disabled={isPending}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#069494] hover:bg-[#057a7a] text-white py-4 rounded-xl transition-all font-bold text-lg shadow-[0_8px_20px_rgba(6,148,148,0.25)] disabled:opacity-50"
          >
            {isPending ? <><Loader2 size={20} className="animate-spin" /> Submitting Application...</> : <><Send size={20} /> Submit Application</>}
          </button>
        </form>
      </div>
    </div>
  );
}