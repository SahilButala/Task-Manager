import { z } from "zod";

// ===============================
// Login DTO
// ===============================
export const loginDto = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

// ===============================
// Register DTO (if exists / future-ready)
// ===============================
export const registerDto = z.object({
  body: z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["admin", "member"]).optional(),
  }),
});

// ===============================
// Update Profile DTO
// ===============================
export const updateProfileDto = z.object({
  body: z.object({
    name: z.string().min(2).max(50).optional(),
    profileImageUrl: z.string().url().optional(),
  }),
});
