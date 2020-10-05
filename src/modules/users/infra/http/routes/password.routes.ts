import { Router } from 'express';
import ForgotpasswordController from '../controllers/ForgotpasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();

const forgotpasswordController = new ForgotpasswordController();
const resetPasswordController = new ResetPasswordController()

passwordRouter.post('/forgot', forgotpasswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
