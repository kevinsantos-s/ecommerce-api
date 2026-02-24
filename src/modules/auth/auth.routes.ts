import { Router } from "express";
import { AuthController } from "./auth.controller";

export const authRoutes = Router();

const controller = new AuthController();

authRoutes.post("/login", validateData({ body: loginSchema }), controller.auth.bind(controller));
authRoutes.post("/refresh", controller.refresh.bind(controller));