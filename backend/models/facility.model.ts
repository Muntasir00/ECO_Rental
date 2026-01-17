import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IFacility extends Document {
  room: Types.ObjectId;
  facilityType: string;
  facilityList: {
    name: string;
    description?: string;
  }[];
  facilityDetails?: string;
}

const facilitySchema = new Schema<IFacility>(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
      unique: true,
    },
    facilityType: {
      type: String,
      required: true,
    },
    facilityList: [
      {
        name: { type: String, required: true },
        description: { type: String },
      },
    ],
    facilityDetails: {
      type: String,
    },
  },
  { timestamps: true }
);

// Indexes
facilitySchema.index({ room: 1 });
facilitySchema.index({ facilityType: 1 });

export const Facility = mongoose.model<IFacility>('Facility', facilitySchema);
