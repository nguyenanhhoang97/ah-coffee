import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const Schema = mongoose.Schema;

let productImgSchema = new Schema({
  id: { type: Number, required: true },
  product_id: { type: Number, required: true },
  path: { type: String, required: true },
  alt_tag: { type: String, required: true },
  createdDate: { type: Date, default: Date.now, required: true },
  updatedDate: { type: Date, default: Date.now, required: true }
});

autoIncrement.initialize(mongoose.connection);
productImgSchema.plugin(autoIncrement.plugin, {
  model: "ProductImg",
  field: "id",
  incrementBy: 1
});

productImgSchema.index({ id: 1 }, { unique: true });

export const ProductImg = mongoose.model(
  "ProductImg",
  productImgSchema,
  "product_imgs"
);
