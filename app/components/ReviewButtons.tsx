// app/components/ReviewButtons.tsx
"use client";

import { useState } from "react";
import { updateApplicationStatus } from "@/app/actions/review";
import { Check, X, Loader2 } from "lucide-react";

export default function ReviewButtons({ applicationId }: { applicationId: string }) {
  const [isPending, setIsPending] = useState(false);

  const handleUpdate = async (status: "ACCEPTED" | "REJECTED") => {
    setIsPending(true);
    await updateApplicationStatus(applicationId, status);
    setIsPending(false);
  };

  if (isPending) return <Loader2 className="animate-spin text-zinc-400" size={20} />;

  return (
    <div className="flex gap-2">
      <button onClick={() => handleUpdate("ACCEPTED")} className="flex items-center gap-1 bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-lg text-sm font-bold transition">
        <Check size={16} /> Accept
      </button>
      <button onClick={() => handleUpdate("REJECTED")} className="flex items-center gap-1 bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1.5 rounded-lg text-sm font-bold transition">
        <X size={16} /> Reject
      </button>
    </div>
  );
}