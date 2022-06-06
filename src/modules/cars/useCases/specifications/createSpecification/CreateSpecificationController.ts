import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export class CreateSpecificationController {
  async handle(req: Request, res: Response) {
    try {
      const { name, description } = req.body;

      const createSpecificationUseCase = container.resolve(
        CreateSpecificationUseCase,
      );

      const specification = await createSpecificationUseCase.execute({
        name,
        description,
      });

      return res.status(201).json(specification);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}
