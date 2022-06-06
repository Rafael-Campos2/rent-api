import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

export class ListSpecificationsController {
  async handle(req: Request, res: Response) {
    const listSpecificationsUseCase = container.resolve(
      ListSpecificationsUseCase,
    );

    const specifications = await listSpecificationsUseCase.execute();

    res.status(200).json(specifications);
  }
}
