import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('shold be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'carlos Silva',
      email: 'CarlosEdis@hotmail.com',
      password: '123456789',
    });

    expect(user).toHaveProperty('id');
  });

  it('shold not be able to create a new user with same email from another', async () => {
    await createUserService.execute({
      name: 'carlos Silva',
      email: 'CarlosEdis@hotmail.com',
      password: '1234567892',
    });

    await expect(
      createUserService.execute({
        name: 'carlos Silva',
        email: 'CarlosEdis@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
