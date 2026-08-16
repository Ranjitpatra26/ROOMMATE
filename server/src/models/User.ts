import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  role: 'member' | 'host' | 'verified_resident';
  status: 'active' | 'onboarding' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['member', 'host', 'verified_resident'], default: 'member' },
    status: { type: String, enum: ['active', 'onboarding', 'suspended'], default: 'onboarding' },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;
