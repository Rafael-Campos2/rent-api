import { Router } from "express";
import multer from "multer";

import { upload } from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCategoryController } from "../modules/cars/useCases/categories/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "../modules/cars/useCases/categories/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "../modules/cars/useCases/categories/listCategories/ListCategoriesController";

export const categoriesRoutes = Router();

const uploadCategories = multer(upload("./tmp"));

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  createCategoryController.handle,
);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  uploadCategories.single("file"),
  importCategoriesController.handle,
);
