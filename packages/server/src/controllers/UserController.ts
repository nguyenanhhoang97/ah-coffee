import { Request, Response } from 'express';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';
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
        if (user === null) {
          return res.status(200).json({ message: 'invalid_username' });
        }
        const { password } = user;
        if (bcrypt.compareSync(psw, password)) {
          const { id, username, fullname, avatar, role, _id } = user;
          const data = {
            id,
            username,
            fullname,
            avatar,
            role,
            _id
          };
          if (role === 'customer') {
            return res.status(200).json({ message: 'invalid_role' });
          }
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
          });
          return res.status(200).json({ token, role });
        } else {
          return res.status(200).json({ message: 'invalid_password' });
        }
      });
    }
  }

  public getCurrentUser(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).json({ message: 'forbidden' });
    }
    const token: any = authorization;
    jwt.verify(token, JWT_CHARS, (err: any, decoded: any) => {
      if (err) {
        return res.status(500).json(err);
      }
      const { data } = decoded;
      const { id } = data;
      User.findOne({ id }).exec((error, user) => {
        if (error) {
          return res.status(500).json({ message: err.message });
        }
        return res.status(200).json({ user });
      });
    });
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
        let path;
        if (req.files.length === 0) {
          path = body.oldPath;
        } else {
          path = req.files[0].path;
        }
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

  public changePassword(req: Request, res: Response) {
    const { body } = req;
    const { authorization } = req.headers;
    // return res.status(200).json({ authorization });
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
        const { oldpsw, psw } = body;
        User.findOne({ id }, (error: any, user: any) => {
          if (error) {
            return res.status(500).json({ message: error.message });
          }
          const { password } = user;
          if (!bcrypt.compareSync(oldpsw, password)) {
            return res.status(200).json({ message: 'incorrect_password' });
          }
          const salt = bcrypt.genSaltSync(10);
          const hashedPass = bcrypt.hashSync(psw, salt);
          User.findOneAndUpdate(
            { id },
            {
              $set: {
                password: hashedPass,
                salt
              }
            },
            { new: true },
            (e: any, result: any) => {
              if (e) {
                return res.status(500).json(e);
              }
              Session.deleteMany({ created_by: id }, e1 => {
                if (e1) {
                  return res.status(500).json(e1);
                }
              });
              return res
                .status(200)
                .json({ message: 'updated_password' } || {});
            }
          );
        });
      });
    }
  }

  public changeRole(req: Request, res: Response) {
    const { body } = req;
    const { authorization } = req.headers;
    // return res.status(200).json({ authorization });
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
        const { role } = body;
        User.findOne({ id }, (error: any, user: any) => {
          if (error) {
            return res.status(500).json({ message: error.message });
          }
          User.findOneAndUpdate(
            { id },
            {
              $set: {
                role
              }
            },
            { new: true },
            (e: any, result: any) => {
              if (e) {
                return res.status(500).json(e);
              }
              Session.deleteMany({ created_by: id }, e1 => {
                if (e1) {
                  return res.status(500).json(e1);
                }
              });
              return res
                .status(200)
                .json({ message: 'updated_role' } || {});
            }
          );
        });
      });
    }
  }

  public admUpdateUserInfo(req: any, res: any) {
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
        const { id, role } = data;
        if (role !== 'admin') {
          return res.status(403).json({ message: 'forbidden' });
        }
        const {
          usrId,
          email,
          username,
          fullname,
          address,
          phoneNumber,
          usrRole
        } = body;
        User.findOneAndUpdate(
          { id: usrId },
          {
            $set: {
              email,
              fullname,
              username,
              address,
              phone_number: phoneNumber,
              role: usrRole,
            }
          },
          { new: true },
          (error: any, user) => {
            if (error) {
              return res.status(500).json(error);
            }
            return res
              .status(200)
              .json({ message: 'adm_updated_user_info' } || {});
          }
        );
      });
    }
  }

  public admResetUserPsw(req: Request, res: Response) {
    const { body } = req;
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).json({ message: 'forbidden' });
    }
    const token: any = authorization;
    jwt.verify(token, JWT_CHARS, (err: any, decoded: any) => {
      if (err) {
        return res.status(500).json(err);
      }
      const { data } = decoded;
      const { id, role } = data;
      if (role !== 'admin') {
        return res.status(403).json({ message: 'forbidden' });
      }
      const psw = randomstring.generate({
        length: 12,
        charset: 'alphabetic'
      });
      const salt = bcrypt.genSaltSync(10);
      const hashedPass = bcrypt.hashSync(psw, salt);
      const { usrId } = body;
      User.findOneAndUpdate(
        { id: usrId },
        {
          $set: {
            password: hashedPass,
            salt
          }
        },
        { new: true },
        (e: any, result: any) => {
          if (e) {
            return res.status(500).json(e);
          }
          Session.deleteMany({ created_by: usrId }, e1 => {
            if (e1) {
              return res.status(500).json(e1);
            }
          });
          return res.status(200).json({ new_password: psw } || {});
        }
      );
    });
  }

  public admGetUserList(req: Request, res: Response) {
    const { query } = req;
    const { pageIndex, pageSize } = query;
    const offset = pageIndex * pageSize;
    const limit = parseInt(pageSize, 10);
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).json({ message: 'forbidden' });
    }
    const token: any = authorization;
    jwt.verify(token, JWT_CHARS, (err: any, decoded: any) => {
      if (err) {
        return res.status(500).json(err);
      }
      const { data } = decoded;
      const { id, role } = data;
      if (role !== 'admin') {
        return res.status(403).json({ message: 'forbidden' });
      }
      User.find({})
        .skip(offset)
        .limit(limit)
        .exec((error, user) => {
          if (error) {
            return res.status(500).json({ message: error.message });
          }
          User.count({}, (e, count) => {
            if (e) {
              return res.status(500).json({ message: e.message });
            }
            return res.status(200).json({ user, total: count });
          });
        });
    });
  }

  public getCustomerList(req: Request, res: Response) {
    const { query } = req;
    const { pageIndex, pageSize } = query;
    const offset = pageIndex * pageSize;
    const limit = parseInt(pageSize, 10);
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).json({ message: 'forbidden' });
    }
    const token: any = authorization;
    jwt.verify(token, JWT_CHARS, (err: any, decoded: any) => {
      if (err) {
        return res.status(500).json(err);
      }
      const { data } = decoded;
      const { id, role } = data;
      if (role === 'customer') {
        return res.status(403).json({ message: 'forbidden' });
      }
      User.find({ role: 'customer' })
        .skip(offset)
        .limit(limit)
        .exec((error, user) => {
          if (error) {
            return res.status(500).json({ message: error.message });
          }
          User.count({ role: 'customer' }, (e, count) => {
            if (e) {
              return res.status(500).json({ message: e.message });
            }
            return res.status(200).json({ user, total: count });
          });
        });
    });
  }

  public getSalespersonList(req: Request, res: Response) {
    const { query } = req;
    const { pageIndex, pageSize } = query;
    const offset = pageIndex * pageSize;
    const limit = parseInt(pageSize, 10);
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).json({ message: 'forbidden' });
    }
    const token: any = authorization;
    jwt.verify(token, JWT_CHARS, (err: any, decoded: any) => {
      if (err) {
        return res.status(500).json(err);
      }
      const { data } = decoded;
      const { id, role } = data;
      if (role === 'customer' || role === 'salesperson') {
        return res.status(403).json({ message: 'forbidden' });
      }
      User.find({ role: 'salesperson' })
        .skip(offset)
        .limit(limit)
        .exec((error, user) => {
          if (error) {
            return res.status(500).json({ message: error.message });
          }
          User.count({ role: 'salesperson' }, (e, count) => {
            if (e) {
              return res.status(500).json({ message: e.message });
            }
            return res.status(200).json({ user, total: count });
          });
        });
    });
  }
}
