import { Request, Response } from 'express';
import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  searchUsersService,
} from '../services/UserManagement/user.management.service.js';

export const createUser = async (req: Request, res: Response) => {
  const user = await createUserService(req.body);
  res.status(201).json({ message: 'User created', user });
};

export const getUsers = async (req: Request, res: Response) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);

  const data = await getAllUsersService(page, limit);
  res.json(data);
};

export const getUserById = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  const user = await getUserByIdService(req.params.id);
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  const user = await updateUserService(req.params.id, req.body);
  res.json({ message: 'User updated', user });
};

export const deleteUser = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  await deleteUserService(req.params.id);
  res.json({ message: 'User deleted successfully' });
};

export const searchUsers = async (req: Request, res: Response) => {
  const { keyword, role, isVerified, page = '1', limit = '10' } = req.query;

  const data = await searchUsersService({
    keyword: keyword as string,
    role: role as 'admin' | 'user',
    ...(isVerified !== undefined && {
      isVerified: isVerified === 'true',
    }),
    page: Number(page),
    limit: Number(limit),
  });

  res.json(data);
};
