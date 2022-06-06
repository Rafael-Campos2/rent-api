import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const { name, description } = req.body;

      const category = await this.createCategoryUseCase.execute({
        name,
        description,
      });

      return res.status(201).json(category);
    } catch (e) {
      return res.status(400).json({ error: (e as Error).message });
    }
  }
}
