// app/components/WriteReviewModal.tsx
"use client";

import { useActionState, useState, useEffect } from "react";
import { submitReview, type ReviewState } from "@/app/actions/public";
import { Loader2, Star, X, MessageSquarePlus } from "lucide-react";

export default function WriteReviewModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [state, formAction, isPending] = useActionState<ReviewState | null, FormData>(submitReview, null);

  // Close modal and reset on success
  useEffect(() => {
    if (state?.success) {
      setTimeout(() => {
        setIsOpen(false);
        setRating(5);
      }, 2000);
    }
  }, [state]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition mt-8"
      >
        <MessageSquarePlus size={18} /> Write a Review
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Leave a Review</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            <form action={formAction} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">Your Name</label>
                  <input name="userName" required placeholder="John Doe" className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:border-[#069494] focus:ring-2 focus:ring-[#069494]/20 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">I am a</label>
                  <select name="role" className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:border-[#069494] outline-none transition">
                    <option value="Parent">Parent</option>
                    <option value="Tutor">Tutor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none transition-transform hover:scale-110">
                      <Star size={28} fill={star <= rating ? "#069494" : "none"} className={star <= rating ? "text-[#069494]" : "text-zinc-300"} />
                    </button>
                  ))}
                </div>
                <input type="hidden" name="rating" value={rating} />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">Your Feedback</label>
                <textarea name="comment" required rows={4} placeholder="Tell us about your experience..." className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:border-[#069494] focus:ring-2 focus:ring-[#069494]/20 outline-none transition resize-none" />
              </div>

              {state?.error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">{state.error}</div>}
              {state?.success && <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm border border-green-100">{state.message}</div>}

              <button disabled={isPending} type="submit" className="w-full flex items-center justify-center gap-2 bg-[#069494] text-white py-3 rounded-xl hover:bg-[#057a7a] disabled:opacity-50 transition font-bold mt-2">
                {isPending ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}