// app/components/SignOutButton.tsx
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";

export default function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all duration-200"
    >
      {isLoading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <>
          <LogOut size={18} /> Sign Out
        </>
      )}
    </button>
  );
}