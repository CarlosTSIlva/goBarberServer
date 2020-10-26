import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUserRepository';
import User from '../infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';

interface IReq {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IReq): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 400);
    }

    return user;
  }
}

export default ShowProfileService;
