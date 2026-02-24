import z from "zod";
import { loginSchema } from "./auth.schema";

export type LoginDTO = z.infer <typeof loginSchema>

export type TokenPayload = {
    id: string
    role: string
    iat: number
    exp: number
}