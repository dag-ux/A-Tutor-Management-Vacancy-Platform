// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // In production, change this to your real domain
});

export const { signIn, signUp, useSession } = authClient;