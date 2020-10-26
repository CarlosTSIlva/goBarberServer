import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CrateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let crateAppointment: CrateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    crateAppointment = new CrateAppointmentService(fakeAppointmentsRepository);
  });

  it('shold be able to create a new appointment', async () => {
    const appointment = await crateAppointment.execute({
      date: new Date(),
      provider_id: '123456',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('shold not able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await crateAppointment.execute({
      date: appointmentDate,
      provider_id: '123456',
    });
    await expect(
      crateAppointment.execute({
        date: appointmentDate,
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
