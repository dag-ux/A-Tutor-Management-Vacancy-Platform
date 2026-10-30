// app/actions/auth.ts
"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations/auth";

export type ActionState =
  | { success: true; message: string }
  | { success: false; error: string };

export async function registerUser(
  _prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  // 1. Extract raw values from the form
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  };

  // 2. Validate with Zod
  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid input";
    return { success: false, error: firstError };
  }

  const { email, password, role } = parsed.data;

  try {
    // 3. Check for existing user
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { success: false, error: "An account with this email already exists" };
    }

    // 4. Hash the password (never store plaintext)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create the user
    await prisma.user.create({
      data: { email, password: hashedPassword, role },
    });

    return { success: true, message: "Account created successfully" };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}