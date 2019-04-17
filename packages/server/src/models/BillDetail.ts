import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;

let billDetailSchema = new Schema({
  id: { type: Number, required: true },
  product_id: { type: Number, required: true, ref: 'Product' },
  unit_price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  created_date: { type: Date, default: Date.now, required: true },
  updated_date: { type: Date, default: Date.now, required: true }
});

autoIncrement.initialize(mongoose.connection);
billDetailSchema.plugin(autoIncrement.plugin, {
  model: 'BillDetail',
  field: 'id',
  incrementBy: 1
});

billDetailSchema.index({ id: 1 }, { unique: true });

export const BillDetail = mongoose.model(
  'BillDetail',
  billDetailSchema,
  'bill_details'
);
