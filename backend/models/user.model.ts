import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  refreshToken?: string | null;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    refreshToken: { type: String, default: null },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
