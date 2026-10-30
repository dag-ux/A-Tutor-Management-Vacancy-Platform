// app/register/page.tsx
"use client";

import { useActionState } from "react";
import { registerUser, type ActionState } from "@/app/actions/auth";

export default function RegisterPage() {
  // useActionState binds our server action to the form and tracks its state
  const [state, formAction, isPending] = useActionState<ActionState | null, FormData>(
    registerUser,
    null
  );

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Create an account</h1>

        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              I am a
            </label>
            <select
              id="role"
              name="role"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="PARENT">Parent looking for a tutor</option>
              <option value="TUTOR">Tutor looking for work</option>
            </select>
          </div>

          {/* Show Error Message */}
          {state && !state.success && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {state.error}
            </div>
          )}

          {/* Show Success Message */}
          {state && state.success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
              {state.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition"
          >
            {isPending ? "Creating account..." : "Sign up"}
          </button>
        </form>
      </div>
    </main>
  );
}