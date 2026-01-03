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
  available: boolean;
}

const roomSchema = new Schema<IRoom>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true, index: true },

    size: { type: Number, required: true },
    bedroom: { type: Number, required: true },
    bathroom: { type: Number, required: true },
    balcony: { type: Boolean, default: false },

    availableRooms: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);
roomSchema.index({ location: 1 });
roomSchema.index({ bedroom: 1 });
roomSchema.index({ location: 1, bedroom: 1 }); // compound index
roomSchema.index({ pricePerNight: 1 });

export const Room = mongoose.model<IRoom>('Room', roomSchema);
