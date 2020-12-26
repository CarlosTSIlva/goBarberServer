import { injectable, inject } from 'tsyringe';
import { getDate, getDaysInMonth } from 'date-fns';
import IappointmentsRepository from '../repositories/IAppointmentsRepository';
interface IReq {
  provider_id: string;
  month: number;
  year: number;
}
type Irest = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IappointmentsRepository,
  ) {}

  public async execute({ provider_id, month, year }: IReq): Promise<Irest> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));
    const eachDayArray = Array.from(
      {
        length: numberOfDaysInMonth,
      },
      (value, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const appointentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });
      return {
        day,
        available: appointentsInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
