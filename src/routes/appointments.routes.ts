import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { parseISO } from "date-fns";

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services//CreateAppointmentService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get("/", async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return res.json(appointments);
});

appointmentsRouter.post("/", async (req, res) => {
  const { provider_id, date } = req.body;
  const parsedDate = parseISO(date);

  const createAppointmentService = new CreateAppointmentService();
  const appointment = await createAppointmentService.execute({
    date: parsedDate,
    provider_id,
  });
  return res.json(appointment);
});

export default appointmentsRouter;
