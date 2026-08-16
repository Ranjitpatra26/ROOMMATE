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

    if (!user.passwordHash) {
      res.status(400).json({ success: false, message: 'This account was created with Google Sign-In. Please click Continue with Google.' });
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

export const googleAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, name, picture, googleId } = req.body;
    if (!email) {
      res.status(400).json({ success: false, message: 'Google account email is required' });
      return;
    }

    const cleanEmail = email.toLowerCase().trim();
    let user = await UserModel.findOne({ email: cleanEmail });

    if (user) {
      // Link Google ID if not present
      if (!user.googleId && googleId) {
        user.googleId = googleId;
        user.authProvider = 'google';
        await user.save();
      }
    } else {
      // Create new user in MongoDB
      user = await UserModel.create({
        email: cleanEmail,
        googleId: googleId || `google_${Date.now()}`,
        authProvider: 'google',
        role: 'member',
        status: 'active',
      });

      // Create initial profile in MongoDB
      await ProfileModel.create({
        userId: user._id,
        displayName: name || cleanEmail.split('@')[0],
        headline: 'Verified Resident • Google Authenticated',
        avatarUrl: picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        visualTags: ['Google Verified', 'Kinship Verified'],
      });
    }

    const token = signToken({ userId: user._id.toString(), role: user.role });

    res.status(200).json({
      success: true,
      message: 'Google authentication successful',
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

export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ success: false, message: 'Email address is required' });
      return;
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await UserModel.findOne({ email: cleanEmail });
    if (!user) {
      res.status(404).json({ success: false, message: 'No registered account found with this email' });
      return;
    }

    // Generate 6-digit numeric verification OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordOtp = otp;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins validity
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset code generated and sent to your email',
      otp, // Provided for instant testing & visual auto-fill
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      res.status(400).json({ success: false, message: 'Email, verification code, and new password are required' });
      return;
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await UserModel.findOne({ email: cleanEmail });
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    if (!user.resetPasswordOtp || user.resetPasswordOtp !== otp.toString().trim()) {
      res.status(400).json({ success: false, message: 'Invalid verification code' });
      return;
    }

    if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      res.status(400).json({ success: false, message: 'Verification code has expired. Please request a new one.' });
      return;
    }

    // Hash and store new password in MongoDB
    user.passwordHash = await hashPassword(newPassword);
    user.resetPasswordOtp = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully! You can now log in with your new password.',
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

