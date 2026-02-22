import z from "zod";

export const loginSchema = z.object({
    email: z.email({ message: "Email inválido" }),
    password: z.string().min(5, { message: "Senha deve ter no mínimo 5 caracteres" }),
})