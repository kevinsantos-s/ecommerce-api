import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  private service = new UserService();

  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const user = await this.service.create({
        name,
        email,
        password,
      });

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
