import { UserController } from '@/controllers/user.controller';
import { checkTokenMiddleware } from '@/middleware/auth.middleware';
import { Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', this.userController.RegisterController);
    this.router.post('/login', this.userController.loginController);
    this.router.post(
      '/forgot-password',
      this.userController.ForgotPasswordController,
    );
    this.router.post(
      '/reset-password',
      checkTokenMiddleware,
      this.userController.ResetPasswordController,
    );
    this.router.post(
      '/verify-otp',
      checkTokenMiddleware,
      this.userController.VerifyOtpController,
    );
    this.router.post(
      '/resend-otp',
      checkTokenMiddleware,
      this.userController.ResendOtpController,
    );
    this.router.patch(
      '/user-form',
      checkTokenMiddleware,
      this.userController.UserFormController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
