import { Router } from "express";
import { UserController } from "./user.controller";

export const userRoutes = Router();

const controller = new UserController();

userRoutes.post("/create", (req, res) => controller.create(req, res));
