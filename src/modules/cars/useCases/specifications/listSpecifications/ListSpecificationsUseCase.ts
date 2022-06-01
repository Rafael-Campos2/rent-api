import { ISpecificationsRepository } from "../../../repositories/ISpecificationRepository";

export class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute() {
    return this.specificationsRepository.list();
  }
}
