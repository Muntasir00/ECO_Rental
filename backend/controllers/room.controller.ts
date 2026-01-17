import { Request, Response } from 'express';
import {
  createRoomService,
  deleteRoomService,
  getAvailableRoomsService,
  getRoomByIdService,
  searchRoomsService,
  updateRoomService,
} from '../services/Room/room.service.js';
import { connectDB } from '../config/db.js';

export const createRoom = async (req: Request, res: Response) => {
  await connectDB();
  const room = await createRoomService(
    req.body,
    req.files as Express.Multer.File[]
  );
  res.status(201).json({
    success: true,
    message: 'Room created successfully',
    room,
  });
};

export const getRooms = async (req: Request, res: Response) => {
  await connectDB();
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);

  const data = await getAvailableRoomsService(page, limit);
  res.json(data);
};

export const getRoomById = async (req: Request, res: Response) => {
  await connectDB();
  if (!req.params.id) {
    return res.status(400).json({ message: 'Room ID is required' });
  }
  const room = await getRoomByIdService(req.params.id);
  res.json(room);
};

export const searchRooms = async (req: Request, res: Response) => {
  await connectDB();
  const rooms = await searchRoomsService(req.query);
  res.json(rooms);
};

export const updateRoom = async (req: Request, res: Response) => {
  await connectDB();

  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Room ID is required' });
  }

  const room = await updateRoomService(
    id,
    req.body,
    req.files as Express.Multer.File[]
  );

  res.json({
    success: true,
    message: 'Room updated successfully',
    room,
  });
};

export const deleteRoom = async (req: Request, res: Response) => {
  await connectDB();

  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Room ID is required' });
  }

  await deleteRoomService(id);

  res.json({
    success: true,
    message: 'Room deleted successfully',
  });
};
