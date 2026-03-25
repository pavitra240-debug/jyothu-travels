import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
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

export const Car = mongoose.model('Car', carSchema);

