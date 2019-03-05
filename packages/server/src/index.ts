import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import './config/database';
// import { Routes } from "./routes";


const port = process.env.PORT || 3000;
const app = express();
// const routes = new Routes();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes.routes(app);

app.listen(port, () => {
  console.log(`[Server] Server is running on port ${port}`);
});
