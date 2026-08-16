import mongoose from 'mongoose';
import { ENV } from './env.js';
import { UserModel } from '../models/index.js';
import { seedDatabase } from '../seeds/seed.js';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected to database: ${conn.connection.name} @ ${conn.connection.host}`);

    // Auto-seed in development if database is empty
    const userCount = await UserModel.countDocuments();
    if (userCount === 0) {
      console.log('[MongoDB] Empty database detected. Auto-seeding all 12 collections...');
      await seedDatabase(false);
    }
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

