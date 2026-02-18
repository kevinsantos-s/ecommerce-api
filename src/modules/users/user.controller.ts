import { Request, Response } from "express";
import { UserService } from "./user.service";
import { AppError } from "../../utils/errorHandler";
import { handleError } from "../../utils/errorHandler";

export class UserController {
  service = new UserService();

  async create(req: Request, res: Response) {
    try {
      const user = await this.service.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async findById(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.service.findById(id);
      return res.status(200).json(user);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const user = await this.service.findAll();
      return res.status(200).json(user);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async update(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.service.update(id, req.body);
      return res.status(200).json(user);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.service.delete(id);
      return res.status(200).json(user);
    } catch (error) {
      return handleError(res, error);
    }
  }
}
