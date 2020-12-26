import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

import AppError from '@shared/errors/AppError';
let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('shold be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'carlos Silva',
      email: 'carlosEdis@hotmail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'carlos tre',
      email: 'carlostre@hotmail.com',
      password: '123456',
    });

    const logged = await fakeUsersRepository.create({
      name: 'carlos qua',
      email: 'carlosqua@hotmail.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: logged.id,
    });

    await expect(providers).toEqual([user1, user2]);
  });
});
