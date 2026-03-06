import { prisma } from "../../client";
import { AppError } from "../../utils/errorHandler";
import {
  ProductResponseDTO,
  CreateProductDTO,
  UpdateProductDTO,
  AddVariantDTO,
  UpdateVariantDTO,
  VariantResponseDTO,
} from "./product.types";

export class ProductService {
  async createProduct(data: CreateProductDTO, id: string, userId: string) {
    const { name, brandId, categoryId, isVisible, variants } = data;

    const seller = await prisma.seller.findUnique({
      where: { userId },
    });
    if (!seller) {
      throw new AppError("Vendedor não encontrado", 404);
    }

    const brand = await prisma.brand.findFirst({
      where: {
        id: brandId,
        sellerId: seller.id,
      },
    });
    if (!brand) {
      throw new AppError("Marca não encontrada", 404);
    }
    const category = await prisma.category.findUnique({
        where: {id}
    })
    if (!category){
        throw new AppError("Categoria não encontrada", 404);
    }

    const product = await prisma.product.create({
        where: {data}
    })
  }
}
