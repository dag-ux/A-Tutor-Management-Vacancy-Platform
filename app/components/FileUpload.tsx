// app/components/FileUpload.tsx
"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { CheckCircle2, Image as ImageIcon, FileText } from "lucide-react";

export default function FileUpload({ 
  onUploadComplete, 
  title, 
  type = "document" 
}: { 
  onUploadComplete: (url: string) => void;
  title: string;
  type?: "document" | "image";
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 relative overflow-hidden group">
      
      {type === "document" ? (
        <FileText className="text-zinc-400 mb-2 group-hover:scale-110 transition-transform" size={32} />
      ) : (
        <ImageIcon className="text-zinc-400 mb-2 group-hover:scale-110 transition-transform" size={32} />
      )}

      <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-4">{title}</p>

      <UploadButton<OurFileRouter, "tutorDocument">
        endpoint="tutorDocument"
        onClientUploadComplete={(res) => {
          if (res && res[0]) {
            onUploadComplete(res[0].url); // Send the URL to the form!
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
        appearance={{
          button: "bg-[#069494] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#057a7a] ut-uploading:bg-[#057a7a]",
          allowedContent: "text-xs text-zinc-500 mt-2",
        }}
      />
      <p className="text-xs text-zinc-500 mt-2 text-center">Max 4MB</p>
    </div>
  );
}