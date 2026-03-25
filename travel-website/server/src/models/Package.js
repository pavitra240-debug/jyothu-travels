import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: Number,
    pricePerKm: Number,
    imageUrl: String,
    features: [{ type: String }]
  },
  { timestamps: true }
);

export const TravelPackage = mongoose.model('Package', packageSchema);

