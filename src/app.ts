import express from 'express';
import * as dotenv from 'dotenv-safe';
import authRouter from '@src/routes/auth';
import advertsRouter from '@src/routes/adverts';
import cors from 'cors';
import morgan from 'morgan';
import usersRouter from './routes/users';

dotenv.config();

// Initialize the express engine
const app: express.Application = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use('/adverts', advertsRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

// Handling '/' Request
app.get('/', (req, res): void => {
  res.json({
    message: 'Successfully accessed the endpoint',
    success: true,
    payload: {},
  });
});

export default app;
