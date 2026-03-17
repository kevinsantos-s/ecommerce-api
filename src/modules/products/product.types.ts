

import { z } from "zod";
import { addVariantSchema, createProductSchema, updateProductSchema, updateVariantSchema } from "./product.schema";
import { Decimal } from "@prisma/client/runtime/library";

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
    price: Decimal;
    image: string | null;
    color: string;
    size: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}