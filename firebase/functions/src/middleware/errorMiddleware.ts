import { type Request, type Response, type NextFunction } from 'express';
import { HttpError } from '../exceptions/HttpError';

export const errorMiddleware = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
    console.error('Received error:', err);

    if (err instanceof Error) {
        const statusCode = err instanceof HttpError ? err.statusCode : 500;
        res.status(statusCode).json({ error: err.message });
    } else if (typeof err === 'string') {
        res.status(500).json({ error: err });
    } else {
        res.status(500).json({ error: 'Internal server error' });
    }
}