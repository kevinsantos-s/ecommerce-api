import { errorHandler } from "../../utils/errorHandler";
import { ResponseHandler } from "../../utils/responseHandler";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";

export class AuthController {
  service = new AuthService();

  async auth(req: Request, res: Response) {
    try {
      const { accessToken, refreshToken } = await this.service.auth(req.body);

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/auth/refresh",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return ResponseHandler.sucess(res, null, "Login realizado com sucesso");
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const accessToken = await this.service.refresh(req.cookies.refreshToken);

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });

      return ResponseHandler.sucess(res, null);
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.clearCookie("refreshToken", {
        path: "/auth/refresh",
      });
      res.clearCookie("accessToken");
      return ResponseHandler.sucess(res, null, "Deslogado com sucesso");
    } catch (error) {
      return errorHandler(res, error);
    }
  }
}
