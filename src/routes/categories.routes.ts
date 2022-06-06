import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/categories/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "../modules/cars/useCases/categories/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "../modules/cars/useCases/categories/listCategories/ListCategoriesController";

export const categoriesRoutes = Router();

const upload = multer({ dest: "./tmp" });

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoriesController.handle,
);
