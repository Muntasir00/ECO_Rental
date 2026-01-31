import { OAuth2Client } from 'google-auth-library';
import { Request, Response } from 'express';
import { connectDB } from '../config/db.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../services/Auth/token.service.js';
import { User } from '../models/user.model.js';
import { Profile } from '../models/profile.model.js';

interface GoogleAuthBody {
  idToken: string;
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
if (!GOOGLE_CLIENT_ID) {
  throw new Error('GOOGLE_CLIENT_ID is not defined');
}

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

export const googleLogin = async (
  req: Request<{}, {}, GoogleAuthBody>,
  res: Response,
) => {
  await connectDB();

  try {
    const { idToken } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email) {
      return res.status(400).json({ message: 'Invalid Google token' });
    }

    const email = payload.email!;

    const googleName =
      typeof payload.name === 'string' ? payload.name.trim() : '';
    // @ts-ignore
    const username: string =
      googleName.length > 0 ? googleName : email.split('@')[0];

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        username,
        email: payload.email,
        provider: 'google',
        providerId: payload.sub!,
        isVerified: true,
      });

      await Profile.create({
        user: user._id,
        fullName: username,
      });
    }

    const accessToken = generateAccessToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString());

    return res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
