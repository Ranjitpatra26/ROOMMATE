import { Request, Response, NextFunction } from 'express';
import { UserModel, ProfileModel } from '../models/index.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { signToken } from '../utils/jwt.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required' });
      return;
    }

    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(409).json({ success: false, message: 'An account with this email already exists' });
      return;
    }

    const passwordHash = await hashPassword(password);
    const user = await UserModel.create({
      email: email.toLowerCase(),
      passwordHash,
      role: 'member',
      status: 'onboarding',
    });

    // Automatically create initial profile draft
    await ProfileModel.create({
      userId: user._id,
      displayName: email.split('@')[0],
      headline: 'New Roommate Member',
      visualTags: ['Kinship Verified'],
    });

    const token = signToken({ userId: user._id.toString(), role: user.role });

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          status: user.status,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required' });
      return;
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    const token = signToken({ userId: user._id.toString(), role: user.role });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          status: user.status,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await UserModel.findById(req.user?.userId).select('-passwordHash');
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
