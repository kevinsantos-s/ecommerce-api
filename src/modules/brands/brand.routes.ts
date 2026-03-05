import { Router } from "express";
import { BrandController } from "./brand.controller";
import { createBrandSchema, updateBrandSchema } from "./brand.schema";
import { ROLES } from "../../config/roles";
import { validateData } from "../../middleware/validate.middleware";
import { authenticateToken } from "../auth/auth.middleware";
import { authorizeRole } from "../../middleware/role.middleware"; 
import { idParamSchema } from "../../utils/schemas";
import { checkSellerApproved } from "../../middleware/seller.middleware";

export const brandRoutes = Router();

const controller = new BrandController()

brandRoutes.post("/", authenticateToken, authorizeRole(...ROLES.SELLER_ONLY), checkSellerApproved, validateData({ body: createBrandSchema }), (req, res) => controller.create(req, res));
brandRoutes.get("/:id", validateData({ params: idParamSchema }), (req, res) => controller.findById(req, res));
brandRoutes.get("/", (req, res) => controller.findAll(req, res));
brandRoutes.put("/:id", authenticateToken, authorizeRole(...ROLES.SELLER_ONLY), checkSellerApproved, validateData({ params: idParamSchema, body: updateBrandSchema }), (req, res) => controller.update(req, res));
brandRoutes.delete("/:id", authenticateToken,  authorizeRole(...ROLES.SELLER_ONLY), checkSellerApproved, validateData({ params: idParamSchema }), (req, res) => controller.delete(req, res));
