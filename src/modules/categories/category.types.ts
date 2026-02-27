import z from "zod";
import { createCategorySchema, updateCategorySchema } from "./category.schema";


export type CreateCategoryDTO = z.infer<typeof createCategorySchema>
export type UpdateCategoryDTO = z.infer<typeof updateCategorySchema>

export type CategoryResponseDTO = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}