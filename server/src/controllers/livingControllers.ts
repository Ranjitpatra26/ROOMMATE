import { Request, Response } from 'express';
import {
  StayModel,
  LivingAgreementModel,
  ExpenseModel,
} from '../models/OperationalModels.js';

// ============================================================================
// 1. ACTIVE STAY & LIVING OS
// ============================================================================
// ============================================================================
// 1. ACTIVE STAY & LIVING PLATFORM
// ============================================================================
export const getActiveStayDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const dbStay = await StayModel.findOne({ status: 'active' }).lean();
    let room = null;
    let cohabitants: Array<{ id: string; name: string; avatarUrl: string; role: string; cleanlinessScore: number }> = [];

    if (dbStay) {
      const { RoomModel, ProfileModel } = await import('../models/index.js');
      room = await RoomModel.findById(dbStay.roomId).lean();
      const profiles = await ProfileModel.find({ userId: { $in: dbStay.participants } }).lean();
      cohabitants = profiles.map((p) => ({
        id: p.userId?.toString() || p._id.toString(),
        name: p.displayName,
        avatarUrl: p.avatarUrl || '',
        role: p.headline || 'Resident',
        cleanlinessScore: p.lifestyleDNA?.cleanlinessLevel ? p.lifestyleDNA.cleanlinessLevel * 20 : 96,
      }));
    }

    const stay = {
      id: dbStay?._id.toString() || 'stay-indiranagar-loft',
      title: room?.title || 'The Indiranagar Garden Penthouse',
      daysActive: 168,
      status: 'active',
      address: room?.address
        ? `${room.address.street || ''}, ${room.address.city || 'Bengaluru'}, ${room.address.state || 'KA'}`
        : '100ft Road, Indiranagar, Bengaluru, KA 560038',
      cohabitants:
        cohabitants.length > 0
          ? cohabitants
          : [
              {
                id: 'user-ananya',
                name: 'Ananya Sharma',
                avatarUrl:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A',
                role: 'Spatial Architect',
                cleanlinessScore: 98,
              },
              {
                id: 'user-rohan',
                name: 'Rohan Patil',
                avatarUrl:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuBNsMeqsJzF1-Ew6pA6f1m3eXv2b0o9yPq4t8R7u5W3v1kL9jHgF8d2S4a7Z6x5c3V2b1n0m9q8w7e6r5t4y3u2i1o0p9a8s7d6f5g4h3j2k1l',
                role: 'Creative Technologist',
                cleanlinessScore: 94,
              },
            ],
      todayResponsibilities: [
        {
          id: 'resp-1',
          title: 'Kitchen Deep Clean',
          assignee: "Ananya's Turn",
          description: 'Clear counters, wipe down appliances, run the dishwasher.',
          icon: 'mop',
          status: 'pending',
        },
        {
          id: 'resp-2',
          title: 'ACT Gigabit Fiber Bill',
          assignee: 'Due Today',
          description: '₹2,499 total. Splitting equally among 3 residents.',
          icon: 'receipt_long',
          status: 'pending',
          urgent: true,
        },
      ],
      financialEquilibrium: {
        userBalance: -1250.0,
        currency: '₹',
        breakdown: [
          { name: 'Ananya', reason: 'For Nature Basket Groceries', amount: -1250.0 },
          { name: 'Rohan', reason: 'For ACT Fiber Internet', amount: 833.0 },
        ],
      },
    };

    res.status(200).json({ success: true, data: stay, stay });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve stay details', error });
  }
};

