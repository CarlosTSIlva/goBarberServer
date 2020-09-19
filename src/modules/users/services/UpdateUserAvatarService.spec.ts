import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('updateUserAvatar', () => {
  it('shold be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateuserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'carlos Silva',
      email: 'CarlosEdis@hotmail.com',
      password: '123456789',
    });

    await updateuserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar_png',
    });

    expect(user.avatar).toBe('avatar_png');
  });

  it('shold not be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateuserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    await expect(
      updateuserAvatar.execute({
        user_id: 'nao existo lalala',
        avatarFilename: 'avatar_png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold Delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const updateuserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'carlos Silva',
      email: 'CarlosEdis@hotmail.com',
      password: '123456789',
    });

    await updateuserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar_png',
    });

    await updateuserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2_png',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar_png');
    expect(user.avatar).toBe('avatar2_png');
  });
});
