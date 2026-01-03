import { Request, Response } from 'express';
import {
  cancelBookingService,
  createBookingService,
  getUserBookingsService,
} from '../services/Room/booking.service.js';

export const bookRoom = async (req: Request, res: Response) => {
  if (!req.params.roomId) {
    return res.status(400).json({ message: 'Room ID is required' });
  }
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const booking = await createBookingService(
    req.userId,
    req.params.roomId,
    req.body
  );

  res.status(201).json(booking);
};

export const getMyBookings = async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const bookings = await getUserBookingsService(
    req.userId,
    req.query.type as string
  );
  res.json(bookings);
};

export const cancelBooking = async (req: Request, res: Response) => {
  if (!req.params.bookingId) {
    return res.status(400).json({ message: 'Booking ID is required' });
  }
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const booking = await cancelBookingService(req.params.bookingId, req.userId);
  res.json(booking);
};
