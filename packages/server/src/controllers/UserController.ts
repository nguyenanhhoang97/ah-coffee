import { Request, Response } from 'express';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Session } from '../models/Session';
import { JWT_CHARS } from '../core/constant';

export class UserController {
  public registerUser(req: Request, res: Response) {
    const { body } = req;
    if (body.constructor === Object && Object.keys(body).length === 0) {
      return res.status(500).json({ message: 'req_body_check_failed' });
    } else {
      const { password } = body;
      const salt = bcrypt.genSaltSync(10);
      const hashedPass = bcrypt.hashSync(password, salt);
      let user = new User({
        email: body.email,
        username: body.username,
        password: hashedPass,
        salt,
        fullname: body.fullname,
        address: body.address,
        phone_number: body.phoneNumber
      });
      user.save((err: any, result: any) => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json({ message: 'saved' } || {});
      });
    }
  }

  public userLogin(req: Request, res: Response) {
    const { body } = req;
    if (body.constructor === Object && Object.keys(body).length === 0) {
      return res.status(500).json({ message: 'req_body_check_failed' });
    } else {
      const { usrnm, psw } = body;
      User.findOne({ username: usrnm }, (err: any, user: any) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        const { password } = user;
        if (bcrypt.compareSync(psw, password)) {
          const { id, username, fullname, avatar, role } = user;
          const data = {
            id,
            username,
            fullname,
            avatar,
            role
          };
          const token = jwt.sign({ data }, JWT_CHARS);
          Session.findOne({ token }, (error: any, session: any) => {
            if (error) {
              return res.status(500).json({ message: err.message });
            }
            if (!session) {
              const newSession = new Session({
                token,
                created_by: id
              });
              newSession.save();
            }
          })
          return res.status(200).json({ token });
        } else {
          return res.status(200).json({ message: 'invalid_login' });
        }
      });
    }
  }

  public updateUserInfo(req: any, res: any) {
    const { body } = req;
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).json({ message: 'forbidden' });
    }
    const token: any = authorization;
    if (body.constructor === Object && Object.keys(body).length === 0) {
      return res.status(500).json({ message: 'req_body_check_failed' });
    } else {
      jwt.verify(token, JWT_CHARS, (err: any, decoded: any) => {
        if (err) {
          return res.status(500).json(err);
        }
        const { data } = decoded;
        const { id } = data;
        const { path } = req.files[0];
        User.findOneAndUpdate(
          { id },
          {
            $set: {
              email: body.email,
              fullname: body.fullname,
              address: body.address,
              phone_number: body.phoneNumber,
              avatar: path
            }
          },
          { new: true },
          (error: any, user) => {
            if (error) {
              return res.status(500).json(error);
            }
            return res.status(200).json({ message: 'updated_user_info' } || {});
          }
        );
      });
    }
  }
}
