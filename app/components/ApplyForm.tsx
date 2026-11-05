// app/components/ApplyForm.tsx
"use client";

import { useState } from "react";
import { applyForVacancy } from "@/app/actions/application";
import { useRouter } from "next/navigation";
import { 
  Loader2, 
  Send, 
  ArrowLeft, 
  Phone, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  CheckCircle2 
} from "lucide-react";
import Link from "next/link";
import FileUpload from "./FileUpload";

export default function ApplyForm({ vacancyId, vacancyTitle }: { vacancyId: string, vacancyTitle: string }) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [transcriptUrl, setTranscriptUrl] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!transcriptUrl) {
      setError("Please upload your Grade Report/Certificate before submitting.");
      return;
    }

    setIsPending(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    
    const result = await applyForVacancy(
      vacancyId,
      formData.get("phoneNumber") as string,
      formData.get("educationLevel") as string,
      formData.get("yearsOfExperience") as string,
      transcriptUrl,
      profileImageUrl, 
      formData.get("coverLetter") as string
    );
    
    if (result.success) {
      router.push("/dashboard/tutor?tab=applications");
    } else {
      setError(result.error || "Something went wrong");
      setIsPending(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <Link href="/dashboard/tutor?tab=vacancies" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-[#069494] mb-6 transition bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg">
        <ArrowLeft size={16} /> Back to Vacancies
      </Link>

      <div className="bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-2">Apply for this Job</h1>
          <p className="text-[#069494] font-semibold">{vacancyTitle}</p>
          <p className="text-sm text-zinc-500 mt-2">Please provide accurate information. Your application will be reviewed by our admin team.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Row 1: Phone & Profile Image */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input name="phoneNumber" required placeholder="+251 912 345 678" className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition text-zinc-900 dark:text-white" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Profile Picture (Optional)</label>
              {profileImageUrl ? (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-900/50 flex items-center gap-3 text-green-700 dark:text-green-400 font-bold h-[52px]">
                  <CheckCircle2 size={20} /> Image uploaded successfully!
                </div>
              ) : (
                <FileUpload 
                  onUploadComplete={(url) => setProfileImageUrl(url)} 
                  title="Upload your photo" 
                  type="image"
                />
              )}
            </div>
          </div>

          {/* Row 2: Education & Experience */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Highest Education</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input name="educationLevel" required placeholder="e.g. BSc in Mathematics" className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition text-zinc-900 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Years of Experience</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input name="yearsOfExperience" required placeholder="e.g. 2 Years" className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition text-zinc-900 dark:text-white" />
              </div>
            </div>
          </div>

          {/* Transcript Upload */}
          <div>
            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Upload Grade Report / Certificate</label>
            {transcriptUrl ? (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-900/50 flex items-center gap-3 text-green-700 dark:text-green-400 font-bold">
                <CheckCircle2 size={20} /> Document uploaded successfully!
              </div>
            ) : (
              <FileUpload 
                onUploadComplete={(url) => setTranscriptUrl(url)} 
                title="Upload your Grade Report (PDF or Image)"
                type="document"
              />
            )}
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Cover Letter / Pitch</label>
            <div className="relative">
              <FileText className="absolute left-4 top-4 text-zinc-400" size={18} />
              <textarea name="coverLetter" required rows={4} placeholder="Tell the parent why you are the perfect tutor..." className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:border-[#069494] focus:ring-4 focus:ring-[#069494]/10 outline-none transition resize-none text-zinc-900 dark:text-white" />
            </div>
          </div>

          {error && <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-100 dark:border-red-900/50 font-medium">{error}</div>}

          <button disabled={isPending} type="submit" className="w-full flex items-center justify-center gap-2 bg-[#069494] hover:bg-[#057a7a] text-white py-4 rounded-xl transition-all font-bold text-lg shadow-[0_8px_20px_rgba(6,148,148,0.25)] disabled:opacity-50 mt-4">
            {isPending ? <><Loader2 size={20} className="animate-spin" /> Submitting Application...</> : <><Send size={20} /> Submit Application</>}
          </button>
        </form>
      </div>
    </div>
  );
}