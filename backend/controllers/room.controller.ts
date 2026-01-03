import { Request, Response } from 'express';
import {
  createRoomService,
  getAvailableRoomsService,
  getRoomByIdService,
  searchRoomsService,
} from '../services/Room/room.service.js';

export const createRoom = async (req: Request, res: Response) => {
  const room = await createRoomService(req.body);
  res.status(201).json(room);
};

export const getRooms = async (req: Request, res: Response) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);

  const data = await getAvailableRoomsService(page, limit);
  res.json(data);
};

export const getRoomById = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'Room ID is required' });
  }
  const room = await getRoomByIdService(req.params.id);
  res.json(room);
};

export const searchRooms = async (req: Request, res: Response) => {
  const rooms = await searchRoomsService(req.query);
  res.json(rooms);
};
