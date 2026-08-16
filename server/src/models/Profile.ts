import mongoose, { Schema, Document } from 'mongoose';

export interface ILifestyleDNA {
  chronotype: 'early_bird' | 'night_owl' | 'flexible';
  cleanlinessLevel: number; // 1-5
  socialEnergy: number; // 1-5
  workStyle: 'wfh_full' | 'hybrid' | 'office_only';
  guestPolicy: 'rarely' | 'weekends_only' | 'open';
  petTolerance: string[];
  smokingTolerance: boolean;
}

export const LifestyleDNASchema = new Schema<ILifestyleDNA>(
  {
    chronotype: { type: String, enum: ['early_bird', 'night_owl', 'flexible'], default: 'flexible' },
    cleanlinessLevel: { type: Number, min: 1, max: 5, default: 3 },
    socialEnergy: { type: Number, min: 1, max: 5, default: 3 },
    workStyle: { type: String, enum: ['wfh_full', 'hybrid', 'office_only'], default: 'hybrid' },
    guestPolicy: { type: String, enum: ['rarely', 'weekends_only', 'open'], default: 'weekends_only' },
    petTolerance: [{ type: String }],
    smokingTolerance: { type: Boolean, default: false },
  },
  { _id: false }
);

export interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;
  displayName: string;
  headline: string;
  avatarUrl: string;
  bio: string;
  budgetRange: { min: number; max: number; currency: string };
  preferredLocations: string[];
  moveInDate?: Date;
  lifestyleDNA?: ILifestyleDNA;
  visualTags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    displayName: { type: String, default: '' },
    headline: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    bio: { type: String, default: '' },
    budgetRange: {
      min: { type: Number, default: 1000 },
      max: { type: Number, default: 3000 },
      currency: { type: String, default: 'USD' },
    },
    preferredLocations: [{ type: String }],
    moveInDate: { type: Date },
    lifestyleDNA: { type: LifestyleDNASchema },
    visualTags: [{ type: String }],
  },
  { timestamps: true }
);

export const ProfileModel = mongoose.model<IProfile>('Profile', ProfileSchema);
export default ProfileModel;
