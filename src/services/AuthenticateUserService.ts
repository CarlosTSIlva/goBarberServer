import { getRepository } from 'typeorm';
import User from '../models/Users';
import { compare } from 'bcryptjs';

interface Req {
  email: string;
  password: string;
}

interface Res {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: Req): Promise<Res> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Incorrect email/password combination');
    }
    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }
    return {
      user,
    };
  }
}
export default AuthenticateUserService;
