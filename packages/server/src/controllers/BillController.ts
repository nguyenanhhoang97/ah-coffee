import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Bill } from '../models/Bill';
import { BillDetail } from '../models/BillDetail';
import { JWT_CHARS } from '../core/constant';

export class BillController {
  public createBill(req: Request, res: Response) {
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
        const { role, _id } = data;
        if (role === 'customer') {
          return res.status(403).json({ message: 'forbidden' });
        }
        const {
          productList,
          customerId,
          totalPrice,
          paymentMethod,
          ccRC
        } = body;
        // tslint:disable-next-line
        let productId: any = [];
        // tslint:disable-next-line
        for (let i = 0; i < productList.length; i++) {
          // tslint:disable-next-line
          let billDetail = new BillDetail({
            product_id: productList[i]._id,
            product_name: productList[i].name,
            unit_price: productList[i].unitPrice,
            quantity: productList[i].quantity
          });
          const billItm = await billDetail.save();
          productId.push(billItm._id);
        }
        // tslint:disable-next-line
        let bill = new Bill({
          customer_id: customerId,
          salesperson_id: _id,
          total_price: totalPrice,
          payment_method: paymentMethod,
          cc_receipt_code: ccRC,
          items: productId
        });
        bill.save((error: any, result: any) => {
          if (error) {
            return res.status(500).json(error);
          }
          return res.status(200).json({ message: 'saved' } || {});
        });
      });
    }
  }

  public getBillListBySalepersons(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).json({ message: 'forbidden' });
    }
    const token: any = authorization;
    jwt.verify(token, JWT_CHARS, async (err: any, decoded: any) => {
      if (err) {
        return res.status(500).json(err);
      }
      const { query } = req;
      const { pageIndex, pageSize } = query;
      const offset = pageIndex * pageSize;
      const limit = parseInt(pageSize, 10);
      const { data } = decoded;
      const { _id } = data;
      const bill = await Bill.find({
        salesperson_id: _id
      })
        .skip(offset)
        .limit(limit)
        .populate({
          path: 'customer_id'
        })
        .populate({
          path: 'salesperson_id'
        })
        .populate({
          path: 'items'
        })
        .exec();
      const count = await Bill.count({
        salesperson_id: _id
      });
      return res.status(200).json({ bill, total: count });
    });
  }

  public getBillListByCustomer(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).json({ message: 'forbidden' });
    }
    const token: any = authorization;
    jwt.verify(token, JWT_CHARS, async (err: any, decoded: any) => {
      if (err) {
        return res.status(500).json(err);
      }
      const { query } = req;
      const { pageIndex, pageSize } = query;
      const offset = pageIndex * pageSize;
      const limit = parseInt(pageSize, 10);
      const { data } = decoded;
      const { _id } = data;
      const bill = await Bill.find({
        customer_id: _id
      })
        .skip(offset)
        .limit(limit)
        .exec();
      const count = await Bill.count({
        customer_id: _id
      });
      return res.status(200).json({ bill, total: count });
    });
  }

  public getBillList(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).json({ message: 'forbidden' });
    }
    const token: any = authorization;
    jwt.verify(token, JWT_CHARS, async (err: any, decoded: any) => {
      if (err) {
        return res.status(500).json(err);
      }
      const { query } = req;
      const { pageIndex, pageSize } = query;
      const offset = pageIndex * pageSize;
      const limit = parseInt(pageSize, 10);
      const bill = await Bill.find({})
        .skip(offset)
        .limit(limit)
        .populate({
          path: 'customer_id'
        })
        .populate({
          path: 'salesperson_id'
        })
        .populate({
          path: 'items'
        })
        .exec();
      const count = await Bill.count({});
      return res.status(200).json({ bill, total: count });
    });
  }
}
