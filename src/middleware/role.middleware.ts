import { ResponseHandler } from "../utils/responseHandler";
import { Request, Response, NextFunction } from "express";

export function authorizeRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return ResponseHandler.forbidden(res);
    }
    next();
  };
}
