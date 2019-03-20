import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Routes } from './routes';
import './config/database';
import { APP_PORT } from './core/constant';

const app = express();
const routes = new Routes();

app.use(cors());
app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes.routes(app);

app.listen(APP_PORT, () => {
  console.log(`[Server] Server is running on port ${APP_PORT}`);
});
