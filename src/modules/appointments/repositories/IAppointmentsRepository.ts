import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppontmentDTO from '../dtos/ICreateAppointmentDTO';

interface IAppointmentsRepository {
  create(data: ICreateAppontmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}

export default IAppointmentsRepository;
