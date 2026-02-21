import { z } from "zod/v4";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const productSchema = z.object({
  name: z.string().min(3),
  price: z.number().positive(),
});
