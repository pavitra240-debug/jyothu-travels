import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    travelDate: { type: Date, required: true },
    numberOfPeople: { type: Number, required: true },
    message: String,
    type: {
      type: String,
      enum: ['package', 'car', 'bus'],
      required: true
    },
    serviceId: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending'
    }
  },
  { timestamps: true }
);

export const Booking = mongoose.model('Booking', bookingSchema);

