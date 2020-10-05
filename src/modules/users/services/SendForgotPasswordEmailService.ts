import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

import User from '../infra/typeorm/entities/Users';

interface IReq {
  email: string;
}
injectable();
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('userTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IReq): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('users does not exist.', 401);
    }
    await this.userTokensRepository.generate(user.id);

    this.mailProvider.sendMail(email, 'Recupere sua senha');
  }
}

export default SendForgotPasswordEmailService;
