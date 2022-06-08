import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/useCases/authenticate/authenticateUser/AuthenticateUserController";

export const authenticateRoutes = Router();

const authenticateUserUseCase = new AuthenticateUserController();

authenticateRoutes.post("/sessions", authenticateUserUseCase.handle);
