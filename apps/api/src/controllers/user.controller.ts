import { registerService, verivyOtpService } from '@/services/user.services';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  async RegisterController(req: Request, res: Response, next: NextFunction) {
    try {
      const { newUser, token } = await registerService(req.body.email);
      return res.status(200).send({
        msg: 'User created, please check your email',
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
}
