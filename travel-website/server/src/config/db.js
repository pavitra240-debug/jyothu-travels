import mongoose from "mongoose";
import { setServers } from "node:dns/promises";

// Fix for Node.js v22+ on Windows: SRV DNS resolution (querySrv ECONNREFUSED)
// Use public DNS so MongoDB Atlas SRV hostname can be resolved
try {
  setServers(["1.1.1.1", "8.8.8.8"]);
} catch (_) {}

export const connectDB = async (uri) => {
  if (!uri?.trim()) {
    console.error("❌ MongoDB Connection Error: MONGO_URI is missing in .env");
    process.exit(1);
  }
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(uri.trim(), {
      serverSelectionTimeoutMS: 10000,
      family: 4,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};