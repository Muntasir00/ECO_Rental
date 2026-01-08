import { Request, Response } from 'express';
import { getRoomAvailabilityService } from '../services/Room/availability.service.js';
import { connectDB } from '../config/db.js';

export const getRoomAvailability = async (req: Request, res: Response) => {
  await connectDB();

  const { roomId } = req.params;
  const { start, end } = req.query;

  if (!roomId) {
    return res.status(400).json({ message: 'Room ID is required' });
  }

  const data = await getRoomAvailabilityService(
    roomId,
    start as string,
    end as string
  );

  res.json(data);
};
