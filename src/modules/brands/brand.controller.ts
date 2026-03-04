import { errorHandler } from "../../utils/errorHandler";
import { ResponseHandler } from "../../utils/responseHandler";
import { BrandService } from "./brand.service";
import { Request, Response } from "express";

export class BrandController {
  service = new BrandService();
  async create(req: Request, res: Response) {
    try {
      const userId = req.user!.id
      const brand = await this.service.create(req.body, userId);
      return ResponseHandler.created(res, brand);
    } catch (error) {
      return errorHandler(res, error);
    }
  }
  async findById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const brand = await this.service.findById(id);
      return ResponseHandler.sucess(res, brand);
    } catch (error) {
      return errorHandler(res, error);
    }
  }
  async findAll(req: Request, res: Response) {
    try {
      const sellerId = req.params.sellerId as string;
      const brand = await this.service.findAll(sellerId);
      return ResponseHandler.sucess(res, brand);
    } catch (error) {
      return errorHandler(res, error);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const userId = req.user!.id
      const brand = await this.service.update(req.body, id, userId);
      return ResponseHandler.sucess(res, brand);
    } catch (error) {
      return errorHandler(res, error);
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const userId = req.user!.id
      const brand = await this.service.delete(id, userId);
      return ResponseHandler.sucess(res, brand);
    } catch (error) {
      return errorHandler(res, error);
    }
  }
}
