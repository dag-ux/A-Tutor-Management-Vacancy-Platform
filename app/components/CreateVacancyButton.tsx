// app/components/CreateVacancyButton.tsx
"use client";

import { useState } from "react";
import { createVacancy } from "@/app/actions/vacancy";
import { Loader2, PlusCircle } from "lucide-react";

export default function CreateVacancyButton({ requestId }: { requestId: string }) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    setIsPending(true);
    setError("");
    
    const result = await createVacancy(requestId);
    
    if (!result.success) {
      setError(result.error || "Something went wrong");
      setIsPending(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCreate}
        disabled={isPending}
        className="flex items-center gap-2 bg-[#069494] hover:bg-[#057a7a] text-white px-4 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-50"
      >
        {isPending ? <Loader2 size={16} className="animate-spin" /> : <PlusCircle size={16} />}
        {isPending ? "Creating..." : "Create Vacancy"}
      </button>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}