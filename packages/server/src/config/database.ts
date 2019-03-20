import mongoose from 'mongoose';
import { MONGODB_URI } from '../core/constant';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('[Database] Connect to mongodb successfully');
});
