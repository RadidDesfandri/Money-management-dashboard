import {
  registerService,
  resendOtpService,
  userFormService,
  verivyOtpService,
} from '@/services/user.services';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  async RegisterController(req: Request, res: Response, next: NextFunction) {
    try {
      const { newUser, token } = await registerService(req.body.email);

      return res.status(200).send({
        msg: 'User created, please check your email for verification',
        newUser,
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  async VerifyOtpController(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.email) throw new Error('Something went wrong!');

      const { email, otp } = req.user;

      const verify = await verivyOtpService(req.body.otp, email, otp);
      return res.status(200).send({
        msg: 'Verification succesful',
        verify,
      });
    } catch (error) {
      next(error);
    }
  }

  async ResendOtpController(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.email) throw new Error('Something went wrong!');

      const { newOtp, token } = await resendOtpService(req.user?.email);

      return res.status(200).send({
        msg: 'Code otp has been send',
        newOtp,
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  async UserFormController(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.email) throw new Error('Something went wrong!');

      const { firstname, lastname, password } = req.body;

      const userForm = await userFormService(
        req.user?.email,
        firstname,
        lastname,
        password,
      );

      return res.status(200).send({
        msg: 'User data is complete, please log in to continue',
        userForm,
      });
    } catch (error) {
      next(error);
    }
  }
}
