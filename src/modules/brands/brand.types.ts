import { z } from "zod";
import { createBrandSchema, updateBrandSchema } from "./brand.schema";

export type CreateBrandDTO = z.infer<typeof createBrandSchema>
export type UpdateBrandDTO = z.infer<typeof updateBrandSchema>

export type BrandResponseDTO = {
  id: string;
  name: string;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}