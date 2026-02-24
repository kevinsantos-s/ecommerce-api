import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { ResponseHandler } from "../utils/responseHandler";

export function validateData(schema: {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
}) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (schema.body) {
      const result = schema.body.safeParse(req.body);
      if (!result.success) {
        return ResponseHandler.badRequest(res, result.error.issues[0].message);
      }
      req.body = result.data;
    }

    if (schema.params) {
      const result = schema.params.safeParse(req.params);
      if (!result.success) {
        return ResponseHandler.badRequest(res, result.error.issues[0].message);
      }
      Object.assign(req.params, result.data);
    }

    if (schema.query) {
      const result = schema.query.safeParse(req.query);
      if (!result.success) {
        return ResponseHandler.badRequest(res, result.error.issues[0].message);
      }
      Object.assign(req.query, result.data);
    }

    next();
  };
}