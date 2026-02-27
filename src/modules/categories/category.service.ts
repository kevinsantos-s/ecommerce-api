import { prisma } from "../../client";
import { AppError } from "../../utils/errorHandler";
import { CategoryResponseDTO, CreateCategoryDTO } from "./category.types";

export class CategoryService {
  async create(data: CreateCategoryDTO): Promise<CategoryResponseDTO> {
    const { name } = data;

    const alreadyExists = await prisma.category.findUnique({
      where: { name },
    });

    if (alreadyExists){
        throw new AppError("Já existe uma categoria com esse nome", 409);
    }

    const newCategory = await prisma.category.create({
        data: {name},
        select: {id, name, createdAt, updatedAt}
    })

    return newCategory;
  }
}

// o que a service deve fazer:
// criar categoria deve criar categoria
// verificar se colocou nome

// model Category {
//  id        String    @id @default(uuid())
//  name      String
//  createdAt DateTime @default(now())
//  updatedAt DateTime @updatedAt
//  products  Product[]
