import mongoose from 'mongoose';
import { ENV } from './env.js';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI);
    console.log(`[MongoDB] Connected to database: ${conn.connection.name} @ ${conn.connection.host}`);
  } catch (error) {
    console.error('[MongoDB] Connection error:', error);
    // Don't crash immediately in development if mongo is not running yet
    if (ENV.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};
