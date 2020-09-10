import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/Users';

interface IReq {
  name: string;
  email: string;
  password: string;
}
injectable();
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IReq): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.', 400);
    }

    const hashedPassord = await hash(password, 8);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassord,
    });

    return user;
  }
}

export default CreateUserService;
