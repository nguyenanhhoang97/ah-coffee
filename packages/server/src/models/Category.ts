import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;

let categorySchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  introduction: { type: String, required: true },
  img_path: { type: String, required: true },
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 0
  },
  created_by: { type: Number, required: true },
  updated_by: { type: Number, default: '' },
  created_date: { type: Date, default: Date.now, required: true },
  updated_date: { type: Date, default: Date.now, required: true },
  products: [{ type: Number, ref: 'Product' }]
});

autoIncrement.initialize(mongoose.connection);
categorySchema.plugin(autoIncrement.plugin, {
  model: 'Category',
  field: 'id',
  incrementBy: 1
});

categorySchema.index({ id: 1 }, { unique: true });

export const Category = mongoose.model(
  'Category',
  categorySchema,
  'categories'
);