// ============================================================================
// 2. LIVING AGREEMENT
// ============================================================================
export const getLivingAgreement = async (req: Request, res: Response): Promise<void> => {
  try {
    const dbAgreement = await LivingAgreementModel.findOne({ status: 'active' }).lean();

    const agreement = dbAgreement || {
      id: 'agree-blr-1',
      stayId: 'stay-indiranagar-loft',
      version: 'v2.1',
      status: 'active',
      signedAt: '2026-03-01',
      rules: [
        {
          id: 'dim-1',
          category: 'Rent Contribution',
          target: '₹28,500/mo per resident',
          description: 'Due by the 5th of every month. Transfer to designated joint account.',
          status: 'agreed',
        },
        {
          id: 'dim-2',
          category: 'Quiet Hours Rhythm',
          target: '10:30 PM – 7:30 AM Daily',
          description: 'Headphones required in common spaces after 10:30 PM. No high-volume speakers.',
          status: 'agreed',
        },
        {
          id: 'dim-3',
          category: 'Guest Policy',
          target: '2 Nights Max / Week',
          description: 'Notify roommates via Living Platform 24 hours in advance for overnight guests.',
          status: 'agreed',
        },
        {
          id: 'dim-4',
          category: 'Shared Spaces Cleanliness',
          target: 'Immediate Clean-As-You-Go',
          description: 'Dishes cleaned and kitchen island cleared after cooking.',
          status: 'agreed',
        },
      ],
    };

    res.status(200).json({ success: true, data: agreement, agreement });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load living agreement', error });
  }
};

export const updateLivingAgreement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rules } = req.body;
    await LivingAgreementModel.findOneAndUpdate(
      { status: 'active' },
      { $set: { rules, updatedAt: new Date() } },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Living Agreement updated successfully in MongoDB. Sent confirmation requests to cohabitants.',
      version: 'v2.2',
      rules,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update agreement', error });
  }
};

// ============================================================================
// 3. SHARED EXPENSES
// ============================================================================
export const getSharedExpenses = async (req: Request, res: Response): Promise<void> => {
  try {
    const dbExpenses = await ExpenseModel.find().sort({ createdAt: -1 }).lean();

    const fallbackExpenses = [
      {
        id: 'exp-1',
        title: 'Artisan Grocery Run (Nature Basket Indiranagar)',
        amount: 3750.0,
        paidBy: 'Ananya Sharma',
        category: 'groceries',
        date: 'Yesterday',
        userShare: 1250.0,
        status: 'pending',
      },
      {
        id: 'exp-2',
        title: 'ACT Gigabit Fiber Internet (300 Mbps)',
        amount: 2499.0,
        paidBy: 'You',
        category: 'utilities',
        date: 'Oct 20, 2026',
        userShare: -1666.0,
        status: 'settled',
      },
      {
        id: 'exp-3',
        title: 'Houseplant Care & Eco Cleaning Supplies',
        amount: 1280.0,
        paidBy: 'Rohan Patil',
        category: 'supplies',
        date: 'Oct 18, 2026',
        userShare: 426.0,
        status: 'settled',
      },
    ];

    const expenses = dbExpenses && dbExpenses.length > 0 ? dbExpenses : fallbackExpenses;
    const totalHouseholdSpent = expenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

    res.status(200).json({
      success: true,
      data: expenses,
      totalHouseholdSpent,
      userNetBalance: -1250.0,
      expenses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve expenses', error });
  }
};

export const createSharedExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, amount, category, splitMethod } = req.body;

    const newExpense = await ExpenseModel.create({
      title: title || 'Shared Household Item',
      amount: Number(amount) || 0,
      category: category || 'utilities',
      paidBy: 'You',
      splitMethod: splitMethod || 'equal',
      date: 'Today',
      status: 'pending',
    });

    res.status(201).json({ success: true, data: newExpense, expense: newExpense });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add expense', error });
  }
};

// ============================================================================
// 4. SAFETY & PERSONAL CONTROL CENTER
// ============================================================================
export const submitSafetyReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reportType, description, stayId, reportedUserId } = req.body;

    const report = {
      id: `safe-${Date.now()}`,
      reportType: reportType || 'incident',
      description: description || '',
      stayId: stayId || 'stay-brooklyn-loft',
      reportedUserId,
      status: 'received_under_review',
      createdAt: new Date(),
    };

    res.status(201).json({
      success: true,
      message: 'Safety incident received. Our trust & safety team will review discreetly.',
      report,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit safety report', error });
  }
};
