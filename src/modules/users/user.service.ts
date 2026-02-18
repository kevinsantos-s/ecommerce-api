import { prisma } from "../../client";
import { CreateUserDTO, UserResponseDTO, UpdateUserDTO } from "./user.interface";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/errors";

export class UserService {
  async create(data: CreateUserDTO): Promise<UserResponseDTO> {
    const { email, password, name } = data;

    if (!email || !password || !name) {
      throw new AppError("Insira todos os campos!", 400);
    }

    const alreadyExists = await prisma.user.findUnique({
      where: { email },
    });

    if (alreadyExists) {
      throw new AppError("Já existe um usuário com este Email!", 409);
    }

    if (!email.includes("@")) {
      throw new AppError("Email inválido!", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { email: email, password: hashedPassword, name: name },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return newUser;
  }

  async findById(id: string): Promise<UserResponseDTO> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      }
    });
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }
    return user;
  }

    async findAll(): Promise<UserResponseDTO[]>{
    const user = await prisma.user.findMany({
      select: { 
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      }
    })
    return user;
  }

  async update(id: string, data: UpdateUserDTO): Promise<UserResponseDTO>{
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if(!user){
      throw new AppError("Usuário não encontrado", 404);
    }
    if(data.email && !data.email.includes("@")){
      throw new AppError("Email Inválido", 400)
    }
    if(!data.name && !data.email){
      throw new AppError("Nenhum dado para atualizar", 400)
    }
    if(data.email){
    const emailExists = await prisma.user.findUnique({
      where: { email: data.email }
    });
    if (emailExists && emailExists.id !== id) {
      throw new AppError("Email já existente", 409)
    }
  }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { 
        name: data.name,
        email: data.email 
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      }
    })
    return updatedUser;
  }

  async delete(id: string) {
    const idExists = await prisma.user.findUnique({
      where: { id }
    })
    if(!idExists){
      throw new AppError("Id não existente", 404)
    }
    const deleted = await prisma.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      }
    });
    return deleted;    
  }
}
