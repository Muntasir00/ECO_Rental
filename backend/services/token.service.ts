import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId: string) =>
  jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
  });

export const generateRefreshToken = (userId: string) =>
  jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
  });
