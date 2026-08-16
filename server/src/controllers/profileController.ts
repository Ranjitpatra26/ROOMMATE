import { Response, NextFunction } from 'express';
import { ProfileModel, UserModel } from '../models/index.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

export const getProfileById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const query = id === 'me' ? { userId: req.user?.userId } : { _id: id };
    const profile = await ProfileModel.findOne(query).populate('userId', 'email role status');

    if (!profile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const profile = await ProfileModel.findOneAndUpdate(
      { userId: req.user?.userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

export const saveChapter1 = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { displayName, headline, bio, budgetRange, preferredLocations, moveInDate } = req.body;

    const profile = await ProfileModel.findOneAndUpdate(
      { userId: req.user?.userId },
      {
        $set: {
          displayName,
          headline,
          bio,
          budgetRange,
          preferredLocations,
          moveInDate,
        },
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, message: 'Chapter 01 saved', data: profile });
  } catch (error) {
    next(error);
  }
};

export const saveChapter2 = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lifestyleDNA = req.body;

    const profile = await ProfileModel.findOneAndUpdate(
      { userId: req.user?.userId },
      {
        $set: { lifestyleDNA },
      },
      { new: true }
    );

    // Update user status to active upon completing Chapter 2
    await UserModel.findByIdAndUpdate(req.user?.userId, { status: 'active' });

    res.status(200).json({ success: true, message: 'Chapter 02 Lifestyle DNA calibrated', data: profile });
  } catch (error) {
    next(error);
  }
};
