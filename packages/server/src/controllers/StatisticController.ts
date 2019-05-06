import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { Bill } from '../models/Bill';

export class StatisticController {
  public async total(req: any, res: any) {
    const totalCategory = await Category.count({
      $or: [{ status: 0 }, { status: 1 }]
    }).exec();
    const totalProduct = await Product.count({
      $or: [{ status: 0 }, { status: 1 }]
    }).exec();
    const totalBill = await Bill.count({
      $or: [{ status: 0 }, { status: 1 }]
    }).exec();
    const totalUser = await User.count({
      $or: [{ status: 0 }, { status: 1 }]
    }).exec();
    return res
      .status(200)
      .json({ totalCategory, totalProduct, totalBill, totalUser });
  }
}
