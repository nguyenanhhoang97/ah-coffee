import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;

let billSchema = new Schema({
  id: { type: Number, required: true },
  customer_id: { type: Schema.Types.ObjectId, ref: 'User' },
  salesperson_id: { type: Schema.Types.ObjectId, ref: 'User' },
  total_price: { type: Number, required: true },
  payment_method: {
    type: Number,
    enum: [0, 1],
    default: 0
  },
  cc_receipt_code: { type: String, default: ''},
  created_date: { type: Date, default: Date.now, required: true },
  updated_date: { type: Date, default: Date.now, required: true },
  items: [{ type: Schema.Types.ObjectId , ref: 'BillDetail' }]
});

autoIncrement.initialize(mongoose.connection);
billSchema.plugin(autoIncrement.plugin, {
  model: 'Bill',
  field: 'id',
  incrementBy: 1
});

billSchema.index({ id: 1 }, { unique: true });

export const Bill = mongoose.model('Bill', billSchema, 'bills');
