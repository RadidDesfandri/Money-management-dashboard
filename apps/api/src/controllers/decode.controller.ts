import { Request, Response } from 'express';

export class DecodeToken {
  async DecodeToken(req: Request, res: Response) {
    try {
      const user = req.user;
      if (!user) {
        return res
          .status(401)
          .send({ status: 'UNAUTHORIZED', msg: 'Invalid token' });
      }
      return res.status(200).send({ user });
    } catch (error) {
      return res
        .status(400)
        .send({ status: 'ERROR DECODE', msg: 'Token expired or invalid' });
    }
  }
}
