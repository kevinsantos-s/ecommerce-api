import { Request, Response } from "express";
import { UserService } from "./user.service";
import { AppError } from "../../utils/errorHandler";
import { errorHandler } from "../../utils/errorHandler";
import { ResponseHandler } from "../../utils/responseHandler";

export class UserController {
  service = new UserService();

  async create(req: Request, res: Response) {
    try {
      const user = await this.service.create(req.body);
      return ResponseHandler.created(res, user);
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async findById(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.service.findById(id);
      return ResponseHandler.sucess(res, user);
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const user = await this.service.findAll();
      return ResponseHandler.sucess(res, user);
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async update(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.service.update(id, req.body);
      return ResponseHandler.sucess(res, user);
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.service.delete(id);
      return ResponseHandler.sucess(res, user);
    } catch (error) {
      return errorHandler(res, error);
    }
  }
}
