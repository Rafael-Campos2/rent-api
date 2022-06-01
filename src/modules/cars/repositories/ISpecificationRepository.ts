import { Specification } from "../model/Specification";

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  findByName(name: string): Specification | undefined;
  create({ name, description }: ICreateSpecificationDTO): void;
  list(): Specification[];
}
