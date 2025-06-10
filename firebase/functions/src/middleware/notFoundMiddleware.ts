import { type Request, type Response, type NextFunction } from 'express';
import { HttpError } from '../exceptions/HttpError';

export const notFoundMiddleware = (_req: Request, _res: Response, next: NextFunction) => {
    next(new HttpError('Path not found', 404));
};