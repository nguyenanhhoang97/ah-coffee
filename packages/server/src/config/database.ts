import mongoose from 'mongoose';

let mongoDB: any = process.env.MONGODB_URI || '';

mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('[Database] Connect to mongodb successfully');
});
