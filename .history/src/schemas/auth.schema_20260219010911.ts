import { z } from "zod/v4";

export const registerSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(8, { error: "Minimum 8 characters" }),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string(),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
