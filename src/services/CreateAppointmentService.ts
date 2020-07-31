import { startOfHour } from "date-fns";
import Appointment from "../models/Appointment";
import AppointmentRepository from "../repositories/AppointmentsRepository";

interface Req {
  provider: string;
  date: Date;
}
// dependency Inversio (SOLID)
class CrateAppointmentService {
  private appointmentsRepository: AppointmentRepository;
  constructor(appointmentsRepository: AppointmentRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Req): Appointment {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw Error("This appointment is already booked");
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });
    return appointment;
  }
}

export default CrateAppointmentService;
