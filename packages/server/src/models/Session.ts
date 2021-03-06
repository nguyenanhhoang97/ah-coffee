import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;

let sessionSchema = new Schema({
  id: { type: Number, required: true },
  token: { type: String, default: '', required: true, unique: true },
  status: {
    type: Number,
    enum: [0, 1],
    default: 1
  },
  created_by: { type: Number, required: true, ref: 'User' },
  created_date: { type: Date, default: Date.now, required: true },
  updated_date: { type: Date, default: Date.now, required: true }
});

autoIncrement.initialize(mongoose.connection);
sessionSchema.plugin(autoIncrement.plugin, {
  model: 'Session',
  field: 'id',
  incrementBy: 1
});

sessionSchema.index({ id: 1 }, { unique: true });

export const Session = mongoose.model('Session', sessionSchema, 'sessions');
