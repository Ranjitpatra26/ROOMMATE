// Kinship Editorial Domain Types

export type UserRole = 'member' | 'host' | 'verified_resident';
export type UserStatus = 'active' | 'onboarding' | 'suspended';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export interface Chronotype {
  type: 'early_bird' | 'night_owl' | 'flexible' | 'balanced';
  score: number; // 0-100
}

export interface LifestyleDNA {
  chronotype: 'early_bird' | 'night_owl' | 'flexible' | 'balanced';
  cleanlinessLevel: number; // 1-5
  socialEnergy: number; // 1-5
  workStyle: 'wfh_full' | 'remote' | 'hybrid' | 'office_only' | 'in_office';
  guestPolicy: 'rarely' | 'weekends_only' | 'open' | 'flexible';
  petTolerance: string[];
  smokingTolerance: boolean;
}

export interface Profile {
  id: string;
  userId: string;
  displayName: string;
  headline: string;
  avatarUrl: string;
  bio: string;
  budgetRange: {
    min: number;
    max: number;
    currency: string;
  };
  preferredLocations: string[];
  moveInDate?: string;
  lifestyleDNA?: LifestyleDNA;
  visualTags: string[];
}

export interface SpatialBoundary {
  width: number;
  length: number;
  height: number;
  unit: string;
}

export interface SpatialLayer {
  layerId: string;
  name: string;
  meshIds: string[];
  defaultVisible: boolean;
}

export interface Room {
  id: string;
  title: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    coordinates: [number, number];
  };
  pricing: {
    monthlyRent: number;
    deposit: number;
    utilitiesIncluded: boolean;
  };
  spatialModel?: {
    modelUrl: string;
    dimensions: SpatialBoundary;
    defaultCamera: {
      position: [number, number, number];
      target: [number, number, number];
    };
    layers: SpatialLayer[];
  };
  roommates: {
    userId: string;
    roomAssigned: string;
    leaseEnd: string;
  }[];
  photos: string[];
  status: 'available' | 'reserved' | 'occupied';
}

export interface CompatibilityBreakdown {
  sleepSync: number;
  cleanlinessAlignment: number;
  socialHarmony: number;
  financialFit: number;
}

export interface CompatibilityResult {
  overallScore: number;
  breakdown: CompatibilityBreakdown;
  connectionInsights: string[];
}

export interface Match {
  id: string;
  initiatorId: string;
  targetUserId: string;
  targetProfile?: Profile;
  roomId?: string;
  compatibility: CompatibilityResult;
  status: 'analyzed' | 'revealed' | 'mutual_interest' | 'declined' | 'locked';
  unlockedAt?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  attachments?: string[];
  readBy: string[];
  sentAt: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  context?: {
    roomId?: string;
    matchId?: string;
  };
  lastMessage?: Message;
  updatedAt: string;
}

export interface TrustProfile {
  userId: string;
  verificationTier: 'unverified' | 'id_verified' | 'background_cleared' | 'kinship_certified';
  reputationScore: number; // 0-1000
  verifications: {
    governmentId: { verified: boolean; verifiedAt?: string };
    employmentProof: { verified: boolean; employer?: string; verifiedAt?: string };
    creditConfidence: { tier: string; verifiedAt?: string };
  };
  reviewsCount: number;
}

export interface Review {
  id: string;
  stayId: string;
  authorId: string;
  targetUserId: string;
  stayDurationMonths: number;
  rating: number;
  text: string;
  verifiedResidency: boolean;
  createdAt: string;
}

export interface LivingAgreement {
  id: string;
  roomId: string;
  residents: string[];
  rules: {
    category: string;
    title: string;
    description: string;
    agreedBy: string[];
  }[];
  quietHours: { start: string; end: string };
  status: 'draft' | 'active' | 'terminated';
  signedAt?: string;
}

export interface ExpenseSplit {
  userId: string;
  amountOwed: number;
  isSettled: boolean;
  settledAt?: string;
}

export interface Expense {
  id: string;
  roomId: string;
  payerId: string;
  title: string;
  amount: number;
  category: 'rent' | 'utilities' | 'groceries' | 'supplies' | 'maintenance';
  splits: ExpenseSplit[];
  dueDate: string;
  createdAt: string;
}

export interface SafetyIncident {
  id: string;
  roomId: string;
  reporterId: string;
  type: 'urgent_ping' | 'dispute' | 'maintenance_hazard';
  description: string;
  status: 'open' | 'resolving' | 'closed';
  createdAt: string;
}

export interface Destination {
  id: string;
  city: string;
  country: string;
  availableRoomsCount: number;
  communityCount: number;
  heroImageUrl: string;
}

// API Response Standard Format
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}
