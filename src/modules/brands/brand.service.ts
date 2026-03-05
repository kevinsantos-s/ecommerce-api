import { prisma } from "../../client";
import { AppError } from "../../utils/errorHandler";
import {
  BrandResponseDTO,
  CreateBrandDTO,
  UpdateBrandDTO,
} from "./brand.types";

const brandSelect = {
  id: true,
  name: true,
  image: true,
  createdAt: true,
  updatedAt: true,
};

export class BrandService {
  async create(
    data: CreateBrandDTO,
    userId: string
  ): Promise<BrandResponseDTO> {
    const { name, image } = data;

    const seller = await prisma.seller.findUnique({
      where: { userId },
    });
    if (!seller) {
      throw new AppError("Vendedor não encontrado", 404);
    }

    const alreadyExistsBrand = await prisma.brand.findUnique({
      where: {
        name_sellerId: {
          name,
          sellerId: seller.id,
        },
      },
    });

    if (alreadyExistsBrand) {
      throw new AppError("Marca já existente", 409);
    }

    const brand = await prisma.brand.create({
      data: { name, image, sellerId: seller.id },
      select: brandSelect,
    });
    return brand;
  }

  async findById(id: string): Promise<BrandResponseDTO> {
    const brand = await prisma.brand.findUnique({
      where: { id },
      select: brandSelect,
    });

    if (!brand) {
      throw new AppError("Marca não encontrada", 404);
    }
    return brand;
  }

  async findAll(sellerId: string): Promise<BrandResponseDTO[]> {
    const brand = await prisma.brand.findMany({
      where: { sellerId },
      select: brandSelect,
    });
    return brand;
  }

  async update(
    data: UpdateBrandDTO,
    id: string,
    userId: string
  ): Promise<BrandResponseDTO> {
    const { name, image } = data;

    const seller = await prisma.seller.findUnique({
      where: { userId },
    });
    if (!seller) {
      throw new AppError("Vendedor não encontrado", 404);
    }

    const alreadyExistsBrand = await prisma.brand.findFirst({
      where: {
         name,
         sellerId: seller.id,
         NOT: {id}
        },
    })

    if(alreadyExistsBrand){
      throw new AppError("Marca já existente", 409)
    }

    const updatedBrand = await prisma.brand.update({
      where: { id, sellerId: seller.id },
      data: { name, image },
      select: brandSelect,
    });

    return updatedBrand;
  }
  
  async delete(id: string, userId: string) {
    const seller = await prisma.seller.findUnique({
      where: { userId },
    });
    if (!seller) {
      throw new AppError("Vendedor não encontrado", 404);
    }
    const brand = await prisma.brand.delete({
      where: { id, sellerId: seller.id },
    });
    return brand;
  }
}
