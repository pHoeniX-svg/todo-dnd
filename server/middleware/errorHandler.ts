import { ErrorRequestHandler } from 'express';
import { logEvents } from './logEvents';

const errorHandler: ErrorRequestHandler = (err: Error, _req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  logEvents(`${err.name}: ${err.message}`, 'errors.log');

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { errorHandler };
