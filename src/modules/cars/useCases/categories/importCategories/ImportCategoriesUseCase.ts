import csvParse from "csv-parser";
import fs from "fs";

import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";

interface IRequest {
  file: Express.Multer.File | undefined;
}

export class ImportCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ file }: IRequest) {
    if (!file) throw new Error("File not found");

    const stream = fs.createReadStream(file.path);

    const parseFile = csvParse();

    stream.pipe(parseFile);

    parseFile.on("data", async line => {
      console.log(line);
      // Fazer operação no banco de maneira esclalavel
    });
  }
}
