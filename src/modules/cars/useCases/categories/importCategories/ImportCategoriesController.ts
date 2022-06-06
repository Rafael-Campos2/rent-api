import { Request, Response } from "express";

import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

export class ImportCategoriesController {
  constructor(private importCategoriesUseCase: ImportCategoriesUseCase) {}

  handle(req: Request, res: Response) {
    try {
      const { file } = req;

      this.importCategoriesUseCase.execute({ file });

      res.status(200).send();
    } catch (e) {
      res.status(400).json({ error: (e as Error).message });
    }
  }
}
