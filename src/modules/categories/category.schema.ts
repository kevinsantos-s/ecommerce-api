import { z } from "zod";

export const idParamSchema = z.object({
  id: z.uuid(),
});

export const createCategorySchema = z.object({
    name: z.string({ message: "Nome precisa ser inserido" }).min(2, { message: "Nome deve ter no mínimo 2 caracteres" }),
})

export const updateCategorySchema = z.object({
    name: z.string().min(2, { message: "Nome deve ter no mínimo 2 caracteres" }),
})