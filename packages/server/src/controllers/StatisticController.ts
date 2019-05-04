import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { Bill } from '../models/Bill';

export class StatisticController {
  public totalCategory(req: any, res: any) {
    Category.count({ $or: [{ status: 0 }, { status: 1 }] }, (error, count) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(200).json({ total: count });
    });
  }

  public totalProduct(req: any, res: any) {
    Product.count({ $or: [{ status: 0 }, { status: 1 }] }, (error, count) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(200).json({ total: count });
    });
  }

  public totalBill(req: any, res: any) {
    Bill.count({ $or: [{ status: 0 }, { status: 1 }] }, (error, count) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(200).json({ total: count });
    });
  }

  public totalUser(req: any, res: any) {
    Bill.count({ $or: [{ status: 0 }, { status: 1 }] }, (error, count) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(200).json({ total: count });
    });
  }
}
