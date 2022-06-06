import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/specifications/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../modules/cars/useCases/specifications/listSpecifications/ListSpecificationsController";

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

export const specificationsRoutes = Router();

specificationsRoutes.post("/", createSpecificationController.handle);

specificationsRoutes.get("/", listSpecificationsController.handle);
