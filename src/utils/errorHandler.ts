import { Response } from "express";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function handleError(res: Response, error: unknown) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json(error.message);
  }
  return res.status(500).json("Erro interno do servidor");
}
