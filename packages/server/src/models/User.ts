import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;

let userSchema = new Schema({
  id: { type: Number, required: true },
  email: { type: String, default: '', required: true },
  username: { type: String, default: '', required: true },
  password: { type: String, default: '', required: true },
  salt: { type: String, required: true },
  fullname: { type: String, default: '' },
  address: { type: String, default: '' },
  phone_number: { type: String, default: '' },
  avatar: { type: String, default: '' },
  point: { type: Number, default: 0 },
  role: {
    type: String,
    enum: ['admin', 'manager', 'salesperson', 'customer'],
    default: 'customer'
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 0
  },
  created_date: { type: Date, default: Date.now, required: true },
  updated_date: { type: Date, default: Date.now, required: true }
});

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'id',
  incrementBy: 1
});

userSchema.index({ id: 1 }, { unique: true });

export const User = mongoose.model('User', userSchema, 'users');
