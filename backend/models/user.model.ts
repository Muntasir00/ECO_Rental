import mongoose, { Document } from 'mongoose';
export type UserRole = 'admin' | 'user';
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  isVerified: boolean;
  isLoggedIn: boolean;
  token: string | null;
  accessToken: string | null;
  otp: string | null;
  otpExpiry: Date | null;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },

    isVerified: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    token: { type: String, default: null },
    accessToken: { type: String, default: null },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
