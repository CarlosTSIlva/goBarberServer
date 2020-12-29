import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderdayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { month, year, day } = req.query;

    const listProviderdayhAvailability = container.resolve(
      ListProviderdayAvailabilityService,
    );
    const availability = await listProviderdayhAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });
    return res.json(availability);
  }
}
