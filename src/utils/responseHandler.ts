import { Response } from "express";

export class ResponseHandler {
  private static send(
    res: Response,
    success: boolean,
    message: string,
    statusCode: number,
    data?: unknown,
    error?: unknown,
  ) {
    return res.status(statusCode).json({
      success,
      message,
      ...(data !== undefined && { data }),
      ...(error !== undefined && { error }),
    });
  }

  public static sucess(
    res: Response,
    data?: unknown,
    message = "Operação realizada com sucesso.",
  ) {
    return this.send(res, true, message, 200, data);
  }

  public static created(
    res: Response,
    data?: unknown,
    message = "Recurso criado com sucesso.",
  ) {
    return this.send(res, true, message, 201, data);
  }

  public static error(
    res: Response,
    message = "Erro interno do servidor.",
    statusCode = 500,
    error?: unknown,
  ) {
    console.log(error)
    return this.send(res, false, message, statusCode, undefined, error);
  }

  public static badRequest(
    res: Response,
    message = "Requisição inválida.",
    error?: unknown,
  ) {
    return this.send(res, false, message, 400, undefined, error);
  }

  public static unauthorized(
    res: Response,
    message = "Usuário não autenticado.",
  ) {
    return this.send(res, false, message, 401);
  }

  public static notFound(res: Response, message = "Recurso não encontrado.") {
    return this.send(res, false, message, 404);
  }

  public static conflict(res: Response, message = "Recurso em conflito.") {
    return this.send(res, false, message, 409);
  }

  public static forbidden(res: Response, message = "Acesso negado.") {
    return this.send(res, false, message, 403);
  }
}