import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const Schema = mongoose.Schema;

let billSchema = new Schema({
  id: { type: Number, required: true },
  customer_id: { type: Number, required: true },
  salesperson_id: { type: Number, required: true },
  total_price: { type: Number, required: true },
  createdDate: { type: Date, default: Date.now, required: true },
  updatedDate: { type: Date, default: Date.now, required: true }
});

autoIncrement.initialize(mongoose.connection);
billSchema.plugin(autoIncrement.plugin, {
  model: "Bill",
  field: "id",
  incrementBy: 1
});

billSchema.index({ id: 1 }, { unique: true });

export const Bill = mongoose.model(
  "Bill",
  billSchema,
  "bills"
);
