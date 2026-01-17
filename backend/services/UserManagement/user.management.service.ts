import { IUser, User } from '../../models/user.model.js';
interface SearchUserParams {
  keyword?: string;
  role?: 'admin' | 'user';
  isVerified?: boolean;
  page?: number;
  limit?: number;
}

export const createUserService = async (data: Partial<IUser>) => {
  const user = await User.create(data);
  return user;
};

export const getAllUsersService = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find()
      .select('-password -otp -otpExpiry')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    User.countDocuments(),
  ]);

  return {
    users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getUserByIdService = async (id: string) => {
  const user = await User.findById(id).select('-password -otp -otpExpiry');
  if (!user) throw new Error('User not found');
  return user;
};

export const updateUserService = async (id: string, data: Partial<IUser>) => {
  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).select('-password -otp -otpExpiry');

  if (!user) throw new Error('User not found');
  return user;
};

export const deleteUserService = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error('User not found');
  return true;
};

export const searchUsersService = async ({
  keyword,
  role,
  isVerified,
  page = 1,
  limit = 10,
}: SearchUserParams) => {
  const skip = (page - 1) * limit;

  const query: any = {};

  if (keyword) {
    query.$or = [
      { username: { $regex: keyword, $options: 'i' } },
      { email: { $regex: keyword, $options: 'i' } },
    ];
  }

  if (role) {
    query.role = role;
  }

  if (typeof isVerified === 'boolean') {
    query.isVerified = isVerified;
  }

  const [users, total] = await Promise.all([
    User.find(query)
      .select('-password -otp -otpExpiry')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),

    User.countDocuments(query),
  ]);

  return {
    users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
