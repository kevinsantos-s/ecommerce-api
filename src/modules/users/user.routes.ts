import { Router } from "express";
import { UserController } from "./user.controller";
import { validateData } from "../../middleware/validate.middleware";
import { createUserSchema, idParamSchema, updateUserSchema } from "./user.schema";
import { authenticateToken } from "../auth/auth.middleware";
import { authorizeRole } from "../../middleware/role.middleware";

export const userRoutes = Router();

const controller = new UserController();

userRoutes.post("/", validateData({ body: createUserSchema }), (req, res) => controller.create(req, res));
userRoutes.get("/:id", authenticateToken,  authorizeRole("ADMIN"), validateData({ params: idParamSchema }), (req, res) => controller.findById(req, res));
userRoutes.get("/", authenticateToken, authorizeRole("ADMIN"), (req, res) => controller.findAll(req, res));
userRoutes.put("/:id", authenticateToken, authorizeRole("USER"), validateData({ params: idParamSchema, body: updateUserSchema }), (req, res) => controller.update(req, res));
userRoutes.delete("/:id", authenticateToken,  authorizeRole("USER"), validateData({ params: idParamSchema }), (req, res) => controller.delete(req, res));
