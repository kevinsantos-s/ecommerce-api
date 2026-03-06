

import { z } from "zod";
import { addVariantSchema, createProductSchema, updateProductSchema, updateVariantSchema } from "./product.schema";

export type CreateProductDTO = z.infer<typeof createProductSchema>
export type UpdateProductDTO = z.infer<typeof updateProductSchema>
export type AddVariantDTO = z.infer<typeof addVariantSchema>
export type UpdateVariantDTO = z.infer<typeof updateVariantSchema>



export type ProductResponseDTO = {
  id: string;
  name: string;
  brandId: string;
  categoryId: string;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null; 
  variants: VariantResponseDTO[]
}

export type VariantResponseDTO = {
    id: string;
    price: number;
    image: string;
    color: string;
    size: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}