import { z } from "zod";
import { createUserSchema, updateUserSchema } from "./user.schema";

export type CreateUserDTO = z.infer<typeof createUserSchema>
export type UpdateUserDTO = z.infer<typeof updateUserSchema>

export type UserResponseDTO = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
