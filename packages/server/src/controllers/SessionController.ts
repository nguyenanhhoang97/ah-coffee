import { Request, Response } from 'express';
import { Session } from '../models/Session';

export class SessionController {
  public getSessionStatus(req: Request, res: Response) {
    const { body } = req;
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).json({ message: 'forbidden' });
    }
    const token: any = authorization;
    Session.find({ token }, (err: any, session: any) => {
      if (session.length === 0) {
        return res.status(200).json({ message: 'invalid_token' });
      }
      const { status } = session[0];
      if (status === 1) {
        return res.status(200).json({ message: 'valid_session' });
      } else {
        return res.status(200).json({ message: 'expired_session' });
      }
    });
  }
}
