import appleSigninAuth from 'apple-signin-auth';
import { connectDB } from '../config/db.js';
import { User } from '../models/user.model.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../services/Auth/token.service.js';
import { Request, Response } from 'express';

export const appleLogin = async (req: Request, res: Response) => {
  await connectDB();
  try {
    const { idToken } = req.body;

    const applePayload = await appleSigninAuth.verifyIdToken(idToken, {
      audience: process.env.APPLE_CLIENT_ID,
      ignoreExpiration: false,
    });

    const email = applePayload.email;
    const appleId = applePayload.sub;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        username: email.split('@')[0] || email,
        email,
        provider: 'apple',
        providerId: appleId,
        isVerified: true,
      });
    }

    const accessToken = generateAccessToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString());

    res.json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Apple token' });
  }
};
