import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { verifyMail } from '../services/verifyMail';

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
    });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY!, {
      expiresIn: '10d',
    });

    user.token = token;
    await user.save();

    await verifyMail(token, email);

    res.status(201).json({ message: 'Registered', user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
