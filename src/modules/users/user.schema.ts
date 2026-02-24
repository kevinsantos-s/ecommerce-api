import { z } from "zod";

export const idParamSchema = z.object({
  id: z.uuid(),
});

export const createUserSchema = z.object({
    name: z.string({ message: "Nome precisa ser inserido" }).min(2, { message: "Nome deve ter no mínimo 2 caracteres" }),
    email: z.email({ message: "Email inválido" }),
    password: z.string().min(5, { message: "Senha deve ter no mínimo 5 caracteres" }),
})

export const updateUserSchema = z.object({
    name: z.string().min(2, { message: "Nome deve ter no mínimo 2 caracteres" }).optional(),
    email: z.email({ message: "Email inválido" }).optional(),
})

