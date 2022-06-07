import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password, driver_license }: ICreateUserDTO) {
    const userEmailAreadyExists = await this.usersRepository.findByEmail(email);

    if (userEmailAreadyExists) {
      throw new Error("This email is already in use");
    }

    const passwordHash = await hash(password, 8);

    return this.usersRepository.create({
      name,
      email,
      driver_license,
      password: passwordHash,
    });
  }
}
