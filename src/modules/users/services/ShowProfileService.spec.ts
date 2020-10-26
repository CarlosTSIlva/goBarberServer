import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

import AppError from '@shared/errors/AppError';
let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('updateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('shold be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'carlos Silva',
      email: 'carlosEdis@hotmail.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('carlos Silva');
    expect(profile.email).toBe('carlosEdis@hotmail.com');
  });

  it('shold not be able show the profile from non-existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
