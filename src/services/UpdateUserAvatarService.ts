import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";
import AppError from "../errors/AppError";

import UploadConfig from "../config/upload";
import User from "../models/Users";

interface Req {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Req): Promise<User> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError("Only authenticated users can change avatar.", 401);
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(UploadConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
