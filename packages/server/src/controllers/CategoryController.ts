import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { JWT_CHARS } from '../core/constant';

export class CategoryController {
  public createCategory(req: any, res: any) {
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

  public async getCategoryList(req: Request, res: Response) {
    const { query } = req;
    const { pageIndex, pageSize } = query;
    const offset = pageIndex * pageSize;
    const limit = parseInt(pageSize, 10);
    const category = await Category.find({
      $or: [{ status: 0 }, { status: 1 }]
    })
      .skip(offset)
      .limit(limit)
      .populate({
        path: 'products'
      })
      .exec();
    Category.count({ $or: [{ status: 0 }, { status: 1 }] }, (error, count) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(200).json({ category, total: count });
    });
  }

  public getCategoryDetail(req: Request, res: Response) {
    const { body } = req;
    if (body.constructor === Object && Object.keys(body).length === 0) {
      return res.status(500).json({ message: 'req_body_check_failed' });
    } else {
      const { categoryId } = body;
      Category.findOne({ id: categoryId }).exec((err, category) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        return res.status(200).json({ category });
      });
    }
  }

  public updateCategoryById(req: any, res: any) {
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
        const { role, id } = data;
        if (role === 'customer' || role === 'salesperson') {
          return res.status(403).json({ message: 'forbidden' });
        }
        let path;
        if (req.files.length === 0) {
          path = body.oldPath;
        } else {
          path = req.files[0].path;
        }
        const { categoryId, name, introduction } = body;
        const updatedDate = Date.now();
        Category.findOneAndUpdate(
          { id: categoryId },
          {
            $set: {
              name,
              introduction,
              img_path: path,
              updated_by: id,
              updated_date: updatedDate
            }
          },
          { new: true },
          (error: any, category) => {
            if (error) {
              return res.status(500).json(error);
            }
            return res
              .status(200)
              .json({ message: 'updated_category_info' } || {});
          }
        );
      });
    }
  }

  public changeCategoryStatus(req: any, res: any) {
    const { body } = req;
    const { authorization } = req.headers;
    // return res.status(200).json(body);
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
        const { role, id } = data;
        if (role === 'customer' || role === 'salesperson') {
          return res.status(403).json({ message: 'forbidden' });
        }
        const { categoryId, cateStatus } = body;
        const updatedDate = Date.now();
        Category.findOneAndUpdate(
          { id: categoryId },
          {
            $set: {
              status: cateStatus,
              updated_by: id,
              updated_date: updatedDate
            }
          },
          { new: true },
          (error: any, category) => {
            if (error) {
              return res.status(500).json(error);
            }
            return res
              .status(200)
              .json({ message: 'updated_category_status' } || {});
          }
        );
      });
    }
  }
}
