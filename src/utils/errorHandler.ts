import { Response } from "express";
import { ResponseHandler } from "./responseHandler";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function errorHandler(res: Response, error: unknown) {
  if (error instanceof AppError) {
    return ResponseHandler.error(res, error.message, error.statusCode);
  }
if (error instanceof PrismaClientKnownRequestError) {
  if (error.code === "P2002") {
    return ResponseHandler.conflict(res, "Recurso já existe");
  }
  if (error.code === "P2025") {
    return ResponseHandler.notFound(res, "Recurso não encontrado");
  }
  if (error.code === "P2003") {
    return ResponseHandler.badRequest(res, "Referência inválida");
  }
  return ResponseHandler.error(res, "Erro de banco de dados", 500);
}
  return ResponseHandler.error(res, "Erro interno do servidor", 500);
}
