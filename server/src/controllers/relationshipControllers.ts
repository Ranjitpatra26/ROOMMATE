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
export const getMatchById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Fallback/mock response if mock ID or database match
    const mockMatch = {
      id: id || 'match-elena-v',
      user: {
        id: 'user-elena',
        name: 'Elena Rostova',
        title: 'Architectural Designer & Early Riser',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDa2JCqF8-uGxjzWrQNLbFq7aayFMyciJunutZhWilYq4pQIvYDUgd9gGDyp90HUgiedWGnwDuJ6TN-apEeDu0qqBhGQkbMFsw26k1xsuR26uKwG2jecFSVTGHGxX5K1Fptb87BYgY7kPfj1Hcg6r_Vaj_5hynyjzDDVTVTsa4vQoneGjIVYeJB2peMufDEDotc7Z_R1N-XtOpKEB1-6oI8JYK1gWbFbji08JqeGfa7gev1gdw9jqX_bw',
        location: 'Kyoto / Brooklyn',
      },
      currentCurator: {
        id: 'user-current',
        name: 'You',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDGQ-ozjyyc6Eupf8aRCKD-Gfs143df1Ghb7uzTJ4SOClrK2QuZDJip7o5pj1ro4g_bFE27qxxvpHIPuRPR6bW6I41fOXfLGi3tWmDGwhZ_vAlQMpjaIKe2cIXm6FOa7wfsGRujM2d9uqvVOXgezykAM4MUyuGnel8eYZnfT0HFL4KvB7uNudvifiiImCYS4L8fPKO0C7VUnYfVukgLsDznY-OpMfhb0hbdnOjEvq5yWJo0f4v6nK4uNA',
      },
      compatibilityScore: 98,
      sharedStrengths: [
        { title: 'Early Risers', description: '5:30 AM peaceful morning quiet hours' },
        { title: 'Minimalist Style', description: 'Zero visual clutter in common areas' },
        { title: 'Quiet Evenings', description: 'Low acoustic threshold after 9:00 PM' },
        { title: 'Coffee Rituals', description: 'Shared morning brewing and artisan appreciation' },
      ],
      potentialFrictions: [
        { title: 'Guest Frequency', description: 'Advance 24hr notice required for weekend visitors' },
      ],
      status: 'confirmed',
    };

    res.status(200).json({ success: true, match: mockMatch });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve match details', error });
  }
};

