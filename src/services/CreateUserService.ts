import { getRepository } from 'typeorm';
import User from '../models/Users';
import { hash } from 'bcryptjs';

interface Req {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Req): Promise<User> {
    const usersRepository = getRepository(User);
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });
    if (checkUserExists) {
      throw new Error('Email address already used.');
    }

    const hashedPassord = await hash(password, 8);
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassord,
    });
    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
