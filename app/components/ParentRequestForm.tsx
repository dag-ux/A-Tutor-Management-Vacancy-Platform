// app/components/ParentRequestForm.tsx
"use client";

import { useActionState, useEffect } from "react";
import { createParentRequest, type RequestActionState } from "@/app/actions/request";
import { useRouter } from "next/navigation";
import { BookOpen, GraduationCap, MapPin, Calendar, Banknote, Loader2, Sparkles } from "lucide-react";

export default function ParentRequestForm() {
  const [state, formAction, isPending] = useActionState<RequestActionState | null, FormData>(
    createParentRequest,
    null
  );
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard/parent?tab=requests");
    }
  }, [state, router]);

  return (
    <div className="bg-white dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
      
      {/* Form Header */}
      <div className="bg-zinc-50/50 dark:bg-zinc-950/50 px-8 py-6 border-b border-zinc-200/60 dark:border-zinc-800/60 flex items-center gap-3">
        <div className="p-2.5 bg-[#069494]/10 text-[#069494] rounded-xl">
          <Sparkles size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Tutor Request Details</h2>
          <p className="text-sm text-zinc-500">Tell us what you are looking for.</p>
        </div>
      </div>

      <form action={formAction} className="p-8 space-y-6">
        
        {/* Subject Area */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Subject & Level</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Subject</label>
              <div className="relative group">
                <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#069494] transition-colors" size={18} />
                <input name="subject" required placeholder="e.g. Mathematics" className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition-all placeholder:text-zinc-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Grade Level</label>
              <div className="relative group">
                <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#069494] transition-colors" size={18} />
                <input name="gradeLevel" required placeholder="e.g. Grade 10" className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition-all placeholder:text-zinc-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Logistics Area */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Logistics & Budget</h3>
          
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Location</label>
            <div className="relative group">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#069494] transition-colors" size={18} />
              <input name="location" required placeholder="e.g. Addis Ababa or Online" className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition-all placeholder:text-zinc-400" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Preferred Schedule</label>
              <div className="relative group">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#069494] transition-colors" size={18} />
                <input name="schedule" required placeholder="e.g. Weekends 2-4 PM" className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition-all placeholder:text-zinc-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Hourly Budget (ETB)</label>
              <div className="relative group">
                <Banknote className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#069494] transition-colors" size={18} />
                <input name="budget" type="number" required min="1" placeholder="e.g. 500" className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition-all placeholder:text-zinc-400" />
              </div>
            </div>
          </div>
        </div>

        {state && !state.success && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-100 dark:border-red-900/50 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> {state.error}
          </div>
        )}

        <button disabled={isPending} type="submit" className="w-full flex items-center justify-center gap-2 bg-[#069494] hover:bg-[#057a7a] text-white py-3.5 rounded-xl disabled:opacity-50 transition-all font-bold text-lg shadow-[0_8px_20px_rgba(6,148,148,0.25)] hover:shadow-[0_8px_25px_rgba(6,148,148,0.4)] hover:-translate-y-0.5">
          {isPending ? <><Loader2 size={20} className="animate-spin" /> Submitting Request...</> : "Submit Request"}
        </button>
      </form>
    </div>
  );
}