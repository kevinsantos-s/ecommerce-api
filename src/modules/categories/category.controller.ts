import { errorHandler } from "../../utils/errorHandler";
import { ResponseHandler } from "../../utils/responseHandler";
import { CategoryService } from "./category.service";
import { Request, Response } from "express";

export class CategoryController {
  service = new CategoryService();

  async create(req: Request, res: Response) {
    try {
      const category = await this.service.create(req.body);
      return ResponseHandler.created(res, category);
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const category = await this.service.findById(id);
      return ResponseHandler.success(res, category);
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const category = await this.service.findAll();
      return ResponseHandler.success(res, category);
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const category = await this.service.update(req.body, id);
      return ResponseHandler.success(res, category);
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const category = await this.service.delete(id);
      return ResponseHandler.success(res, category);
    } catch (error) {
      return errorHandler(res, error);
    }
  }
}
