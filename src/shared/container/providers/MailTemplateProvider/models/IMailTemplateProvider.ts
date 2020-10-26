import IParseMailtemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailtemplateDTO): Promise<string>;
}
