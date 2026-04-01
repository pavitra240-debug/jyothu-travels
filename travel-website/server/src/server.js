import app from './app.js';
import { connectDB } from './config/db.js';
import { Admin } from './models/Admin.js';
import { Car } from './models/Car.js';
import { Bus } from './models/Bus.js';
import { TravelPackage } from './models/Package.js';
import bcrypt from 'bcryptjs';

const PORT = Number(process.env.PORT) || 5000;

async function ensureDefaultAdmin() {
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'AdminDefault123!', 10);
    await Admin.create({
      email: process.env.ADMIN_EMAIL || 'admin@jyothutravels.com',
      password: hashed
    });
    console.log(`✅ Default admin created: ${process.env.ADMIN_EMAIL || 'admin@jyothutravels.com'}`);
  }
}

async function ensureSeedData() {
    // ... same as before ...
}

async function start() {
  try {
    await connectDB(process.env.MONGO_URI);
    await ensureDefaultAdmin();
    // await ensureSeedData(); // Uncomment if needed for local seeding
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server', err);
    process.exit(1);
  }
}

start();