import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    id,
    name,
    email,
    password,
    driver_license,
    avatar_url,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      avatar_url,
      id,
    });

    return this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }

  async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne(id);
  }
}
