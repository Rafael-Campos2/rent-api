import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../../utils/file";
import { IUpdateUserDTO } from "../../../dtos/IUpdateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, avatar_file }: IUpdateUserDTO) {
    const user = await this.usersRepository.findById(user_id);

    if (!user || !avatar_file) return;

    if (user.avatar_url) {
      await deleteFile(`./tmp/avatar/${user.avatar_url}`);
    }

    user.avatar_url = avatar_file;

    await this.usersRepository.create(user);
  }
}
