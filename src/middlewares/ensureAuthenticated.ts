import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError("Invalid or missing authorization token", 401);
  }

  try {
    const [, token] = authorization.split(" ");

    const { sub: user_id } = verify(token, "71b5e0fa4b1ed3b712813bff3a829620");

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id as string);

    if (!user) {
      throw new AppError("User does not exist", 401);
    }

    return next();
  } catch {
    throw new AppError("Invalid or missing authorization token", 401);
  }
};
