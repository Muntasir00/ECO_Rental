export type UserType = Record<string, any> | null;

export type AuthState = {
  user: UserType;
  loading: boolean;
};

export type AuthContextValue = {
  user: UserType | null;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  checkUserSession?: () => Promise<void>;
  initSession?: (userData: any, accessToken: string) => void;
};

// 1. The Core User Object
export interface User {
  _id: string;
  username: string;
  email: string;
  role: string; // You can change to 'user' | 'admin' if you have fixed roles
  isVerified: boolean;
  isLoggedIn: boolean;
  token: string | null;
  accessToken: string | null;
  otp: string | null;
  otpExpiry: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// 2. The Profile Object
export interface UserProfile {
  _id: string;
  user: string; // This refers to the User _id
  fullName: string;
  phoneNumber: string;
  address: string;
  identityType: string;
  identityFile: string;
  profileImage: string;
  emergencyContact: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// 3. The Main API Response
export interface ProfileApiResponse {
  success: boolean;
  user: User;
  profile: UserProfile;
}
