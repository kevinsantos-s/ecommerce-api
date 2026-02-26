import jwt from "jsonwebtoken";
import { ResponseHandler } from "../../utils/responseHandler";
import { Request, Response, NextFunction } from "express";
import { TokenPayload } from "./auth.types";
import { TokenExpiredError } from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return ResponseHandler.unauthorized(res, "Autenticação requerida");
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as TokenPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
        return ResponseHandler.unauthorized(res, "Token expirado")
    }
    return ResponseHandler.unauthorized(res, "Token inválido")
}
};
