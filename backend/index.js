import express from 'express';
import cors from 'cors';
import UserRoute from './routes/UserRoute.js';
import AuthRoute from './routes/AuthRoute.js';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: process.env.FE_DOMAIN }));
app.use(cookieParser());
app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);

app.listen(process.env.APP_PORT, () =>
    console.log(`Server started on port ${process.env.APP_PORT}..`)
);
