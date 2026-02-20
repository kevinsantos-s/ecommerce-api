import { prisma } from "../../client";
import { AppError } from "../../utils/errorHandler";
import { LoginDTO } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  async auth(data: LoginDTO) {
    const { email, password } = data;

    if (!email || !password) {
      throw new AppError("Insira todos os campos!", 400);
    }
    const findEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (!findEmail) {
      throw new AppError("Email não encontrado", 404);
    }
    const match = await bcrypt.compare(password, findEmail.password);

    if (!match) {
      throw new AppError("Senha incorreta!", 401);
    }
    const token = jwt.sign(
      { id: findEmail.id, role: findEmail.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );
    return token;
  }
}
