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

const productSelect = {
  id: true,
  name: true,
  brandId: true,
  categoryId: true,
  isVisible: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  variants: true,
};
export class ProductService {
  async createProduct(
    data: CreateProductDTO,
    userId: string
  ): Promise<ProductResponseDTO> {
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
      where: { id: categoryId },
    });
    if (!category) {
      throw new AppError("Categoria não encontrada", 404);
    }

    const product = await prisma.product.create({
      data: {
        name: name,
        brandId,
        categoryId,
        isVisible,
        sellerId: seller.id,
        variants: {
          createMany: {
            data: variants.map((variant) => ({
              price: variant.price,
              color: variant.color,
              size: variant.size,
              stock: variant.stock,
              image: variant.image,
            })),
          },
        },
      },
      select: productSelect,
    });
    return product;
  }

  async findById(id: string) {
    const product = await prisma.product.findUnique({
      where: {
        id,
        isVisible: true,
        deletedAt: null,
      },

      select: productSelect,
    });
    if (!product) {
      throw new AppError("Produto não encontrado", 404);
    }

    return product;
  }

  async findAll() {
    const products = await prisma.product.findMany({
      where: {
        isVisible: true,
        deletedAt: null,
      },
      select: productSelect,
    });
    return products;
  }

  async update(
    data: UpdateProductDTO,
    id: string,
    userId: string
  ): Promise<ProductResponseDTO> {
    const { name, brandId, categoryId, isVisible } = data;

    const seller = await prisma.seller.findUnique({
      where: { userId },
    });
    if (!seller) {
      throw new AppError("Vendedor não encontrado", 404);
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id,
        sellerId: seller.id,
      },
      data: {
        name,
        brandId,
        categoryId,
        isVisible,
      },
      select: productSelect,
    });
    return updatedProduct;
  }

  async toggleVisibility(id: string, userId: string) {
    const seller = await prisma.seller.findUnique({
      where: { userId },
    });

    if (!seller) {
      throw new AppError("Vendedor não encontrado", 404);
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new AppError("Produto não encontrado", 404);
    }
    const updated = await prisma.product.update({
      where: { id, sellerId: seller.id },
      data: { isVisible: !product.isVisible },
      select: productSelect,
    });
    return updated;
  }

  async softDeleteProduct(){
    
  }
}
