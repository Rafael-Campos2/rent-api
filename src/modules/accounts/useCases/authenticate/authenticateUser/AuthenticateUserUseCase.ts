import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../../errors/AppError";
import { IAuthenticateUserDTO } from "../../../dtos/IAuthenticateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

interface IResponse {
  name: string;
  email: string;
  auth_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IAuthenticateUserDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({}, "71b5e0fa4b1ed3b712813bff3a829620", {
      subject: user.id,
      expiresIn: "1d",
    });

    const response = {
      name: user.name,
      email: user.email,
      auth_token: token,
    };

    return response;
  }
}
