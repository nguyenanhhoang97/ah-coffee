import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Product } from '../models/Product';
import { ProductImg } from '../models/ProductImg';
import { JWT_CHARS } from '../core/constant';

export class ProductController {
  public createProduct(req: any, res: any) {
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
        const { name, categoryId, price, introduction } = body;
        let product = new Product({
          name,
          category_id: categoryId,
          price,
          introduction,
          created_by: id
        });
        const { files } = req;
        product.save((error: any, result: any) => {
          if (error) {
            return res.status(500).json(error);
          }
          const productId = result.id;
          const productName = result.name;
          files.forEach((item: any) => {
            let productImg = new ProductImg({
              product_id: productId,
              path: item.path,
              alt_tag: productName
            });
            productImg.save((e: any, img: any) => {
              if (e) {
                return res.status(500).json(e);
              }
            });
          });
          return res.status(200).json({ message: 'saved' } || {});
        });
      });
    }
  }

  public updateProductById(req: any, res: any) {
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
        const { productId, name, categoryId, price, introduction } = body;
        const updatedDate = Date.now();
        Product.findOneAndUpdate(
          { id: productId },
          {
            $set: {
              name,
              category_id: categoryId,
              price,
              introduction,
              updated_by: id,
              updated_date: updatedDate
            }
          },
          { new: true },
          (error: any, product) => {
            if (error) {
              return res.status(500).json(error);
            }
            ProductImg.deleteMany({ product_id: productId }, e => {
              if (e) {
                return res.status(500).json(e);
              }
              const { files } = req;
              files.forEach((item: any) => {
                let productImg = new ProductImg({
                  product_id: productId,
                  path: item.path,
                  alt_tag: name
                });
                productImg.save((err1: any, img: any) => {
                  if (err1) {
                    return res.status(500).json(err1);
                  }
                });
              });
            });
            return res
              .status(200)
              .json({ message: 'updated_product_info' } || {});
          }
        );
      });
    }
  }

  public changeProductStatus(req: Request, res: Response) {
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
        const { productId, productStatus } = body;
        const updatedDate = Date.now();
        Product.findOneAndUpdate(
          { id: productId },
          {
            $set: {
              status: productStatus,
              updated_by: id,
              updated_date: updatedDate
            }
          },
          { new: true },
          (error: any, product) => {
            if (error) {
              return res.status(500).json(error);
            }
            return res
              .status(200)
              .json({ message: 'updated_product_status' } || {});
          }
        );
      });
    }
  }

  public getProductList(req: Request, res: Response) {
    const { query } = req;
    const { pageIndex, pageSize } = query;
    const offset = pageIndex * pageSize;
    const limit = parseInt(pageSize, 10);
    Product.find({ $or: [{ status: 0 }, { status: 1 }] })
      .skip(offset)
      .limit(limit)
      .exec((err, product) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        product.forEach((item: any) => {
          ProductImg.find({ product_id: item.id}, (e: any, result) => {
            if (e) {
              return res.status(500).json({ message: e.message });
            }
            item._doc = { ...item._doc, product_imgs: result };
          });
        });
        Product.count({}, (error, count) => {
          if (error) {
            return res.status(500).json({ message: error.message });
          }
          return res.status(200).json({ product, total: count });
        });
      });
  }

  public getProductListByCategoryId(req: Request, res: Response) {
    const { query } = req;
    const { pageIndex, pageSize, categoryId } = query;
    const offset = pageIndex * pageSize;
    const limit = parseInt(pageSize, 10);
    Product.find({ category_id: categoryId, $or: [{ status: 0 }, { status: 1 }] })
      .skip(offset)
      .limit(limit)
      .exec((err, product) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        product.forEach((item: any) => {
          ProductImg.find({ product_id: item.id}, (e: any, result) => {
            if (e) {
              return res.status(500).json({ message: e.message });
            }
            item._doc = { ...item._doc, product_imgs: result };
          });
        });
        Product.count({}, (error, count) => {
          if (error) {
            return res.status(500).json({ message: error.message });
          }
          return res.status(200).json({ product, total: count });
        });
      });
  }
}
