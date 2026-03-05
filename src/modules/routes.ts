import { Router } from "express";
import { userRoutes } from "./users/user.routes";
import { authRoutes } from "./auth/auth.routes";
import { brandRoutes } from "./brands/brand.routes";

export const routes = Router();

routes.use("/users", userRoutes);
routes.use("/auth", authRoutes);
routes.use("/brands", brandRoutes)