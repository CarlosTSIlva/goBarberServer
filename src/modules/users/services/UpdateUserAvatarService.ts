import path from 'path';
import fs from 'fs';
import IUsersRepository from '../repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import UploadConfig from '@config/upload';
import User from '../infra/typeorm/entities/Users';

interface IReq {
  user_id: string;
  avatarFilename: string;
}
injectable();
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFilename }: IReq): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 400);
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(UploadConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await this.usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
