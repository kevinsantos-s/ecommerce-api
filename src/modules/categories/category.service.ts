import { prisma } from "../../client";
import { AppError } from "../../utils/errorHandler";
import {
  CategoryResponseDTO,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "./category.types";

export class CategoryService {
  async create(
    data: CreateCategoryDTO,
    userId: string
  ): Promise<CategoryResponseDTO> {
    const { name } = data;

    const seller = await prisma.seller.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!seller) {
      throw new AppError("Vendendor não encontrado", 404);
    }

    const alreadyExists = await prisma.category.findUnique({
      where: {
        name_sellerId: {
          name,
          sellerId: seller.id,
        },
      },
    });

    if (alreadyExists) {
      throw new AppError("Já existe uma categoria com esse nome", 409);
    }

    const newCategory = await prisma.category.create({
      data: { name, sellerId: seller.id },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return newCategory;
  }

  async findById(id: string): Promise<CategoryResponseDTO> {
    const category = await prisma.category.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!category) {
      throw new AppError("Categoria não existente", 404);
    }
    return category;
  }

  async findAll(): Promise<CategoryResponseDTO[]> {
    const category = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return category;
  }

  async update(data: UpdateCategoryDTO, userId: string, id: string): Promise<CategoryResponseDTO> {
    const { name } = data;

    const seller = await prisma.seller.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!seller) {
      throw new AppError("Vendendor não encontrado", 404);
    }

    const alreadyExists = await prisma.category.findFirst({
      where: {
        name,
        sellerId: seller.id,
        NOT: { id },
      },
    });

    if (alreadyExists) {
      throw new AppError("Categoria já existente", 409);
    }

    const updatedCategory = await prisma.category.update({
      where: { id, sellerId: seller.id },
      data: { name },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return updatedCategory;
  }

  async delete(id: string, userId: string){
    const seller = await prisma.seller.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!seller) {
      throw new AppError("Vendendor não encontrado", 404);
    }

    const deleteCategory = await prisma.category.delete({
      where: {id, sellerId: seller.id},
    })

    return deleteCategory;
  }
}
