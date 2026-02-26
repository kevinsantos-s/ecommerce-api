import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateData } from "../../middleware/validate.middleware";
import { loginSchema } from "./auth.schema";
import { authenticateToken } from "./auth.middleware";

export const authRoutes = Router();

const controller = new AuthController();

authRoutes.post("/login", validateData({ body: loginSchema }), (req, res) => controller.auth(req, res));
authRoutes.post("/refresh", (req, res) => controller.refresh(req, res));
authRoutes.post("/logout", authenticateToken, (req, res) => controller.logout(req, res));

