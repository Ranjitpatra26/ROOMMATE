import mongoose from 'mongoose';
import { ENV } from './env.js';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected to database: ${conn.connection.name} @ ${conn.connection.host}`);
  } catch (error) {
    console.error('[MongoDB] Connection error:', error);
    if (ENV.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      // In development, retry connection after 3 seconds
      console.log('[MongoDB] Retrying connection in 3 seconds...');
      setTimeout(connectDB, 3000);
    }
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('[MongoDB] Disconnected. Reconnecting...');
  setTimeout(connectDB, 3000);
});

mongoose.connection.on('error', (err) => {
  console.error('[MongoDB] Connection error event:', err);
});

