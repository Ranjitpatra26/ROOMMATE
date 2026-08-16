import dotenv from 'dotenv';
import path from 'path';

// Load .env from root or server directory
dotenv.config();

export const ENV = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/roommate',
  JWT_SECRET: process.env.JWT_SECRET || 'super_secret_jwt_key_kinship_editorial_2026',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS ? parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) : 12,
};
