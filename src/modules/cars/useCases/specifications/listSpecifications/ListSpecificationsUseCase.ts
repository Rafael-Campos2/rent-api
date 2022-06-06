import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "../../../repositories/ISpecificationRepository";

@injectable()
export class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  execute() {
    return this.specificationsRepository.list();
  }
}
