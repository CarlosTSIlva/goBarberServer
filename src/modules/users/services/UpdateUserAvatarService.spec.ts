import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

import AppError from '@shared/errors/AppError';
let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateuserAvatar: UpdateUserAvatarService;

describe('updateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateuserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('shold be able to create a new user', async () => {
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
    await expect(
      updateuserAvatar.execute({
        user_id: 'nao existo lalala',
        avatarFilename: 'avatar_png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold Delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

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
