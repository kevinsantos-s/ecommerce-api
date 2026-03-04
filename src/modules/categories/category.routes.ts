import { Router } from "express";
import { CategoryController } from "./category.controller";
import { createCategorySchema, idParamSchema, updateCategorySchema } from "./category.schema";
import { ROLES } from "../../config/roles";
import { validateData } from "../../middleware/validate.middleware";
import { authenticateToken } from "../auth/auth.middleware";
import { authorizeRole } from "../../middleware/role.middleware"; 

export const categoryRoutes = Router();

const controller = new CategoryController()

categoryRoutes.post("/", authenticateToken, validateData({ body: createCategorySchema }), authorizeRole(...ROLES.ADMIN_ONLY), (req, res) => controller.create(req, res));
categoryRoutes.get("/:id", authenticateToken,  authorizeRole(...ROLES.ALL), validateData({ params: idParamSchema }), (req, res) => controller.findById(req, res));
categoryRoutes.get("/", authorizeRole(...ROLES.ALL), (req, res) => controller.findAll(req, res));
categoryRoutes.put("/:id", authenticateToken, authorizeRole(...ROLES.ADMIN_ONLY), validateData({ params: idParamSchema, body: updateCategorySchema }), (req, res) => controller.update(req, res));
categoryRoutes.delete("/:id", authenticateToken,  authorizeRole(...ROLES.ADMIN_ONLY), validateData({ params: idParamSchema }), (req, res) => controller.delete(req, res));
