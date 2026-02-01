import { Router } from "express";
import { userRoutes } from "./users/user.routes";
//import { productsRoutes } from "./modules/products/products.routes";

export const routes = Router();

routes.use("/users/create", userRoutes);
//routes.use("/products", productsRoutes);
