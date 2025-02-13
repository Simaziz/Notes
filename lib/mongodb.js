import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is missing in .env.local");
}

let isConnected = false;

export default async function connectToDatabase() {
  if (isConnected) {
    console.log("🔄 Using existing MongoDB connection");
    return;
  }

  try {
    console.log("⏳ Connecting to MongoDB...");

    const db = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ Successfully connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.error("Full error:", error); // Log the full error object
    throw new Error(`Database connection failed: ${error.message}`);
  }
}
