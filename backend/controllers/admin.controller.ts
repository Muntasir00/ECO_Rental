import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { connectDB } from '../config/db.js';

export const createAdmin = async (req: Request, res: Response) => {
  await connectDB();
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({
      message: 'Admin with this email already exists',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const adminUser = await User.create({
    username,
    email,
    password: hashedPassword,
    role: 'admin',
    isVerified: true,
  });

  return res.status(201).json({
    successs: true,
    message: 'Admin user created successfully',
    adminUser,
  });
};
