import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;

let productSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category_id: { type: Number, required: true },
  price: { type: Number, required: true },
  introduction: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: {
    type: Number,
    enum: [0, 1],
    default: 0
  },
  createdDate: { type: Date, default: Date.now, required: true },
  updatedDate: { type: Date, default: Date.now, required: true }
});

autoIncrement.initialize(mongoose.connection);
productSchema.plugin(autoIncrement.plugin, {
  model: 'Product',
  field: 'id',
  incrementBy: 1
});

productSchema.index({ id: 1 }, { unique: true });

export const Category = mongoose.model('Product', productSchema, 'products');
