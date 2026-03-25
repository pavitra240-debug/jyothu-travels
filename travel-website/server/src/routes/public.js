import express from 'express';
import { Booking } from '../models/Booking.js';
import { Car } from '../models/Car.js';
import { Bus } from '../models/Bus.js';
import { TravelPackage } from '../models/Package.js';
import Message from '../models/Message.js';
import { sendBookingNotification, sendContactNotification } from '../utils/email.js';

const router = express.Router();

router.post('/book', async (req, res) => {
  try {
    const { name, phone, email, travelDate, numberOfPeople, type, serviceId, message } = req.body;
    
    // Validate required fields
    if (!name || !phone || !email || !travelDate || !numberOfPeople || !type) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    
    // Validate phone format
    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      return res.status(400).json({ message: 'Invalid phone number' });
    }
    
    const booking = await Booking.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      travelDate,
      numberOfPeople: Number(numberOfPeople),
      type,
      serviceId: serviceId || null,
      message: message?.trim() || '',
      status: 'Pending'
    });
    
    // Send email notification asynchronously
    sendBookingNotification({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      travelDate,
      numberOfPeople: Number(numberOfPeople),
      type,
      serviceId: serviceId || null,
      message: message?.trim() || ''
    }).catch(console.error);

    res.status(201).json(booking);
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Unable to create booking. Please try again.' });
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

router.get('/cars', async (_req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    console.error('Get cars error:', err);
    res.status(500).json({ message: 'Failed to fetch cars' });
  }
});

router.get('/buses', async (_req, res) => {
  try {
    const buses = await Bus.find().sort({ createdAt: -1 });
    res.json(buses);
  } catch (err) {
    console.error('Get buses error:', err);
    res.status(500).json({ message: 'Failed to fetch buses' });
  }
});

router.get('/packages', async (_req, res) => {
  try {
    const pkgs = await TravelPackage.find().sort({ createdAt: -1 });
    res.json(pkgs);
  } catch (err) {
    console.error('Get packages error:', err);
    res.status(500).json({ message: 'Failed to fetch packages' });
  }});

router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      message: message.trim(),
    });

    // Send email notification asynchronously
    sendContactNotification({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      message: message.trim(),
    }).catch(console.error);

    res.status(201).json({ message: 'Message sent successfully.', data: newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while sending the message.' });
  }
});

export default router;