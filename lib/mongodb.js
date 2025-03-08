// lib/mongodb.js
import mongoose from 'mongoose';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    // If already connected to DB, return early
    return;
  }

  try {
    // Ensure the MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }

    // Connect to the MongoDB database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    throw new Error('Could not connect to MongoDB');
  }
};

export default connectToDatabase;
