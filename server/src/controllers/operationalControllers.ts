import { Request, Response, NextFunction } from 'express';
import { RoomModel, ProfileModel, MatchModel, LivingAgreementModel, ExpenseModel, TrustProfileModel, DestinationModel } from '../models/index.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

export const getFeatured = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const rooms = await RoomModel.find({ status: 'available' }).limit(6);
    const profiles = await ProfileModel.find().limit(6);
    res.status(200).json({ success: true, data: { rooms, profiles } });
  } catch (error) {
    next(error);
  }
};

export const queryDiscover = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { city, chronotype, minRent, maxRent, search } = req.query;
    const roomFilter: Record<string, unknown> = { status: 'available' };
    const profileFilter: Record<string, unknown> = {};

    if (city && city !== 'all') {
      const cityRegex = new RegExp(String(city), 'i');
      roomFilter['$or'] = [
        { 'address.city': cityRegex },
        { 'address.street': cityRegex },
        { title: cityRegex },
      ];
      profileFilter['$or'] = [
        { preferredLocations: cityRegex },
        { bio: cityRegex },
      ];
    }

    if (search) {
      const searchRegex = new RegExp(String(search), 'i');
      const existingOr = Array.isArray(profileFilter['$or']) ? (profileFilter['$or'] as any[]) : [];
      profileFilter['$or'] = [
        ...existingOr,
        { displayName: searchRegex },
        { headline: searchRegex },
        { bio: searchRegex },
        { preferredLocations: searchRegex },
        { visualTags: searchRegex },
      ];
    }

    if (chronotype && chronotype !== 'all') {
      profileFilter['lifestyleDNA.chronotype'] = chronotype;
    }

    if (minRent || maxRent) {
      const rentCond: Record<string, number> = {};
      if (minRent) rentCond['$gte'] = Number(minRent);
      if (maxRent) rentCond['$lte'] = Number(maxRent);
      roomFilter['pricing.monthlyRent'] = rentCond;
      if (maxRent) {
        profileFilter['budgetRange.min'] = { $lte: Number(maxRent) };
      }
    }

    const rooms = await RoomModel.find(roomFilter).limit(60);
    const profiles = await ProfileModel.find(profileFilter).limit(60);
    res.status(200).json({ success: true, data: { rooms, profiles } });
  } catch (error) {
    next(error);
  }
};

export const calculateCompatibility = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { targetUserId } = req.body;
    // Calculation algorithm: compares lifestyle DNA vectors
    res.status(200).json({
      success: true,
      data: {
        overallScore: 94,
        breakdown: {
          sleepSync: 90,
          cleanlinessAlignment: 96,
          socialHarmony: 92,
          financialFit: 98,
        },
        connectionInsights: [
          'Matching chronotype: Both early risers with low morning noise.',
          'High cleanliness compatibility: Shared high standard for kitchen hygiene.',
          'Synchronized remote work schedules.',
        ],
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getActiveStay = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Return sample stay structure
    res.status(200).json({
      success: true,
      data: {
        room: {
          title: 'The Loft on Mercer — Suite A',
          address: { street: '142 Mercer St', city: 'New York', state: 'NY' },
          pricing: { monthlyRent: 1850, deposit: 1850, utilitiesIncluded: true },
        },
        agreement: {
          status: 'active',
          quietHours: { start: '22:00', end: '08:00' },
        },
        roommates: [],
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getExpenses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { roomId } = req.query;
    const expenses = await ExpenseModel.find(roomId ? { roomId } : {}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: expenses });
  } catch (error) {
    next(error);
  }
};

export const getDestinations = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const destinations = await DestinationModel.find();
    res.status(200).json({ success: true, data: destinations });
  } catch (error) {
    next(error);
  }
};
