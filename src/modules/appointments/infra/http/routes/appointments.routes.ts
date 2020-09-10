import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentControler';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();

appointmentsRouter.use(ensureAuthenticated);

/* appointmentsRouter.get('/', async (req, res) => {
  const appointments = await appointmentsRepository.find();
  return res.json(appointments);
}); */

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
