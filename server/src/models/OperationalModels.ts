import mongoose, { Schema, Document } from 'mongoose';

// Trust Profile Model
export interface ITrustProfile extends Document {
  userId: mongoose.Types.ObjectId;
  verificationTier: 'unverified' | 'id_verified' | 'background_cleared' | 'kinship_certified';
  reputationScore: number;
  verifications: {
    governmentId: { verified: boolean; verifiedAt?: Date };
    employmentProof: { verified: boolean; employer?: string; verifiedAt?: Date };
    creditConfidence: { tier: string; verifiedAt?: Date };
  };
}

const TrustProfileSchema = new Schema<ITrustProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    verificationTier: {
      type: String,
      enum: ['unverified', 'id_verified', 'background_cleared', 'kinship_certified'],
      default: 'unverified',
    },
    reputationScore: { type: Number, default: 750 },
    verifications: {
      governmentId: { verified: { type: Boolean, default: false }, verifiedAt: Date },
      employmentProof: { verified: { type: Boolean, default: false }, employer: String, verifiedAt: Date },
      creditConfidence: { tier: { type: String, default: 'Unchecked' }, verifiedAt: Date },
    },
  },
  { timestamps: true }
);

export const TrustProfileModel = mongoose.model<ITrustProfile>('TrustProfile', TrustProfileSchema);

// Conversation & Message Models
export interface IMessage extends Document {
  conversationId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  content: string;
  attachments: string[];
  readBy: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true, index: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    attachments: [{ type: String }],
    readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);

export interface IConversation extends Document {
  participants: mongoose.Types.ObjectId[];
  context?: {
    roomId?: mongoose.Types.ObjectId;
    matchId?: mongoose.Types.ObjectId;
  };
  lastMessageAt: Date;
}

const ConversationSchema = new Schema<IConversation>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', index: true }],
    context: {
      roomId: { type: Schema.Types.ObjectId, ref: 'Room' },
      matchId: { type: Schema.Types.ObjectId, ref: 'Match' },
    },
    lastMessageAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const ConversationModel = mongoose.model<IConversation>('Conversation', ConversationSchema);

// Living Agreement Model
export interface ILivingAgreement extends Document {
  roomId: mongoose.Types.ObjectId;
  residents: mongoose.Types.ObjectId[];
  rules: {
    category: string;
    title: string;
    description: string;
    agreedBy: mongoose.Types.ObjectId[];
  }[];
  quietHours: { start: string; end: string };
  status: 'draft' | 'active' | 'terminated';
  signedAt?: Date;
}

const LivingAgreementSchema = new Schema<ILivingAgreement>(
  {
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    residents: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    rules: [
      {
        category: { type: String },
        title: { type: String },
        description: { type: String },
        agreedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      },
    ],
    quietHours: {
      start: { type: String, default: '22:00' },
      end: { type: String, default: '08:00' },
    },
    status: { type: String, enum: ['draft', 'active', 'terminated'], default: 'draft' },
    signedAt: { type: Date },
  },
  { timestamps: true }
);

export const LivingAgreementModel = mongoose.model<ILivingAgreement>('LivingAgreement', LivingAgreementSchema);

// Expense Model
export interface IExpense extends Document {
  roomId: mongoose.Types.ObjectId;
  payerId: mongoose.Types.ObjectId;
  title: string;
  amount: number;
  category: 'rent' | 'utilities' | 'groceries' | 'supplies' | 'maintenance';
  splits: {
    userId: mongoose.Types.ObjectId;
    amountOwed: number;
    isSettled: boolean;
    settledAt?: Date;
  }[];
  dueDate: Date;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true, index: true },
    payerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: {
      type: String,
      enum: ['rent', 'utilities', 'groceries', 'supplies', 'maintenance'],
      default: 'utilities',
    },
    splits: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        amountOwed: { type: Number, required: true },
        isSettled: { type: Boolean, default: false },
        settledAt: { type: Date },
      },
    ],
    dueDate: { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
  },
  { timestamps: true }
);

export const ExpenseModel = mongoose.model<IExpense>('Expense', ExpenseSchema);

// Destination Model for Travel
export interface IDestination extends Document {
  city: string;
  country: string;
  availableRoomsCount: number;
  communityCount: number;
  heroImageUrl: string;
}

const DestinationSchema = new Schema<IDestination>(
  {
    city: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    availableRoomsCount: { type: Number, default: 0 },
    communityCount: { type: Number, default: 0 },
    heroImageUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export const DestinationModel = mongoose.model<IDestination>('Destination', DestinationSchema);

// Stay Model (Verified Cohabitation Basis)
export interface IStay extends Document {
  roomId: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  startDate: Date;
  endDate: Date;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled' | 'disputed';
  completedAt?: Date;
  verified: boolean;
  agreementId?: mongoose.Types.ObjectId;
}

const StaySchema = new Schema<IStay>(
  {
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true, index: true },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', index: true }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['scheduled', 'active', 'completed', 'cancelled', 'disputed'],
      default: 'scheduled',
      index: true,
    },
    completedAt: { type: Date },
    verified: { type: Boolean, default: false },
    agreementId: { type: Schema.Types.ObjectId, ref: 'LivingAgreement' },
  },
  { timestamps: true }
);

export const StayModel = mongoose.model<IStay>('Stay', StaySchema);

// Review Model (Verified Experience Feedback)
export interface IReview extends Document {
  reviewerId: mongoose.Types.ObjectId;
  revieweeId: mongoose.Types.ObjectId;
  stayId: mongoose.Types.ObjectId;
  roomId: mongoose.Types.ObjectId;
  overallRating: number;
  cleanlinessRating: number;
  communicationRating: number;
  respectRating: number;
  noiseRating: number;
  comment: string;
  verifiedStay: boolean;
  reported: boolean;
  status: 'pending' | 'approved' | 'hidden';
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    reviewerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    revieweeId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    stayId: { type: Schema.Types.ObjectId, ref: 'Stay', required: true, index: true },
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    overallRating: { type: Number, required: true, min: 1, max: 5 },
    cleanlinessRating: { type: Number, default: 5, min: 1, max: 5 },
    communicationRating: { type: Number, default: 5, min: 1, max: 5 },
    respectRating: { type: Number, default: 5, min: 1, max: 5 },
    noiseRating: { type: Number, default: 5, min: 1, max: 5 },
    comment: { type: String, required: true },
    verifiedStay: { type: Boolean, default: true },
    reported: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'approved', 'hidden'], default: 'approved' },
  },
  { timestamps: true }
);

export const ReviewModel = mongoose.model<IReview>('Review', ReviewSchema);
