import express from 'express';
import authRoutes from './modules/auth/auth.route';
import globalErrorHandler from '../src/errors/globalErrorHandler';
import studentRoutes from './modules/student/student.route';
import schoolRoutes from './modules/school/school.routes';
import superAdminRoutes from './modules/super-admin/super-admin.routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth/', authRoutes);
app.use('/api/v1/students', studentRoutes);
app.use("/api/v1/schools", schoolRoutes);
app.use('/api/v1/super-admin', superAdminRoutes);

app.use(globalErrorHandler);

export default app;