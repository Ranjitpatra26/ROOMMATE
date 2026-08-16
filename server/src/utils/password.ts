import bcrypt from 'bcryptjs';
import { ENV } from '../config/env.js';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(ENV.BCRYPT_SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
