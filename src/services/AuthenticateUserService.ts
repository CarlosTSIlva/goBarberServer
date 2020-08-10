import { getRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import authConfig from "../config/auth";

import AppError from "../errors/AppError";

import User from "../models/Users";
interface Req {
  email: string;
  password: string;
}

interface Res {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Req): Promise<Res> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new AppError("Incorrect email/password combination", 401);
    }
    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return {
      user,
      token,
    };
  }
}
export default AuthenticateUserService;
