import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateData } from "../../middleware/validate.middleware";
import { loginSchema } from "./auth.schema";

export const authRoutes = Router();

const controller = new AuthController();

authRoutes.post("/login", validateData({ body: loginSchema }), controller.auth.bind(controller));