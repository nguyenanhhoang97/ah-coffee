import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;

let billSchema = new Schema({
  id: { type: Number, required: true },
  customer_id: { type: Number, required: true, ref: 'User' },
  salesperson_id: { type: Number, default: '', ref: 'User' },
  total_price: { type: Number, required: true },
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 0
  },
  created_date: { type: Date, default: Date.now, required: true },
  updated_date: { type: Date, default: Date.now, required: true },
});

autoIncrement.initialize(mongoose.connection);
billSchema.plugin(autoIncrement.plugin, {
  model: 'Bill',
  field: 'id',
  incrementBy: 1
});

billSchema.index({ id: 1 }, { unique: true });

export const Bill = mongoose.model('Bill', billSchema, 'bills');
