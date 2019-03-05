import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const Schema = mongoose.Schema;

let billDetailSchema = new Schema({
  id: { type: Number, required: true },
  customer_id: { type: Number, required: true },
  salesperson_id: { type: Number, required: true },
  quantity: { type: Number, required: true },
  createdDate: { type: Date, default: Date.now, required: true },
  updatedDate: { type: Date, default: Date.now, required: true }
});

autoIncrement.initialize(mongoose.connection);
billDetailSchema.plugin(autoIncrement.plugin, {
  model: "BillDetail",
  field: "id",
  incrementBy: 1
});

billDetailSchema.index({ id: 1 }, { unique: true });

export const BillDetail = mongoose.model(
  "BillDetail",
  billDetailSchema,
  "bill_details"
);
