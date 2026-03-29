import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

import { connectDB } from './config/db.js';
import { Admin } from './models/Admin.js';
import { Car } from './models/Car.js';
import { Bus } from './models/Bus.js';
import { TravelPackage } from './models/Package.js';
import adminRoutes from './routes/admin.js';
import publicRoutes from './routes/public.js';

dotenv.config();

const app = express();

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(mongoSanitize());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  })
);
app.use(express.json());

let __dirname;
if (typeof __filename === 'undefined') {
  const _filename = fileURLToPath(import.meta.url);
  __dirname = path.dirname(_filename);
} else {
  __dirname = path.dirname(__filename);
}

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api', publicRoutes);

// Error Handling Middleware (Generic for production)
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'An unexpected error occurred. Please try again later.'
    : err.message;
  res.status(status).json({ message });
});

export default app;
