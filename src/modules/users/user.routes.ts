import { Router } from "express";
import { UserController } from "./user.controller";
import { validateData } from "../../middleware/validate.middleware";
import { createUserSchema, idParamSchema, updateUserSchema } from "./user.schema";
import { authenticateToken } from "../auth/auth.middleware";

export const userRoutes = Router();

const controller = new UserController();

userRoutes.post("/", validateData({ body: createUserSchema }), (req, res) => controller.create(req, res));
userRoutes.get("/:id", authenticateToken, validateData({ params: idParamSchema }), (req, res) => controller.findById(req, res));
userRoutes.get("/", authenticateToken, (req, res) => controller.findAll(req, res));
userRoutes.put("/:id", authenticateToken, validateData({ params: idParamSchema, body: updateUserSchema }), (req, res) => controller.update(req, res));
userRoutes.delete("/:id", authenticateToken, validateData({ params: idParamSchema }), (req, res) => controller.delete(req, res));
