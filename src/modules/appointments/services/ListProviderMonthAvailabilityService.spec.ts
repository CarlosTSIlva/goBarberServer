import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeUsersRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProvidersMonthAvailability', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeUsersRepository,
    );
  });

  it('shold be able to list the availability from provider', async () => {
    await fakeUsersRepository.create({
      provider_id: 'user',
      user_id: 'User',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeUsersRepository.create({
      provider_id: 'user',
      user_id: 'User',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    await fakeUsersRepository.create({
      provider_id: 'user',
      user_id: 'User',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeUsersRepository.create({
      provider_id: 'user',
      user_id: 'User',
      date: new Date(2020, 4, 20, 11, 0, 0),
    });

    await fakeUsersRepository.create({
      provider_id: 'user',
      user_id: 'User',
      date: new Date(2020, 4, 20, 12, 0, 0),
    });
    await fakeUsersRepository.create({
      provider_id: 'user',
      user_id: 'User',
      date: new Date(2020, 4, 20, 13, 0, 0),
    });
    await fakeUsersRepository.create({
      provider_id: 'user',
      user_id: 'User',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeUsersRepository.create({
      provider_id: 'user',
      user_id: 'User',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    await fakeUsersRepository.create({
      provider_id: 'user',
      user_id: 'User',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });

    await fakeUsersRepository.create({
      provider_id: 'user',
      user_id: 'User',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    await fakeUsersRepository.create({
      provider_id: 'user',
      user_id: 'User',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 25, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
        { day: 23, available: true },
      ]),
    );
  });
});
