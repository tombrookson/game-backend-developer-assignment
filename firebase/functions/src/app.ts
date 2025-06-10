import express, { type Express } from 'express';
import morgan from 'morgan';
import router from './routes/index.js';
import { notFoundMiddleware, errorMiddleware } from './middleware';

export const app: Express = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/', router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
