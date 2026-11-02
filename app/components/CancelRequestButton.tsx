// app/components/CancelRequestButton.tsx
"use client";

import { useState } from "react";
import { cancelParentRequest } from "@/app/actions/request";
import { Loader2, Trash2 } from "lucide-react";

export default function CancelRequestButton({ requestId }: { requestId: string }) {
  const [isPending, setIsPending] = useState(false);

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this request?")) return;
    
    setIsPending(true);
    await cancelParentRequest(requestId);
    setIsPending(false);
  };

  return (
    <button
      onClick={handleCancel}
      disabled={isPending}
      className="text-zinc-400 hover:text-red-500 transition p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
      title="Cancel Request"
    >
      {isPending ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
    </button>
  );
}