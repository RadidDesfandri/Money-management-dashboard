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
    this.router.post(
      '/verify-otp',
      checkTokenMiddleware,
      this.userController.VerifyOtpController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
