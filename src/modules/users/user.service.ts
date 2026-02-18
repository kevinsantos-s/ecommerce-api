import { prisma } from "../../client";
import { CreateUserDTO, UserResponseDTO } from "./user.interface";
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
    });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };
  }
}
