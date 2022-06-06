import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
  async handle(req: Request, res: Response) {
    try {
      const { name, description } = req.body;

      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

      const category = await createCategoryUseCase.execute({
        name,
        description,
      });

      return res.status(201).json(category);
    } catch (e) {
      return res.status(400).json({ error: (e as Error).message });
    }
  }
}
