import { Router } from "express";
import { UserController } from "./user.controller";
import { validateData } from "../../middleware/validate.middleware";
import { createUserSchema, idParamSchema, updateUserSchema } from "./user.schema";

export const userRoutes = Router();

const controller = new UserController();

userRoutes.post("/", validateData({ body: createUserSchema }), controller.create.bind(controller));
userRoutes.get("/:id", validateData({ params: idParamSchema }), controller.findById.bind(controller));
userRoutes.get("/", controller.findAll.bind(controller));
userRoutes.put("/:id", validateData({ params: idParamSchema, body: updateUserSchema }), controller.update.bind(controller));
userRoutes.delete("/:id", validateData({ params: idParamSchema }), controller.delete.bind(controller));