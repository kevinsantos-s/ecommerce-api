import { Router } from "express";
import { UserController } from "./user.controller";

export const userRoutes = Router();

const controller = new UserController();

userRoutes.post("/", (req, res) => controller.create(req, res));
userRoutes.get("/:id", (req, res) => controller.findById(req, res));
userRoutes.get("/", ( req, res ) => controller.findAll( req, res ));
userRoutes.put("/:id", ( req, res ) => controller.update( req, res ));
userRoutes.delete("/:id", ( req, res) => controller.delete( req, res));