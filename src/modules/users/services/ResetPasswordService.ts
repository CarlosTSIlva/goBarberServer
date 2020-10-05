import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import IUsersRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHasheProvider';

interface IReq {
  token: string;
  password: string;
}
injectable();
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('userTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HasheProvider')
    private hasheProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IReq): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('User token does not exist', 401);
    }
    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User user does not exist', 401);
    }

    const tokenCreatedAt = userToken.create_at;
    const comparedDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), comparedDate)) {
      throw new AppError('token expired', 401);
    }

    user.password = await this.hasheProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
