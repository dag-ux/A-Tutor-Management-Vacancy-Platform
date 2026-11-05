// app/components/ParentRequestForm.tsx
"use client";

import { useActionState, useEffect } from "react";
import { createParentRequest, type RequestActionState } from "@/app/actions/request";
import { useRouter } from "next/navigation";
import { 
  User, BookOpen, GraduationCap, MapPin, Calendar, 
  Banknote, Loader2, Sparkles, Users, Monitor, 
  Target, Clock, Globe
} from "lucide-react";

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
          <p className="text-sm text-zinc-500">Tell us exactly what your child needs.</p>
        </div>
      </div>

      <form action={formAction} className="p-8 space-y-8">
        
        {/* SECTION 1: Student Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#069494] uppercase tracking-wider flex items-center gap-2">
            <User size={16} /> Student Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Child's Name (Optional)</label>
              <input name="childName" placeholder="e.g. Abebe" className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Child's Age (Optional)</label>
              <input name="childAge" placeholder="e.g. 15" className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Grade Level</label>
              <div className="relative group">
                <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input name="gradeLevel" required placeholder="e.g. Grade 10" className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Language Preference</label>
              <div className="relative group">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <select name="language" className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white focus:border-[#069494] outline-none transition-all appearance-none">
                  <option value="English">English</option>
                  <option value="Amharic">Amharic</option>
                  <option value="Oromiffa">Oromiffa</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Academic Needs */}
        <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <h3 className="text-sm font-bold text-[#069494] uppercase tracking-wider flex items-center gap-2">
            <BookOpen size={16} /> Academic Needs
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Subject</label>
              <input name="subject" required placeholder="e.g. Mathematics" className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Specific Topics (Optional)</label>
              <input name="specificTopics" placeholder="e.g. Algebra, Geometry" className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition-all" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Current Performance (Optional)</label>
              <input name="currentPerformance" placeholder="e.g. Scoring 60% in school" className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Learning Style (Optional)</label>
              <input name="learningStyle" placeholder="e.g. Needs a patient, visual approach" className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition-all" />
            </div>
          </div>
        </div>

        {/* SECTION 3: Tutor Preferences */}
        <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <h3 className="text-sm font-bold text-[#069494] uppercase tracking-wider flex items-center gap-2">
            <Users size={16} /> Tutor Preferences
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Gender Preference */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Gender Preference</label>
              <div className="grid grid-cols-3 gap-2">
                {["Any", "Male", "Female"].map((g) => (
                  <label key={g} className="cursor-pointer">
                    <input type="radio" name="genderPreference" value={g} defaultChecked={g === "Any"} className="peer sr-only" />
                    <div className="text-center py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 text-zinc-600 dark:text-zinc-400 peer-checked:border-[#069494] peer-checked:bg-[#069494]/10 peer-checked:text-[#069494] peer-checked:font-bold transition-all text-sm">
                      {g}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Mode */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Tutoring Mode</label>
              <div className="grid grid-cols-2 gap-2">
                {["Online", "In-Person"].map((m) => (
                  <label key={m} className="cursor-pointer">
                    <input type="radio" name="mode" value={m} defaultChecked={m === "Online"} className="peer sr-only" />
                    <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 text-zinc-600 dark:text-zinc-400 peer-checked:border-[#069494] peer-checked:bg-[#069494]/10 peer-checked:text-[#069494] peer-checked:font-bold transition-all text-sm">
                      {m === "Online" ? <Monitor size={16} /> : <MapPin size={16} />} {m}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: Logistics & Budget */}
        <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <h3 className="text-sm font-bold text-[#069494] uppercase tracking-wider flex items-center gap-2">
            <Clock size={16} /> Logistics & Budget
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Location / Neighborhood</label>
              <div className="relative group">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input name="location" required placeholder="e.g. Bole, Addis Ababa" className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Preferred Schedule</label>
              <div className="relative group">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input name="schedule" required placeholder="e.g. Weekends 2-4 PM" className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Hourly Budget (ETB)</label>
              <div className="relative group">
                <Banknote className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input name="budget" type="number" required min="1" placeholder="e.g. 500" className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Duration (Optional)</label>
              <div className="relative group">
                <Target className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input name="duration" placeholder="e.g. Long-term / 3 months" className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition-all" />
              </div>
            </div>
          </div>
        </div>

        {state && !state.success && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-100 dark:border-red-900/50 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> {state.error}
          </div>
        )}

        <button disabled={isPending} type="submit" className="w-full flex items-center justify-center gap-2 bg-[#069494] hover:bg-[#057a7a] text-white py-4 rounded-xl disabled:opacity-50 transition-all font-bold text-lg shadow-[0_8px_20px_rgba(6,148,148,0.25)] hover:shadow-[0_8px_25px_rgba(6,148,148,0.4)] hover:-translate-y-0.5 mt-8">
          {isPending ? <><Loader2 size={20} className="animate-spin" /> Submitting Request...</> : "Submit Request"}
        </button>
      </form>
    </div>
  );
}