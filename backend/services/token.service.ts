import jwt, { SignOptions } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const ACCESS_EXPIRE: SignOptions['expiresIn'] = process.env
  .ACCESS_TOKEN_EXPIRE as SignOptions['expiresIn'];

const REFRESH_EXPIRE: SignOptions['expiresIn'] = process.env
  .REFRESH_TOKEN_EXPIRE as SignOptions['expiresIn'];

export const generateAccessToken = (userId: string) => {
  const access_secret = process.env.JWT_ACCESS_SECRET;
  if (!access_secret) throw new Error('JWT_ACCESS_SECRET not set');

  const expiresIn = ACCESS_EXPIRE ?? '1h';

  return jwt.sign(
    {
      id: userId,
      type: 'access',
    },
    access_secret,
    { expiresIn }
  );
};

export const generateRefreshToken = (userId: string) => {
  const refresh_secret = process.env.JWT_REFRESH_SECRET;
  if (!refresh_secret) throw new Error('JWT_REFRESH_SECRET not set');

  const expiresIn = REFRESH_EXPIRE ?? '7d';

  return jwt.sign(
    {
      id: userId,
      type: 'refresh',
      jti: uuidv4(),
    },
    refresh_secret,
    { expiresIn }
  );
};
