import { Request, Response } from 'express';
import { getRoomAvailabilityService } from '../services/Room/availability.service.js';

export const getRoomAvailability = async (req: Request, res: Response) => {
  if (!req.params.roomId) {
    return res.status(400).json({ message: 'Room ID is required' });
  }
  const data: any = await getRoomAvailabilityService(
    req.params.roomId,
    req.query.start as string,
    req.query.end as string
  );

  res.json(data);
};
