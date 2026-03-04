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
  ): Promise<CategoryResponseDTO> {
    const { name } = data;

    const alreadyExists = await prisma.category.findUnique({
      where: {name},     
    });

    if (alreadyExists) {
      throw new AppError("Já existe uma categoria com esse nome", 409);
    }

    const newCategory = await prisma.category.create({
      data: { name },
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

  async update(data: UpdateCategoryDTO, id: string): Promise<CategoryResponseDTO> {
    const { name } = data;

    const alreadyExists = await prisma.category.findFirst({
      where: {
        name, NOT: { id },
      },
    });

    if (alreadyExists) {
      throw new AppError("Categoria já existente", 409);
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
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

  async delete( id: string ){

    const deleteCategory = await prisma.category.delete({
      where: { id },
    })

    return deleteCategory;
  }
}
