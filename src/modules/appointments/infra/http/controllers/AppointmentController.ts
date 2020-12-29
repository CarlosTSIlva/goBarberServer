import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CrateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { provider_id, date } = req.body;
    const user_id = req.user.id;

    const createAppointment = container.resolve(CrateAppointmentService);
    const appointment = await createAppointment.execute({
      date,
      user_id,
      provider_id,
    });
    return res.json(appointment);
  }
}
