import { Request, Response } from 'express';
import {
  MessageModel,
  ConversationModel,
  ReviewModel,
  StayModel,
} from '../models/OperationalModels.js';
import { MatchModel } from '../models/Match.js';
import { TrustService } from '../services/trustService.js';

// ============================================================================
// MATCH CONTROLLERS
// ============================================================================
// ============================================================================
// MATCH CONTROLLERS
// ============================================================================
export const getMatchById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dbMatch = await MatchModel.findById(id).lean();

    const mockMatch = dbMatch || {
      id: id || 'match-ananya-sharma',
      user: {
        id: 'user-ananya',
        name: 'Ananya Sharma',
        title: 'Spatial Architect & Ceramicist',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A',
        location: 'Indiranagar, Bengaluru',
      },
      currentCurator: {
        id: 'user-current',
        name: 'You',
        avatarUrl:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      },
      compatibilityScore: 98,
      sharedStrengths: [
        { title: 'Early Risers', description: '5:30 AM peaceful morning quiet hours' },
        { title: 'Minimalist Spatial Order', description: 'Zero visual clutter in common areas' },
        { title: 'Quiet Evenings', description: 'Low acoustic threshold after 10:00 PM' },
        { title: 'Filter Coffee Rituals', description: 'Shared morning brewing and mindful living' },
      ],
      potentialFrictions: [
        { title: 'Guest Frequency', description: 'Advance 24hr notice requested for weekend visitors' },
      ],
      status: 'confirmed',
    };

    res.status(200).json({ success: true, data: mockMatch, match: mockMatch });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve match details', error });
  }
};

// ============================================================================
// CONVERSATION CONTROLLERS
// ============================================================================
export const getConversations = async (req: Request, res: Response): Promise<void> => {
  try {
    const dbConversations = await ConversationModel.find().sort({ updatedAt: -1 }).lean();

    const fallbackConversations = [
      {
        id: 'conversation-ananya',
        participant: {
          id: 'user-ananya',
          name: 'Ananya Sharma',
          avatarUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A',
          isOnline: true,
          compatibilityScore: 98,
        },
        lastMessage: 'I think the second floor corner room gets the best morning sunlight in Indiranagar.',
        lastMessageTime: '10:42 AM',
        unreadCount: 0,
        roomContext: {
          title: 'The Indiranagar Garden Penthouse',
          price: '₹28,500/mo',
          imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDYbWd_pE2tWjXwK0sE7g_Fq1yH3kJ8lN5vM4oP6rT8uA2cB7xZ9eD0fG1hI3jK5lM7nO9pQ1rS3tU5vW7xY9zA1bC3dE5fG7hI9jK1lM3nO5pQ7r',
        },
      },
      {
        id: 'conversation-rohan',
        participant: {
          id: 'user-rohan',
          name: 'Rohan Patil',
          avatarUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBNsMeqsJzF1-Ew6pA6f1m3eXv2b0o9yPq4t8R7u5W3v1kL9jHgF8d2S4a7Z6x5c3V2b1n0m9q8w7e6r5t4y3u2i1o0p9a8s7d6f5g4h3j2k1l',
          isOnline: false,
          compatibilityScore: 94,
        },
        lastMessage: 'Are you bringing any acoustic gear? I have sound-dampening acoustic curtains for our living suite.',
        lastMessageTime: 'Yesterday',
        unreadCount: 0,
      },
    ];

    const conversations = dbConversations && dbConversations.length > 0 ? dbConversations : fallbackConversations;

    res.status(200).json({
      success: true,
      data: conversations,
      conversations,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve conversations', error });
  }
};

export const getConversationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dbMessages = await MessageModel.find({ conversationId: id }).sort({ createdAt: 1 }).lean();

    const fallbackMessages = [
      {
        id: 'msg-1',
        senderId: 'user-ananya',
        senderName: 'Ananya',
        senderAvatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A',
        body: 'Namaste! I loved your resident compatibility profile. It seems our living rhythms align seamlessly.',
        createdAt: '10:30 AM',
        isMe: false,
      },
      {
        id: 'msg-2',
        senderId: 'user-ananya',
        senderName: 'Ananya',
        senderAvatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A',
        body: 'I was reviewing the sanctuary listing in Indiranagar. Have you explored the floor plan?',
        createdAt: '10:31 AM',
        isMe: false,
      },
      {
        id: 'msg-3',
        senderId: 'user-current',
        senderName: 'You',
        body: "Hello Ananya! Your profile stood out immediately. The 'Morning Rituals' section resonated deeply.",
        createdAt: '10:35 AM',
        isMe: true,
      },
      {
        id: 'msg-4',
        senderId: 'user-current',
        senderName: 'You',
        body: 'I did check that Indiranagar sanctuary. It looks stunning and has abundant natural morning light.',
        createdAt: '10:36 AM',
        isMe: true,
      },
      {
        id: 'msg-5',
        senderId: 'user-ananya',
        senderName: 'Ananya',
        senderAvatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A',
        body: 'I think the second floor corner suite gets the best light for morning focus.',
        createdAt: '10:42 AM',
        isMe: false,
      },
    ];

    const messages = dbMessages && dbMessages.length > 0 ? dbMessages : fallbackMessages;

    res.status(200).json({
      success: true,
      data: {
        conversationId: id,
        participant: {
          id: 'user-ananya',
          name: 'Ananya Sharma',
          role: 'Spatial Architect · 28',
          avatarUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A',
          isOnline: true,
          compatibilityScore: 98,
          tags: ['Early Riser', 'Minimalist', 'ID Verified'],
        },
        roomContext: {
          title: 'The Indiranagar Garden Penthouse',
          price: '₹28,500/mo Total',
          imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDYbWd_pE2tWjXwK0sE7g_Fq1yH3kJ8lN5vM4oP6rT8uA2cB7xZ9eD0fG1hI3jK5lM7nO9pQ1rS3tU5vW7xY9zA1bC3dE5fG7hI9jK1lM3nO5pQ7r',
        },
        messages,
      },
      conversationId: id,
      messages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve conversation', error });
  }
};

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { body } = req.body;

    const newMessage = await MessageModel.create({
      conversationId: id || 'conversation-ananya',
      senderId: 'user-current',
      senderName: 'You',
      body: body || '',
      createdAt: new Date(),
      isMe: true,
    });

    res.status(201).json({ success: true, data: newMessage, message: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message', error });
  }
};

export const markConversationRead = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ success: true, readAt: new Date() });
};

