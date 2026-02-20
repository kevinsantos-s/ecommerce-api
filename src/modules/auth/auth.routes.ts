import { Router } from "express";
import { AuthController } from "./auth.controller";

export const authRoutes = Router();

const controller = new AuthController();

authRoutes.post("/login", (req, res) => controller.auth(req, res));
