import { request, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CrateAppointmentService from '@modules/appointments/services/CrateAppointmentService';

export default class AppointmentController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { provider_id, date } = req.body;
    const user_id = req.user.id;
    const pasedDate = parseISO(date);

    const createAppointment = container.resolve(CrateAppointmentService);
    const appointment = await createAppointment.execute({
      date: pasedDate,
      user_id,
      provider_id,
    });
    return res.json(appointment);
  }
}
