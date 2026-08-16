import { Request, Response } from 'express';
import {
  StayModel,
  LivingAgreementModel,
  ExpenseModel,
} from '../models/OperationalModels.js';

// ============================================================================
// 1. ACTIVE STAY & LIVING OS
// ============================================================================
export const getActiveStayDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const mockStay = {
      id: 'stay-brooklyn-loft',
      title: 'The Brooklyn Loft',
      daysActive: 142,
      status: 'active',
      address: '240 Bedford Ave, Brooklyn, NY',
      cohabitants: [
        {
          id: 'user-maya',
          name: 'Maya Lin',
          avatarUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB6NIX74GUEI5WqERvjhoha9beFknsz5QqGosnbyDRUMbgHZYboXXJz8nm3p3YyN6vCYkX32Md3B3YMn3rMJKXFOhIzWSg_g3OTc-RBlrgl3FbOqzpHnCQVs-8sAEaoaytnT1IPTQatgvpO3HBFZnnhb7ep0Xaw9DfPK5ubfaTMUTL38RxLp9Hqa3nyXH8EDlBVTo2T2CDP5Sd2tdZGHer7eUhIGNgkDshivxJ1SOgOsCFOBGwhqL1ing',
          role: 'Architectural Designer',
          cleanlinessScore: 98,
        },
        {
          id: 'user-julian',
          name: 'Julian Hayes',
          avatarUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB2i8SWb4apq6U1es6wns7xbL7M0iATnV9B0tUPVJ8wkAcPPnSxWpkn7RkYeWkoEHQd0963RC1wXOpzAIpyr3-iHi_2rFrr0ee44glSA9C-3IMa8KVBFUuRkLkR7z5xDs39RTkQi5dodR4MExu9kttg4kfvaxAUCMKUutHCViobglnW4KmJvyEBm03D1AT5KE-6Vi3hF7cWFK6G_AwvFQE5R9fiVI_tgFyEztv6vxUoaqk8MaqskJEImQ',
          role: 'Software Engineer',
          cleanlinessScore: 92,
        },
      ],
      todayResponsibilities: [
        {
          id: 'resp-1',
          title: 'Kitchen Deep Clean',
          assignee: "Maya's Turn",
          description: 'Clear counters, wipe down appliances, run the dishwasher.',
          icon: 'mop',
          status: 'pending',
        },
        {
          id: 'resp-2',
          title: 'ConEd Utility Bill',
          assignee: 'Due Today',
          description: '$142.50 total. Splitting equally among 3 residents.',
          icon: 'receipt_long',
          status: 'pending',
          urgent: true,
        },
      ],
      financialEquilibrium: {
        userBalance: -45.0,
        currency: '$',
        breakdown: [
          { name: 'Maya', reason: 'For Groceries', amount: -45.0 },
          { name: 'Julian', reason: 'For Internet', amount: 20.0 },
        ],
      },
    };

    res.status(200).json({ success: true, stay: mockStay });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve stay details', error });
  }
};

// ============================================================================
// 2. LIVING AGREEMENT
// ============================================================================
export const getLivingAgreement = async (req: Request, res: Response): Promise<void> => {
  try {
    const agreement = {
      id: 'agree-1',
      stayId: 'stay-brooklyn-loft',
      version: 'v2.1',
      status: 'active',
      signedAt: '2026-03-01',
      rules: [
        {
          id: 'dim-1',
          category: 'Rent Contribution',
          target: '$1,850/mo per resident',
          description: 'Due by the 5th of every month. Transfer to designated joint account.',
          status: 'agreed',
        },
        {
          id: 'dim-2',
          category: 'Quiet Hours Rhythm',
          target: '10:00 PM – 7:30 AM Daily',
          description: 'Headphones required in common spaces after 10 PM. No high-volume speakers.',
          status: 'agreed',
        },
        {
          id: 'dim-3',
          category: 'Guest Policy',
          target: '2 Nights Max / Week',
          description: 'Notify roommates via Living OS 24 hours in advance for overnight guests.',
          status: 'agreed',
        },
        {
          id: 'dim-4',
          category: 'Shared Spaces Cleanliness',
          target: 'Immediate Clean-As-You-Go',
          description: 'Dishes into dishwasher immediately. Kitchen island cleared after cooking.',
          status: 'agreed',
        },
      ],
    };

    res.status(200).json({ success: true, agreement });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load living agreement', error });
  }
};

export const updateLivingAgreement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rules } = req.body;
    res.status(200).json({
      success: true,
      message: 'Living Agreement updated successfully. Sent confirmation requests to cohabitants.',
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
    const mockExpenses = [
      {
        id: 'exp-1',
        title: 'Artisan Grocery Run (Whole Foods)',
        amount: 135.0,
        paidBy: 'Maya Lin',
        category: 'groceries',
        date: 'Yesterday',
        userShare: 45.0,
        status: 'pending',
      },
      {
        id: 'exp-2',
        title: 'Gigabit Fiber Internet',
        amount: 60.0,
        paidBy: 'You',
        category: 'utilities',
        date: 'Oct 20, 2024',
        userShare: -40.0,
        status: 'settled',
      },
      {
        id: 'exp-3',
        title: 'Common Area Cleaning Supplies & Eco Detergent',
        amount: 42.0,
        paidBy: 'Julian Hayes',
        category: 'supplies',
        date: 'Oct 18, 2024',
        userShare: 14.0,
        status: 'settled',
      },
    ];

    res.status(200).json({
      success: true,
      totalHouseholdSpent: 237.0,
      userNetBalance: -45.0,
      expenses: mockExpenses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve expenses', error });
  }
};

export const createSharedExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, amount, category, splitMethod } = req.body;

    const newExpense = {
      id: `exp-${Date.now()}`,
      title: title || 'Shared Item',
      amount: Number(amount) || 0,
      category: category || 'utilities',
      paidBy: 'You',
      splitMethod: splitMethod || 'equal',
      date: 'Today',
      status: 'pending',
    };

    res.status(201).json({ success: true, expense: newExpense });
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
