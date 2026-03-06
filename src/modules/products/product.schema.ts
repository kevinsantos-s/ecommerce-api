import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string({ message: "Nome obrigatório" }).min(2),
  brandId: z.uuid({message: "Selecione uma marca"}),
  categoryId: z.uuid({message: "Selecione uma categoria"}),
  isVisible: z.boolean(),
  variants: z.array(z.object({
    price: z.number({message: "Preço obrigatório"}).min(1),
    image: z.string().optional(),
    color: z.string({message: "Insira o nome da cor"}).min(2),
    size: z.string({message: "Tamanhos obrigatórios"}).min(1),
    stock: z.int({message: "Estoque obrigatório "}).min(0),
  })).min(1)
});

export const updateProductSchema = z.object({
  name: z.string({ message: "Nome obrigatório" }).min(2).optional(),
  brandId: z.uuid({message: "Selecione uma marca"}).optional(),
  categoryId: z.uuid({message: "Selecione uma categoria"}).optional(),
  isVisible: z.boolean().optional(),
}).refine((data) => data.name || data.brandId || data.categoryId || data.isVisible !== undefined, {
  message: "Pelo menos um campo deve ser enviado",
})

export const addVariantSchema = z.object({
    variants: z.array(z.object({
    price: z.number({message: "Preço obrigatório"}).min(1),
    image: z.string().optional(),
    color: z.string({message: "Insira o nome da cor"}).min(2),
    size: z.string({message: "Tamanhos obrigatórios"}).min(1),
    stock: z.int({message: "Estoque obrigatório "}).min(0),
    })).min(1)
})

export const updateVariantSchema = z.object({
  price: z.number({ message: "Preço obrigatório" }).min(1).optional(),
  image: z.string().optional(),
  color: z.string({ message: "Insira o nome da cor" }).min(2).optional(),
  size: z.string({ message: "Tamanhos obrigatórios" }).min(1).optional(),
  stock: z.int({ message: "Estoque obrigatório" }).min(0).optional(),
}).refine((data) => data.price || data.image || data.color || data.size || data.stock, {
  message: "Pelo menos um campo deve ser enviado",
});
