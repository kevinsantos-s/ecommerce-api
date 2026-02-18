import { Request, Response } from "express";
import { UserService } from "./user.service";
import { AppError } from "../../utils/errors";

export class UserController {
  service = new UserService();

  async create(req: Request, res: Response) {
    try {
      const user = await this.service.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor");
    }
  }
}
