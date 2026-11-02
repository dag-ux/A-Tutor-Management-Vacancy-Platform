// app/components/AuthForm.tsx
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";

export default function AuthForm({ defaultIsLogin = true }: { defaultIsLogin?: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"PARENT" | "TUTOR">("PARENT");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isLogin = defaultIsLogin;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await authClient.signIn.email({ email, password });
        if (error) throw new Error(error.message || "Login failed");
      } else {
        const { error } = await authClient.signUp.email({ email, password, name, role });
        if (error) throw new Error(error.message || "Signup failed");
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          {isLogin ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          {isLogin ? "Enter your details to access your dashboard." : "Start your journey with us today."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <input
                type="text" value={name} onChange={(e) => setName(e.target.value)} required
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-2 focus:ring-[#069494]/20 outline-none transition"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              placeholder="name@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-2 focus:ring-[#069494]/20 outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:border-[#069494] focus:ring-2 focus:ring-[#069494]/20 outline-none transition"
            />
          </div>
        </div>

        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">I am a</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button" onClick={() => setRole("PARENT")}
                className={`py-3 rounded-xl border-2 font-medium transition ${role === "PARENT" ? "border-[#069494] bg-[#069494]/10 text-[#069494]" : "border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-300"}`}
              >
                Parent
              </button>
              <button
                type="button" onClick={() => setRole("TUTOR")}
                className={`py-3 rounded-xl border-2 font-medium transition ${role === "TUTOR" ? "border-[#069494] bg-[#069494]/10 text-[#069494]" : "border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-300"}`}
              >
                Tutor
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-200 dark:border-red-900/50">
            {error}
          </div>
        )}

        <button
          type="submit" disabled={isLoading}
          className="w-full bg-[#069494] hover:bg-[#057a7a] disabled:opacity-70 text-white py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,148,148,0.3)] mt-2"
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <>{isLogin ? "Sign In" : "Create Account"} <ArrowRight size={18} /></>}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              router.push(isLogin ? "/register" : "/login");
            }}
            className="font-bold text-[#069494] hover:underline"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}