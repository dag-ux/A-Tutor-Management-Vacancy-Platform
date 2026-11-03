// app/components/ApplyModal.tsx
"use client";

import { useState } from "react";
import { applyForVacancy } from "@/app/actions/application";
import { Loader2, Send, X, CheckCircle2 } from "lucide-react";

export default function ApplyModal({ vacancyId, vacancyTitle }: { vacancyId: string, vacancyTitle: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError("");
    
    const result = await applyForVacancy(vacancyId, coverLetter);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => setIsOpen(false), 2000); // Close modal after 2 seconds
    } else {
      setError(result.error || "Something went wrong");
    }
    setIsPending(false);
  };

  if (success) {
    return (
      <div className="px-6 py-2.5 bg-green-50 text-green-700 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-green-200 w-full md:w-auto">
        <CheckCircle2 size={16} /> Applied
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#069494] hover:bg-[#057a7a] text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-[0_4px_10px_rgba(6,148,148,0.2)]"
      >
        <Send size={16} /> Apply Now
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Apply for Vacancy</h3>
                <p className="text-sm text-zinc-500 mt-1">{vacancyTitle}</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                  Cover Letter / Pitch
                </label>
                <p className="text-xs text-zinc-500 mb-3">Tell the parent why you are the perfect tutor for this specific role. Mention your experience and teaching style.</p>
                <textarea
                  required
                  rows={5}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Hello, I have 5 years of experience teaching Mathematics..."
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-2 focus:ring-[#069494]/20 outline-none transition resize-none"
                />
              </div>

              {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">{error}</div>}

              <button
                disabled={isPending}
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#069494] text-white py-3 rounded-xl hover:bg-[#057a7a] disabled:opacity-50 transition font-bold"
              >
                {isPending ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}