// ============================================================================
// CONVERSATION CONTROLLERS
// ============================================================================
export const getConversations = async (req: Request, res: Response): Promise<void> => {
  try {
    const mockConversations = [
      {
        id: 'conversation-maya',
        participant: {
          id: 'user-maya',
          name: 'Maya Lin',
          avatarUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuC64MbZWsNixcO8McDmNx9O0u22et38koHfzkR1L85nrNCbb5YIzzL6EMVp-HSbJhTQZQIgd_4WaL4w32CrGIgitEkcxxzRW-x-JQAf6rlgr-YzwwE8OYl8iut1Rz_pGMddRzECyh7vPq13cQSlOi5I8C-1wQqo8w9tl5PULqqKuweX89oMHAbseGsUMo0Lbj6JDZU5h4I5k0KmXmVqZMOGnpn_fd63AIUCd4gCyPkqW69Njzrwm3lCYA',
          isOnline: true,
          compatibilityScore: 98,
        },
        lastMessage: 'I think the second floor corner room gets the best light in the morning.',
        lastMessageTime: '10:42 AM',
        unreadCount: 0,
        roomContext: {
          title: 'The Williamsburg Loft',
          price: '$1,850/mo',
          imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ',
        },
      },
      {
        id: 'conversation-julian',
        participant: {
          id: 'user-julian',
          name: 'Julian Hayes',
          avatarUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCK_9NnhlZkr6Pkn0lhOlguCm2SQeh6OMQXhu0IpHtite7Jkyg01pOI5ETUDoiA9qRorQhh07HrHK62hEG2nPDpODQhaWKN8MQ0ZlIpv4MGVZa62ojUIBYOS55qT6NN-mBOOVDMC3MUL8mgol6VTGmKT5WKKWJ2saeFSKqpTQOk98w9RkkYl7eldJmIT1F6xc8RHR3vdB1uzkpY7lnlIRpvEE8h64G6A-JxwQsX73invKkEaJ6lPkdtcw',
          isOnline: false,
          compatibilityScore: 88,
        },
        lastMessage: 'Are you bringing any furniture? I have a large sectional we could use.',
        lastMessageTime: 'Yesterday',
        unreadCount: 0,
      },
    ];

    res.status(200).json({ success: true, conversations: mockConversations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve conversations', error });
  }
};

export const getConversationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const mockMessages = [
      {
        id: 'msg-1',
        senderId: 'user-maya',
        senderName: 'Maya',
        senderAvatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDPEq_t3wsCyapXNBS865uHThQBZujCO3GiaPOfGBQzvmerZwqxLhKZ-ur2iSb2xCtFNuH7QFVc6-th58KsttfXVaPuUYHEQOhe0ZKc8lPpYDvN5NPqy_bF3jUqBjuLvvOZu0CC3Qg_q8cemmVa71PJXG89iqoX4SMRkJsufIeTWBL3QpYQCR6BMcuYQqnHSquicrX8LGb1KPLy5a66czJkWlo3wiHOfu7j3bI5hOaWYH8WgRXNg7dQKw',
        body: 'Hi there! I loved your profile. It seems like we have very similar aesthetics and living habits.',
        createdAt: '10:30 AM',
        isMe: false,
      },
      {
        id: 'msg-2',
        senderId: 'user-maya',
        senderName: 'Maya',
        senderAvatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDPEq_t3wsCyapXNBS865uHThQBZujCO3GiaPOfGBQzvmerZwqxLhKZ-ur2iSb2xCtFNuH7QFVc6-th58KsttfXVaPuUYHEQOhe0ZKc8lPpYDvN5NPqy_bF3jUqBjuLvvOZu0CC3Qg_q8cemmVa71PJXG89iqoX4SMRkJsufIeTWBL3QpYQCR6BMcuYQqnHSquicrX8LGb1KPLy5a66czJkWlo3wiHOfu7j3bI5hOaWYH8WgRXNg7dQKw',
        body: 'I was looking at the listing in the Arts District. Have you checked out the floor plan?',
        createdAt: '10:31 AM',
        isMe: false,
      },
      {
        id: 'msg-3',
        senderId: 'user-current',
        senderName: 'You',
        body: "Hello Maya! Thank you, your profile stood out to me as well. The 'Rituals' section really resonated.",
        createdAt: '10:35 AM',
        isMe: true,
      },
      {
        id: 'msg-4',
        senderId: 'user-current',
        senderName: 'You',
        body: 'I did see that listing. It looks stunning and has generous natural sunlight.',
        createdAt: '10:36 AM',
        isMe: true,
      },
      {
        id: 'msg-5',
        senderId: 'user-maya',
        senderName: 'Maya',
        senderAvatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAHyt4KRDIw7RGLkhJSttYv3I0QeuHDW-sqRHaJ2ClbdvrvUNl4IQTzEiJnnVBZqTaEN5DwWzrMnDUMyMbFuGAysEkeiJAcj60k3RpTv2oQAyqU01paG0uVQBQAfc1y8Y92ePknF7Q4InVJ07JX3rLCmHqnE5RqV8nmboL0AjAXPH830gN7u7kr7HNJtaZSPWqoiVAH6Mc2z0mZqO-bkVcziUZIW_F9wfLIRfo41t9GavmRQgP4pd5DPg',
        body: 'I think the second floor corner room gets the best light in the morning.',
        createdAt: '10:42 AM',
        isMe: false,
      },
    ];

    res.status(200).json({
      success: true,
      conversationId: id,
      participant: {
        id: 'user-maya',
        name: 'Maya Lin',
        role: 'Architectural Designer · 28',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBommkV4DLPt6GJCejGF2iQ9uT-P9wRS5mHuief1hVSrolxQIJrtBI0kZPD0erbrxdY8geGv-3mnfSu0JIVbeS_FdojbdduEqEHPIybpnYlIIeC0WZ-ItuwvMQ2ULlw4tJkLq0YQjy2ex5BQFJ26OB7hsAXxOQr_GdjK4wVY-q7PCl3_8DsTsCCl9HLR8RsAj1SsqMygz9lWOqnX_fU6R_NEAKImBCmabGKb48b_XMMyd2Yf7ZmGPXD-A',
        isOnline: true,
        compatibilityScore: 98,
        tags: ['Early Riser', 'Minimalist'],
      },
      roomContext: {
        title: 'Arts District Loft Space',
        price: '$3,200/mo Total',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ',
      },
      messages: mockMessages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve conversation', error });
  }
};

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { body } = req.body;

    const newMessage = {
      id: `msg-${Date.now()}`,
      conversationId: id,
      senderId: 'user-current',
      senderName: 'You',
      body: body || '',
      createdAt: 'Just now',
      isMe: true,
    };

    res.status(201).json({ success: true, message: newMessage });
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
