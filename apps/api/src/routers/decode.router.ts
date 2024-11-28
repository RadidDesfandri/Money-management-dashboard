import { DecodeToken } from '@/controllers/decode.controller';
import { checkTokenMiddleware } from '@/middleware/auth.middleware';
import { Router } from 'express';

export class DecodeRouter {
  private router: Router;
  private decodeController: DecodeToken;

  constructor() {
    this.router = Router();
    this.decodeController = new DecodeToken();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/decode',
      checkTokenMiddleware,
      this.decodeController.DecodeToken,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
