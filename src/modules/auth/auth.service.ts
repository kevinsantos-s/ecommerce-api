import { prisma } from "../../client";
import { AppError } from "../../utils/errorHandler";
import { ResponseHandler } from "../../utils/responseHandler";
import { LoginDTO, TokenPayload } from "./auth.types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  async auth(data: LoginDTO) {
    const { email, password } = data;

    const findEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (!findEmail) {
      throw new AppError("Login Inválido", 401);
    }
    const match = await bcrypt.compare(password, findEmail.password);

    if (!match) {
      throw new AppError("Login Inválido", 401);
    }
    const acessToken = jwt.sign(
      { id: findEmail.id, role: findEmail.role },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { id: findEmail.id, role: findEmail.role },
      process.env.JWT_REFRESHTOKEN!,
      { expiresIn: "7d" }
    );
    return { acessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESHTOKEN!
    ) as TokenPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    return accessToken;
  }
}
