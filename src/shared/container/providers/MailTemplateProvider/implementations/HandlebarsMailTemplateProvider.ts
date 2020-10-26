import handlebars from 'handlebars';
import fs from 'fs';

import IparseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import ImailTemplateProvider from '../models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements ImailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IparseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
