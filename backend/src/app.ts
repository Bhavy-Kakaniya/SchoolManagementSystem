import express from 'express';
import authRoutes from './modules/auth/auth.route';
import globalErrorHandler from '../src/errors/globalErrorHandler';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth/', authRoutes);

app.use(globalErrorHandler);

export default app;