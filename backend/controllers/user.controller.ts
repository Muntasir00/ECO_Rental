import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { Session } from '../models/session.model.js';
import { User } from '../models/user.model.js';
import { verifyMail } from '../services/Auth/verifyMail.js';
import { sendOtpMail } from '../services/Auth/sendOtpMail.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../services/Auth/token.service.js';
import RefreshToken from '../models/refreshToken.model.js';

// Register User
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'user',
    });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY!, {
      expiresIn: '10d',
    });

    user.token = token;
    await user.save();

    await verifyMail(token, email);

    res.status(201).json({ message: 'Registered', user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Registration Verification
export const verification = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token is missing or invalid',
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token is missing',
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        return res.status(400).json({
          success: false,
          message: 'The registration token has expired',
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Token verification failed',
      });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.token = null;
    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//  LogIn User
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized access',
      });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(402).json({
        success: false,
        message: 'Incorrect Password',
      });
    }

    if (user.isVerified !== true) {
      return res.status(403).json({
        success: false,
        message: 'Check your email,Verify your account then login',
      });
    }

    const existingSession = await Session.findOne({ userId: user._id });
    if (existingSession) {
      await Session.deleteOne({ userId: user._id });
    }

    await Session.create({ userId: user._id });

    const accessToken = generateAccessToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString());

    const decoded = jwt.decode(refreshToken) as jwt.JwtPayload;

    if (!decoded || !decoded.jti) {
      return res
        .status(500)
        .json({ message: 'Failed to decode refresh token' });
    }

    await RefreshToken.create({
      user: user._id,
      jti: decoded.jti,
    });

    user.isLoggedIn = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.username}`,
      accessToken,
      refreshToken,
      user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout User

export const logoutUser = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = new Types.ObjectId(req.userId);

    await Session.deleteMany({ userId });
    await User.findByIdAndUpdate(userId, { isLoggedIn: false });

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Forgot Password
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();
    await sendOtpMail(email, otp);
    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify OTP for password reset

export const verifyOTP = async (req: Request, res: Response) => {
  const { otp } = req.body;
  const email = req.params.email;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required',
    });
  }

  if (!otp) {
    return res.status(400).json({
      success: false,
      message: 'OTP is required',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: 'OTP not generated or already verified',
      });
    }
    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one',
      });
    }
    if (otp !== user.otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP',
      });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Change Password

export const changePassword = async (req: Request, res: Response) => {
  const { newPassword, confirmPassword } = req.body;
  const email = req.params.email;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required',
    });
  }

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'Password do not match',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Access token generation
export const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  try {
    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as any;

    if (payload.type !== 'refresh') {
      return res.status(401).json({ message: 'Invalid token type' });
    }

    if (!payload.jti) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const storedToken = await RefreshToken.findOne({
      jti: payload.jti,
      isRevoked: false,
    });

    if (!storedToken) {
      return res.status(401).json({ message: 'Refresh token revoked' });
    }

    storedToken.isRevoked = true;
    await storedToken.save();

    const newAccessToken = generateAccessToken(payload.id, payload.role);
    const newRefreshToken = generateRefreshToken(payload.id);

    const decoded = jwt.decode(newRefreshToken) as jwt.JwtPayload | null;

    if (!decoded || !decoded.jti) {
      return res
        .status(500)
        .json({ message: 'Failed to decode refresh token' });
    }

    await RefreshToken.create({
      user: payload.id,
      jti: decoded.jti,
    });

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'Invalid or expired refresh token' });
  }
};
