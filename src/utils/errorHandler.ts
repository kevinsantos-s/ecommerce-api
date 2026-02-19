import { Response } from "express";
import { ResponseHandler } from "./responseHandler";

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
  return ResponseHandler.error(res, "Erro interno do servidor", 500);
}