// ============================================================================
// TRUST CONTROLLERS
// ============================================================================
export const getTrustProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = String(req.params.userId || 'user-elena');
    const metrics = await TrustService.calculateTrustMetrics(userId);

    res.status(200).json({
      success: true,
      trustProfile: metrics,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load trust profile', error });
  }
};

export const getTrustHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = String(req.params.userId || 'user-elena');

    const timelineEvents = [
      {
        id: 'event-1',
        type: 'stay_completed',
        title: 'Completed 6-Month Stay: The Williamsburg Loft',
        date: 'June 2026',
        rating: 5.0,
        badge: 'Verified Resident',
        summary: 'Flawlessly maintained common spaces, zero sound disruptions, exemplary communication with cohabitants.',
        cohabitants: ['Maya Lin (Verified)', 'Julian Hayes (Verified)'],
      },
      {
        id: 'event-2',
        type: 'stay_completed',
        title: 'Completed 1-Year Stay: Arts District Loft Space',
        date: 'November 2025',
        rating: 4.9,
        badge: 'Verified Resident',
        summary: 'Consistently punctual on all utility splits, respectful of early morning quiet hours.',
        cohabitants: ['Elena Rostova (Verified)'],
      },
      {
        id: 'event-3',
        type: 'identity_verified',
        title: 'Government Identity & Biometrics Cleared',
        date: 'January 2025',
        badge: 'Verified Identity',
        summary: 'Passport verification and cryptographic fraud screen passed with 100% confidence.',
      },
    ];

    res.status(200).json({
      success: true,
      userId,
      reputationScore: 940,
      tier: 'kinship_certified',
      history: timelineEvents,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve trust history', error });
  }
};

// ============================================================================
// REVIEW CONTROLLERS
// ============================================================================
export const getStayReviewEligibility = async (req: Request, res: Response): Promise<void> => {
  try {
    const stayId = String(req.params.stayId || 'stay-1');
    const reviewerId = String((req as any).user?.userId || 'user-current');
    const revieweeId = String(req.query.revieweeId || 'user-maya');

    const eligibility = await TrustService.verifyReviewEligibility(reviewerId, revieweeId, stayId);
    res.status(200).json({ success: true, eligibility });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to check review eligibility', error });
  }
};

export const submitStayReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const stayId = String(req.params.stayId || 'stay-1');
    const {
      revieweeId,
      overallRating,
      cleanlinessRating,
      communicationRating,
      respectRating,
      noiseRating,
      comment,
    } = req.body;

    const reviewerId = String((req as any).user?.userId || 'user-current');

    // Verify eligibility
    const eligibility = await TrustService.verifyReviewEligibility(reviewerId, String(revieweeId || 'user-maya'), stayId);
    if (!eligibility.eligible) {
      res.status(403).json({ success: false, message: eligibility.reason });
      return;
    }

    const review = {
      id: `rev-${Date.now()}`,
      reviewerId,
      revieweeId,
      stayId,
      overallRating: overallRating || 5,
      cleanlinessRating: cleanlinessRating || 5,
      communicationRating: communicationRating || 5,
      respectRating: respectRating || 5,
      noiseRating: noiseRating || 5,
      comment: comment || '',
      verifiedStay: true,
      createdAt: new Date(),
    };

    res.status(201).json({ success: true, message: 'Verified review submitted successfully', review });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit review', error });
  }
};
