import { NextFunction, Request, Response } from "express";
import { prisma } from "../client";
import { SellerStatus } from "@prisma/client";
import { ResponseHandler } from "../utils/responseHandler";

export async function checkSellerApproved(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user!.id;

    const seller = await prisma.seller.findUnique({
      where: { userId },
    });

    if (!seller) {
      return ResponseHandler.notFound(res);
    }

    if (seller.status !== SellerStatus.APPROVED) {
      return ResponseHandler.forbidden(res);
    }

    next();
  } catch (error) {
    return ResponseHandler.badRequest(res);
  }
}