import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/specifications/createSpecification";
import { listSpecificationsController } from "../modules/cars/useCases/specifications/listSpecifications";

export const specificationsRoutes = Router();

specificationsRoutes.post("/", (req, res) =>
  createSpecificationController.handle(req, res),
);

specificationsRoutes.get("/", (req, res) =>
  listSpecificationsController.handle(req, res),
);
