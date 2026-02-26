import { Router } from "express";
import { UserController } from "./user.controller";
import { validateData } from "../../middleware/validate.middleware";
import { createUserSchema, idParamSchema, updateUserSchema } from "./user.schema";
import { authenticateToken } from "../auth/auth.middleware";
import { authorizeRole } from "../../middleware/role.middleware";
import { ROLES } from "../../config/roles";

export const userRoutes = Router();

const controller = new UserController();

userRoutes.post("/", validateData({ body: createUserSchema }), (req, res) => controller.create(req, res));
userRoutes.get("/:id", authenticateToken,  authorizeRole(...ROLES.ALL), validateData({ params: idParamSchema }), (req, res) => controller.findById(req, res));
userRoutes.get("/", authenticateToken, authorizeRole(...ROLES.ADMIN_ONLY), (req, res) => controller.findAll(req, res));
userRoutes.put("/:id", authenticateToken, authorizeRole(...ROLES.ALL), validateData({ params: idParamSchema, body: updateUserSchema }), (req, res) => controller.update(req, res));
userRoutes.delete("/:id", authenticateToken,  authorizeRole(...ROLES.ALL), validateData({ params: idParamSchema }), (req, res) => controller.delete(req, res));
