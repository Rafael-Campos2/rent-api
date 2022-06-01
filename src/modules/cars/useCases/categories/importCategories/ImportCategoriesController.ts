import { Request, Response } from "express";

import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

export class ImportCategoriesController {
  constructor(private importCategoriesUseCase: ImportCategoriesUseCase) {}

  handle(req: Request, res: Response) {
    const { file } = req;

    this.importCategoriesUseCase.execute({ file });

    res.status(200).send();
  }
}
