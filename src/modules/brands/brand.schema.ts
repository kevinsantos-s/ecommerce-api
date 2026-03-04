import { z } from "zod";

export const createBrandSchema = z.object({
  name: z.string({ message: "Nome obrigatório" }).min(2),
  image: z.string().optional(),
});

export const updateBrandSchema = z
  .object({
    name: z.string({ message: "Nome obrigatório" }).min(2).optional(),
    image: z.string().optional(),
  })
  .refine((data) => data.name || data.image, {
    message: "Pelo menos um campo deve ser enviado",
  });
