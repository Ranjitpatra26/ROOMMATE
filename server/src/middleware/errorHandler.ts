import { Request, Response, NextFunction } from 'express';
import { ENV } from '../config/env.js';

export interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (ENV.NODE_ENV === 'development') {
    console.error(`[Error] ${req.method} ${req.path} -> ${statusCode}: ${message}`);
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(ENV.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
