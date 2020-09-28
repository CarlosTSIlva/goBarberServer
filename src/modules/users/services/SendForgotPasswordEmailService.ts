import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUserRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

import { injectable, inject } from 'tsyringe';

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
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (!checkUserExists) {
      throw new AppError('users does not exist.', 401);
    }

    this.mailProvider.sendMail(email, 'Recupere sua senha');
  }
}

export default SendForgotPasswordEmailService;
