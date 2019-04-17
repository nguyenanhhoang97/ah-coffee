import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Product } from '../models/Product';
import { ProductImg } from '../models/ProductImg';
import { Category } from '../models/Category';
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
      jwt.verify(token, JWT_CHARS, async (err: any, decoded: any) => {
        if (err) {
          return res.status(500).json(err);
        }
        const { data } = decoded;
        const { role, id } = data;
        if (role === 'customer' || role === 'salesperson') {
          return res.status(403).json({ message: 'forbidden' });
        }
        const { name, categoryId, price, introduction } = body;
        const { files } = req;
        // tslint:disable-next-line
        let imgId: any = [];
        // tslint:disable-next-line
        for (let i = 0; i < files.length; i++) {
          // tslint:disable-next-line
          let productImg = new ProductImg({
            path: files[i].path
          });
          const res = await productImg.save();
          imgId.push(res._id);
        }
        // tslint:disable-next-line
        let product = new Product({
          name,
          category_id: categoryId,
          price,
          introduction,
          created_by: id,
          product_imgs: imgId
        });
        product.save((error: any, result: any) => {
          if (error) {
            return res.status(500).json(error);
          }
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
      jwt.verify(token, JWT_CHARS, async (err: any, decoded: any) => {
        if (err) {
          return res.status(500).json(err);
        }
        const { data } = decoded;
        const { role, id } = data;
        if (role === 'customer' || role === 'salesperson') {
          return res.status(403).json({ message: 'forbidden' });
        }
        const { productId, name, categoryId, price, introduction } = body;
        if (req.files.length === 0) {
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
              return res
                .status(200)
                .json({ message: 'updated_product_info' } || {});
            }
          );
        } else {
          const { files } = req;
          // tslint:disable-next-line
          let imgId: any = [];
          // tslint:disable-next-line
          for (let i = 0; i < files.length; i++) {
            // tslint:disable-next-line
            let productImg = new ProductImg({
              path: files[i].path
            });
            const productImgRes = await productImg.save();
            imgId.push(productImgRes._id);
          }
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
                updated_date: updatedDate,
                product_imgs: imgId
              }
            },
            { new: true },
            (error: any, product) => {
              if (error) {
                return res.status(500).json(error);
              }
              return res
                .status(200)
                .json({ message: 'updated_product_info' } || {});
            }
          );
        }
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
          async (error: any, product: any) => {
            if (error) {
              return res.status(500).json(error);
            }
            if (productStatus === 1) {
              const category: any = await Category.findOne({
                _id: product.category_id
              }).exec();
              const { products } = category;
              let productId: any = [];
              if (products.length === 0) {
                productId.push(product._id);
                const updateCate = await Category.findOneAndUpdate(
                  { _id: product.category_id },
                  {
                    $set: {
                      products: productId
                    }
                  },
                  { new: true }
                );
              } else {
                productId = products;
                productId.push(product._id);
                const updateCate = await Category.findOneAndUpdate(
                  { _id: product.category_id },
                  {
                    $set: {
                      products: productId
                    }
                  },
                  { new: true }
                );
              }
            } else {
              const category: any = await Category.findOne({
                _id: product.category_id
              }).exec();
              const { products } = category;
              const pIdLst: any = [...products];
              const newPIdLst = pIdLst.filter(
                (element: any) => element.toString() !== product._id.toString()
              );
              const updateCate = await Category.findOneAndUpdate(
                { _id: product.category_id },
                {
                  $set: {
                    products: newPIdLst
                  }
                },
                { new: true }
              );
            }
            return res
              .status(200)
              .json({ message: 'updated_product_status' } || {});
          }
        );
      });
    }
  }

  public async getProductList(req: Request, res: Response) {
    const { query } = req;
    const { pageIndex, pageSize } = query;
    const offset = pageIndex * pageSize;
    const limit = parseInt(pageSize, 10);
    const product = await Product.find({ $or: [{ status: 0 }, { status: 1 }] })
      .skip(offset)
      .limit(limit)
      .populate({
        path: 'product_imgs'
      })
      .populate({
        path: 'category_id'
      })
      .exec();
    const count = await Product.count({ $or: [{ status: 0 }, { status: 1 }] });
    return res.status(200).json({ product, total: count });
  }

  public getProductListByCategoryId(req: Request, res: Response) {
    const { query } = req;
    const { pageIndex, pageSize, categoryId } = query;
    const offset = pageIndex * pageSize;
    const limit = parseInt(pageSize, 10);
    Product.find({
      category_id: categoryId,
      $or: [{ status: 0 }, { status: 1 }]
    })
      .skip(offset)
      .limit(limit)
      .exec((err, product) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        product.forEach((item: any) => {
          ProductImg.find({ product_id: item.id }, (e: any, result) => {
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
