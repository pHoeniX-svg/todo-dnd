import cors from 'cors';
import { allowedOrigins } from './allowedOrigins';

// Cross Orign Resource Sharing
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin!) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
} as cors.CorsOptions;

export { corsOptions };
