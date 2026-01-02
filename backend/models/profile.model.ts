import mongoose, { Document, Schema } from 'mongoose';

export interface IProfile extends Document {
  user: mongoose.Types.ObjectId;
  fullName?: string;
  phoneNumber?: string;
  address?: string;
  identityType?: 'NID' | 'PASSPORT';
  identityFile?: string;
  profileImage?: string;
  emergencyContact?: string;
}

const profileSchema = new Schema<IProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    fullName: String,
    phoneNumber: String,
    address: String,
    identityType: {
      type: String,
      enum: ['NID', 'PASSPORT'],
    },
    identityFile: String,
    profileImage: String,
    emergencyContact: String,
  },
  { timestamps: true }
);

export const Profile = mongoose.model<IProfile>('Profile', profileSchema);
