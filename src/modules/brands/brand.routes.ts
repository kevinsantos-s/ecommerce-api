import { Router } from "express";
import { BrandController } from "./brand.controller";
import { createBrandSchema, updateBrandSchema } from "./brand.schema";
import { ROLES } from "../../config/roles";
import { validateData } from "../../middleware/validate.middleware";
import { authenticateToken } from "../auth/auth.middleware";
import { authorizeRole } from "../../middleware/role.middleware"; 
import { idParamSchema } from "../../utils/schemas";

export const brandRoutes = Router();

const controller = new BrandController()

brandRoutes.post("/", authenticateToken, validateData({ body: createBrandSchema }), authorizeRole(...ROLES.SELLER_ONLY), (req, res) => controller.create(req, res));
brandRoutes.get("/:id", validateData({ params: idParamSchema }), (req, res) => controller.findById(req, res));
brandRoutes.get("/", (req, res) => controller.findAll(req, res));
brandRoutes.put("/:id", authenticateToken, authorizeRole(...ROLES.SELLER_ONLY), validateData({ params: idParamSchema, body: updateBrandSchema }), (req, res) => controller.update(req, res));
brandRoutes.delete("/:id", authenticateToken,  authorizeRole(...ROLES.SELLER_ONLY), validateData({ params: idParamSchema }), (req, res) => controller.delete(req, res));
