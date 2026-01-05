import mongoose, { Document, Schema } from 'mongoose';

export interface IRoom extends Document {
  name: string;
  location: string;
  size: number;
  bedroom: number;
  bathroom: number;
  balcony: boolean;
  availableRooms: number;
  pricePerNight: number;
  guest: number;
  available: boolean;
  images: {
    url: string;
    publicId: string;
  }[];
}

const roomSchema = new Schema<IRoom>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },

    size: { type: Number, required: true },
    bedroom: { type: Number, required: true },
    bathroom: { type: Number, required: true },
    balcony: { type: Boolean, default: false },

    availableRooms: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    available: { type: Boolean, default: true },
    guest: { type: Number, required: true },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

// indexes
roomSchema.index({ location: 1 });
roomSchema.index({ bedroom: 1 });
roomSchema.index({ location: 1, bedroom: 1 });
roomSchema.index({ pricePerNight: 1 });

export const Room = mongoose.model<IRoom>('Room', roomSchema);
