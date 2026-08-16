import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
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
    dimensions: { width: number; length: number; height: number; unit: string };
    defaultCamera: { position: [number, number, number]; target: [number, number, number] };
    layers: { layerId: string; name: string; meshIds: string[]; defaultVisible: boolean }[];
  };
  roommates: {
    userId: mongoose.Types.ObjectId;
    roomAssigned: string;
    leaseEnd: Date;
  }[];
  photos: string[];
  status: 'available' | 'reserved' | 'occupied';
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema = new Schema<IRoom>(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    address: {
      street: { type: String, default: '' },
      city: { type: String, default: 'New York', index: true },
      state: { type: String, default: 'NY' },
      coordinates: { type: [Number], default: [-73.9851, 40.7488] },
    },
    pricing: {
      monthlyRent: { type: Number, required: true },
      deposit: { type: Number, default: 0 },
      utilitiesIncluded: { type: Boolean, default: false },
    },
    spatialModel: {
      modelUrl: { type: String, default: '/models/default_room.glb' },
      dimensions: {
        width: { type: Number, default: 14 },
        length: { type: Number, default: 18 },
        height: { type: Number, default: 9 },
        unit: { type: String, default: 'ft' },
      },
      defaultCamera: {
        position: { type: [Number], default: [0, 6, 9] },
        target: { type: [Number], default: [0, 0, 0] },
      },
      layers: [
        {
          layerId: { type: String },
          name: { type: String },
          meshIds: [{ type: String }],
          defaultVisible: { type: Boolean, default: true },
        },
      ],
    },
    roommates: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        roomAssigned: { type: String },
        leaseEnd: { type: Date },
      },
    ],
    photos: [{ type: String }],
    status: { type: String, enum: ['available', 'reserved', 'occupied'], default: 'available' },
  },
  { timestamps: true }
);

export const RoomModel = mongoose.model<IRoom>('Room', RoomSchema);
export default RoomModel;
