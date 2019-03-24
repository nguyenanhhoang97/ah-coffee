import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import { ProductImg } from '../models/ProductImg';

const Schema = mongoose.Schema;

let productSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category_id: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
  price: { type: Number, required: true },
  introduction: { type: String, required: true },
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 0
  },
  created_by: { type: Number, required: true, ref: 'User' },
  updated_by: { type: Number, default: '', ref: 'User' },
  created_date: { type: Date, default: Date.now, required: true },
  updated_date: { type: Date, default: Date.now, required: true },
  product_imgs: [{ type: Schema.Types.ObjectId , ref: 'ProductImg' }]
});

autoIncrement.initialize(mongoose.connection);
productSchema.plugin(autoIncrement.plugin, {
  model: 'Product',
  field: 'id',
  incrementBy: 1
});

productSchema.index({ id: 1 }, { unique: true });

export const Product = mongoose.model('Product', productSchema, 'products');
