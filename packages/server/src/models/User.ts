import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: { type: Number, required: true },
  fullname: { type: String, default: "", required: true },
  email: { type: String, default: "", required: true },
  address: { type: String, default: "" },
  role: {
    type: String,
    enum: [
      "admin",
      "marketing_manager",
      "marketing_coordinator",
      "student",
      "guest"
    ],
    default: "student"
  },
  facultyId: { type: Number, required: true },
  password: { type: String, default: "", required: true },
  status: {
    type: Number,
    enum: [0, 1],
    default: 0
  },
  salt: { type: String, required: true },
  createdDate: { type: Date, default: Date.now, required: true },
  updatedDate: { type: Date, default: Date.now, required: true }
});

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, {
  model: "User",
  field: "userId",
  incrementBy: 1
});
userSchema.index({ userId: 1 }, { unique: true });

export const User = mongoose.model("User", userSchema, "users");
