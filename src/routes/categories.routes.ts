import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/categories/createCategory";
import { importCategoriesController } from "../modules/cars/useCases/categories/importCategories";
import { listCategoriesController } from "../modules/cars/useCases/categories/listCategories";

export const categoriesRoutes = Router();

const upload = multer({ dest: "./tmp" });

categoriesRoutes.post("/", (req, res) =>
  createCategoryController.handle(req, res),
);

categoriesRoutes.get("/", (req, res) =>
  listCategoriesController.handle(req, res),
);

categoriesRoutes.post("/import", upload.single("file"), (req, res) =>
  importCategoriesController.handle(req, res),
);
