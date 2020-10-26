import ImailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements ImailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}

export default FakeMailTemplateProvider;
