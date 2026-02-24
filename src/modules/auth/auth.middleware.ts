import jwt from "jsonwebtoken";
import { ResponseHandler } from "../../utils/responseHandler";
import { Request, Response, NextFunction } from "express";
import { TokenPayload } from "./auth.types";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const acessToken = req.cookies.acessToken;

  if (!acessToken) {
    return ResponseHandler.unauthorized(res, "Autenticação requerida");
  }
  try {
    const decoded = jwt.verify(acessToken, process.env.JWT_SECRET!) as TokenPayload;
    req.user = decoded;
    next();
  } catch {
    return ResponseHandler.unauthorized(res, "Token inválido ou expirado");
  }
};
