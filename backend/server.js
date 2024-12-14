import express from 'express';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/errorMiddleware.js';
import { connectDB } from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.BACKEND_PORT || 5000;

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(
        cors({
            origin: 'http://localhost:3000',
            credentials: true,
        })
    );
}

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import employeeRoutes from './routes/employee.routes.js';
import departmentRoutes from './routes/department.routes.js';

app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));