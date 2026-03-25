import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { hash } from '@node-rs/bcrypt';

import { connectDB } from './config/db.js';
import { Admin } from './models/Admin.js';
import { Car } from './models/Car.js';
import { Bus } from './models/Bus.js';
import { TravelPackage } from './models/Package.js';
import adminRoutes from './routes/admin.js';
import publicRoutes from './routes/public.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  })
);
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '..', 'public');
fs.mkdirSync(path.join(publicPath, 'uploads'), { recursive: true });
app.use(express.static(publicPath));

app.use('/api/admin', adminRoutes);
app.use('/api', publicRoutes);

const PORT = Number(process.env.PORT) || 5000;

async function ensureDefaultAdmin() {
  // Only create default admin if no admins exist
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    const hashed = await hash(process.env.ADMIN_PASSWORD || 'AdminDefault123!', 10);
    await Admin.create({
      email: process.env.ADMIN_EMAIL || 'admin@jyothutravels.com',
      password: hashed
    });
    console.log(`✅ Default admin created: ${process.env.ADMIN_EMAIL || 'admin@jyothutravels.com'}`);
  }
}

async function ensureSeedData() {
  const [carCount, busCount, pkgCount] = await Promise.all([
    Car.countDocuments(),
    Bus.countDocuments(),
    TravelPackage.countDocuments()
  ]);

  if (carCount === 0) {
    await Car.insertMany([
      {
        name: 'Swift Dzire',
        description: 'Comfortable sedan for city and outstation trips.',
        price: 2500,
        pricePerDay: 2500,
        pricePerKm: 12,
        imageUrl: '',
        features: ['AC', '4+1 Seating', 'Music System']
      },
      {
        name: 'Innova Crysta',
        description: 'Spacious premium SUV for family and group travel.',
        price: 4500,
        pricePerDay: 4500,
        pricePerKm: 18,
        imageUrl: '',
        features: ['AC', '6+1 Seating', 'Premium Interior']
      }
    ]);
    console.log('✅ Seeded sample cars');
  }

  if (busCount === 0) {
    await Bus.insertMany([
      {
        name: 'Mini Bus (18 Seater)',
        description: 'Best for local tours, functions, and small groups.',
        price: 8000,
        pricePerDay: 8000,
        pricePerKm: 25,
        imageUrl: '',
        features: ['AC/Non-AC', '18+1 Seating', 'Pushback Seats']
      },
      {
        name: 'AC Bus (40 Seater)',
        description: 'Comfortable AC bus for long trips and big groups.',
        price: 15000,
        pricePerDay: 15000,
        pricePerKm: 45,
        imageUrl: '',
        features: ['Fully AC', '40 Seating', 'TV/Entertainment']
      }
    ]);
    console.log('✅ Seeded sample buses');
  }

  if (pkgCount === 0) {
    await TravelPackage.insertMany([
      {
        name: 'Tirupati 1 Day Trip',
        description: 'Temple darshan + local sightseeing (1 day).',
        price: 1999,
        pricePerKm: 0,
        imageUrl: '',
        features: ['Darshan Entry', 'Breakfast/Lunch', 'Guide Support']
      },
      {
        name: 'Araku Valley 2 Days',
        description: 'Hill station trip with scenic viewpoints (2 days).',
        price: 5999,
        pricePerKm: 0,
        imageUrl: '',
        features: ['Hotel Stay', 'Caves Entry', 'Campfire']
      }
    ]);
    console.log('✅ Seeded sample packages');
  }
}

async function start() {
  try {
    // Passes your connection string from .env straight to db.js
    await connectDB(process.env.MONGO_URI);
    await ensureDefaultAdmin();
    await ensureSeedData();
    
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

    server.on('error', (err) => {
      if (err?.code === 'EADDRINUSE') {
        console.error(
          `❌ Port ${PORT} is already in use. Close the old backend terminal (Ctrl+C) and run again.`
        );
        process.exit(1);
      }
      console.error('❌ Server listen error:', err);
      process.exit(1);
    });
  } catch (err) {
    console.error('❌ Failed to start server', err);
    process.exit(1);
  }
}

start();