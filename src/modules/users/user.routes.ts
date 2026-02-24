import { Router } from "express";
import { UserController } from "./user.controller";
import { validateData } from "../../middleware/validate.middleware";
import { createUserSchema, idParamSchema, updateUserSchema } from "./user.schema";
import { authenticateToken } from "../auth/auth.middleware";

export const userRoutes = Router();

const controller = new UserController();

userRoutes.post("/", validateData({ body: createUserSchema }), controller.create.bind(controller));
userRoutes.get("/:id", authenticateToken, validateData({ params: idParamSchema }), controller.findById.bind(controller));
userRoutes.get("/", authenticateToken,controller.findAll.bind(controller));
userRoutes.put("/:id", authenticateToken, validateData({ params: idParamSchema, body: updateUserSchema }), controller.update.bind(controller));
userRoutes.delete("/:id", authenticateToken, validateData({ params: idParamSchema }), controller.delete.bind(controller));
