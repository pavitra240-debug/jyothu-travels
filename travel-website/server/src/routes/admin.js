import express from 'express';
import fs from 'fs';
import { verify } from '@node-rs/bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { Admin } from '../models/Admin.js';
import { Car } from '../models/Car.js';
import { Bus } from '../models/Bus.js';
import { TravelPackage } from '../models/Package.js';
import { Booking } from '../models/Booking.js';
import { authMiddleware } from '../middleware/auth.js';
import { authenticateAdmin } from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Same base as server.js static: server/public (server/src -> .. -> server, then public)
const uploadDir = path.join(__dirname, '..', '..', 'public', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `${unique}${ext}`);
  }
});

const upload = multer({ storage });

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: { message: 'Too many login attempts, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Admin login route
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check against .env credentials instead of database
    const envEmail = process.env.ADMIN_EMAIL;
    const envPassword = process.env.ADMIN_PASSWORD;

    if (!envEmail || !envPassword) {
      console.error('Admin credentials not found in environment');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    if (email !== envEmail || password !== envPassword) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: envEmail, role: 'admin' }, 
      process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    return res.status(200).json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
});

router.use(authMiddleware);

router.post('/upload-image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // Validate file type
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedMimes.includes(req.file.mimetype)) {
      return res.status(400).json({ message: 'Invalid file type. Only images allowed.' });
    }
    const relativePath = `/uploads/${req.file.filename}`;
    res.status(201).json({ url: relativePath });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Upload failed' });
  }
});

router.post('/add-car', async (req, res) => {
  try {
    const { name, description, price, imageUrl, pricePerKm, features } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }
    const car = await Car.create({
      name: name.trim(),
      description: description?.trim() || '',
      price: Number(price),
      imageUrl: imageUrl || '',
      pricePerDay: Number(price),
      pricePerKm: pricePerKm ? Number(pricePerKm) : undefined,
      features: Array.isArray(features) ? features : (features ? [features] : [])
    });
    res.status(201).json(car);
  } catch (err) {
    console.error('Add car error:', err);
    res.status(500).json({ message: 'Failed to add car' });
  }
});

router.post('/add-bus', async (req, res) => {
  try {
    const { name, description, price, imageUrl, pricePerKm, features } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }
    const bus = await Bus.create({
      name: name.trim(),
      description: description?.trim() || '',
      price: Number(price),
      imageUrl: imageUrl || '',
      pricePerDay: Number(price),
      pricePerKm: pricePerKm ? Number(pricePerKm) : undefined,
      features: Array.isArray(features) ? features : (features ? [features] : [])
    });
    res.status(201).json(bus);
  } catch (err) {
    console.error('Add bus error:', err);
    res.status(500).json({ message: 'Failed to add bus' });
  }
});

router.post('/add-package', async (req, res) => {
  try {
    const { name, description, price, imageUrl, pricePerKm, features } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }
    const pkg = await TravelPackage.create({
      name: name.trim(),
      description: description?.trim() || '',
      price: Number(price),
      imageUrl: imageUrl || '',
      pricePerKm: pricePerKm ? Number(pricePerKm) : undefined,
      features: Array.isArray(features) ? features : (features ? [features] : [])
    });
    res.status(201).json(pkg);
  } catch (err) {
    console.error('Add package error:', err);
    res.status(500).json({ message: 'Failed to add package' });
  }
});

router.get('/cars', async (_req, res) => {
  const cars = await Car.find().sort({ createdAt: -1 });
  res.json(cars);
});

router.get('/buses', async (_req, res) => {
  const buses = await Bus.find().sort({ createdAt: -1 });
  res.json(buses);
});

router.get('/packages', async (_req, res) => {
  const pkgs = await TravelPackage.find().sort({ createdAt: -1 });
  res.json(pkgs);
});

router.delete('/delete/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    const map = {
      car: Car,
      bus: Bus,
      package: TravelPackage
    };
    const Model = map[type];
    if (!Model) return res.status(400).json({ message: 'Invalid type' });
    const deleted = await Model.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Failed to delete item' });
  }
});

router.patch('/update-price/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    const { price } = req.body;
    if (!price || isNaN(price)) {
      return res.status(400).json({ message: 'Valid price is required' });
    }
    const map = {
      car: Car,
      bus: Bus,
      package: TravelPackage
    };
    const Model = map[type];
    if (!Model) return res.status(400).json({ message: 'Invalid type' });
    const updated = await Model.findByIdAndUpdate(
      id,
      { price: Number(price) },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Update price error:', err);
    res.status(500).json({ message: 'Failed to update price' });
  }
});

router.get('/bookings', async (_req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error('Get bookings error:', err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

router.patch('/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['Pending', 'Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const updated = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Update booking error:', err);
    res.status(500).json({ message: 'Failed to update booking' });
  }
});

export default router;

