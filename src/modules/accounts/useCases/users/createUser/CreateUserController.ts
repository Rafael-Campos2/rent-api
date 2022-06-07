import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { name, email, password, driver_license } = req.body;

      const createUserUseCase = container.resolve(CreateUserUseCase);

      const user = await createUserUseCase.execute({
        name,
        email,
        password,
        driver_license,
      });

      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
