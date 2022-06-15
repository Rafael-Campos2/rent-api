import csvParse from "csv-parser";
import fs from "fs";
import { Writable } from "stream";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../../errors/AppError";
import { deleteFile } from "../../../../../utils/file";
import { pipelineAsync } from "../../../../../utils/pipelineAsync";
import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";

interface IRequest {
  file: Express.Multer.File | undefined;
}

@injectable()
export class ImportCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ file }: IRequest) {
    if (!file) throw new AppError("File not found");

    const fileStream = fs.createReadStream(file.path);

    const parseFile = csvParse();

    const insertToDatabase = new Writable({
      objectMode: true,
      write: async (chunk, encoding, callback) => {
        try {
          const { name, description } = chunk;

          if (!name || !description) throw new AppError("Invalid file");

          const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);

          if (!categoryAlreadyExists) {
            await this.categoriesRepository.create({ name, description });
          }

          callback();
        } catch (error) {
          callback(error as Error);
        }
      },
    });

    await pipelineAsync(fileStream, parseFile, insertToDatabase);

    await deleteFile(file.path);
  }
}
