import jwt, { SignOptions } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'fallback_secret';

export const generateToken = (payload: any, expiresIn: SignOptions['expiresIn'] = '7d') => {
  return jwt.sign(payload, SECRET, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
};
