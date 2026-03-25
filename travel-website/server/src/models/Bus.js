import mongoose from 'mongoose';

const busSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: Number,
    pricePerDay: Number,
    pricePerKm: Number,
    imageUrl: String,
    features: [{ type: String }]
  },
  { timestamps: true }
);

export const Bus = mongoose.model('Bus', busSchema);

