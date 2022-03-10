import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv-safe';
import express from 'express';
import { connectDB, corsOptions } from './config';
import { credentials, errorHandler, logger, protect } from './middleware';

dotenv.config();

const PORT = process.env.PORT || 3800;
const app = express();

connectDB();

app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/register', require('./routes/register'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/refresh', require('./routes/refresh'));
app.use('/api/logout', require('./routes/logout'));

app.use(protect);
// app.use('/api/todos', require('./routes/todos'));
app.use('/api/users', require('./routes/users'));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
  console.log(`NODE_ENV=${process.env.NODE_ENV}`.yellow.bold);
});
