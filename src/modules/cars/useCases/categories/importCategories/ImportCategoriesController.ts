import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

export class ImportCategoriesController {
  async handle(req: Request, res: Response) {
    try {
      const { file } = req;

      const importCategoriesUseCase = container.resolve(
        ImportCategoriesUseCase,
      );

      await importCategoriesUseCase.execute({ file });

      res.status(201).send();
    } catch (e) {
      res.status(400).json({ error: (e as Error).message });
    }
  }
}
