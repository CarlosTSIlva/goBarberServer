import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('updateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('shold not be able update the profile from non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'texte',
        email: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'carlos Silva',
      email: 'carlosEdis@hotmail.com',
      password: '123456',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'JCarlos',
      email: 'carlosEdis@hotmail.com',
    });

    expect(updateUser.name).toBe('JCarlos');
    expect(updateUser.email).toBe('carlosEdis@hotmail.com');
  });

  it('shold not be able to change another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updateUser.password).toBe('123123');
  });

  it('shold not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'carlos Silva',
      email: 'carlosEdis@hotmail.com',
      password: '123456789',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'JCarlos',
        email: 'carlosEdiws@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'carlos Silva',
      email: 'carlosEdis@hotmail.com',
      password: '123456789',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'JCarlos',
        email: 'carlosEdis@hotmail.com',
        old_password: 'wrong-old-password',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
