import { z } from "zod/v4";

export const productSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    price: z.number().positive(),
  }),
});

export type ProductInput = z.infer<typeof productSchema>["body"];
