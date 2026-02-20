import { errorHandler } from "../../utils/errorHandler";
import { ResponseHandler } from "../../utils/responseHandler";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";

export class AuthController {
  service = new AuthService();

  async auth(req: Request, res: Response) {
    try {
      const login = await this.service.auth(req.body);
      return ResponseHandler.sucess(res, login);
    } catch (error) {
      return errorHandler(res, error);
    }
  }
}
