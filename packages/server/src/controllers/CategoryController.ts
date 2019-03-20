import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Category } from '../models/Category';

export class CategoryController {
  public createCategory(req: any, res: any) {
    const { body } = req;
    const { authorization } = req.headers;
    const jwtChars = process.env.JWT_CHARS || '';
    if (!authorization) {
      return res.status(403).json({ message: 'forbidden' });
    }
    const token: any = authorization;
    if (body.constructor === Object && Object.keys(body).length === 0) {
      return res.status(500).json({ message: 'req_body_check_failed' });
    } else {
      jwt.verify(token, jwtChars, (err: any, decoded: any) => {
        if (err) {
          return res.status(500).json(err);
        }
        const { data } = decoded;
        const { role, id } = data;
        if (role === 'customer' || role === 'salesperson') {
          return res.status(403).json({ message: 'forbidden' });
        }
        const { path } = req.files[0];
        let category = new Category({
          name: body.name,
          introduction: body.introduction,
          img_path: path,
          created_by: id
        });
        category.save((error: any, result: any) => {
          if (err) {
            return res.status(500).json(error);
          }
          return res.status(200).json({ message: 'saved' } || {});
        });
      });
    }
  }

  public getCategoryList(req: Request, res: Response) {
    const { query } = req;
    const { pageIndex, pageSize } = query;
    const offset = pageIndex * pageSize;
    const limit = parseInt(pageSize, 10);
    Category.find({})
      .skip(offset)
      .limit(limit)
      .exec((err, category) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        Category.count({}, (error, count) => {
          if (error) {
            return res.status(500).json({ message: err.message });
          }
          return res.status(200).json({ category, total: count });
        });
      });
  }
}
