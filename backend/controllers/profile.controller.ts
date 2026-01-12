import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary.js';
import { Profile } from '../models/profile.model.js';
import { Types } from 'mongoose';
import { User } from '../models/user.model.js';
import { connectDB } from '../config/db.js';

export const getMe = async (req: Request, res: Response) => {
  await connectDB();
  const user = await User.findById(req.userId).select('-password');

  const profile = await Profile.findOne({
    user: new Types.ObjectId(req.userId),
  });

  return res.json({
    success: true,
    user,
    profile,
  });
};

// Update profile controller
export const updateProfile = async (req: Request, res: Response) => {
  await connectDB();
  try {
    const { fullName, phoneNumber, address, identityType, emergencyContact } =
      req.body;

    const files = req.files as {
      [key: string]: Express.Multer.File[];
    };

    const profileImage = files?.profileImage?.[0];
    const identityFile = files?.identityFile?.[0];

    let profileImageUrl, identityFileUrl;

    // Upload from buffer (like blog)
    if (profileImage) {
      const upload = await cloudinary.uploader.upload(
        `data:${profileImage.mimetype};base64,${profileImage.buffer.toString(
          'base64'
        )}`
      );
      profileImageUrl = upload.secure_url;
    }

    if (identityFile) {
      const upload = await cloudinary.uploader.upload(
        `data:${identityFile.mimetype};base64,${identityFile.buffer.toString(
          'base64'
        )}`
      );
      identityFileUrl = upload.secure_url;
    }

    const profile = await Profile.findOneAndUpdate(
      { user: new Types.ObjectId(req.userId) },
      {
        fullName,
        phoneNumber,
        address,
        identityType,
        emergencyContact,
        ...(profileImageUrl && { profileImage: profileImageUrl }),
        ...(identityFileUrl && { identityFile: identityFileUrl }),
      },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Profile update failed' });
  }
};
