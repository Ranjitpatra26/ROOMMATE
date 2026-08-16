import mongoose, { Schema, Document } from 'mongoose';

export interface IMatch extends Document {
  initiatorId: mongoose.Types.ObjectId;
  targetUserId: mongoose.Types.ObjectId;
  roomId?: mongoose.Types.ObjectId;
  overallScore: number;
  breakdown: {
    sleepSync: number;
    cleanlinessAlignment: number;
    socialHarmony: number;
    financialFit: number;
  };
  connectionInsights: string[];
  status: 'analyzed' | 'revealed' | 'mutual_interest' | 'declined' | 'locked';
  unlockedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MatchSchema = new Schema<IMatch>(
  {
    initiatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    targetUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    roomId: { type: Schema.Types.ObjectId, ref: 'Room' },
    overallScore: { type: Number, required: true, min: 0, max: 100 },
    breakdown: {
      sleepSync: { type: Number, default: 85 },
      cleanlinessAlignment: { type: Number, default: 90 },
      socialHarmony: { type: Number, default: 95 },
      financialFit: { type: Number, default: 92 },
    },
    connectionInsights: [{ type: String }],
    status: {
      type: String,
      enum: ['analyzed', 'revealed', 'mutual_interest', 'declined', 'locked'],
      default: 'analyzed',
    },
    unlockedAt: { type: Date },
  },
  { timestamps: true }
);

export const MatchModel = mongoose.model<IMatch>('Match', MatchSchema);
export default MatchModel;
