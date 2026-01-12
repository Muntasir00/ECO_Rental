import { Request, Response } from 'express';
import {
  cancelBookingService,
  createBookingService,
  getUserBookingsService,
} from '../services/Room/booking.service.js';
import { connectDB } from '../config/db.js';
import { sendBookingEmail } from '../services/Room/bookingMail.js';
import { Room } from '../models/room.model.js';

export const bookRoom = async (req: Request, res: Response) => {
  await connectDB();
  if (!req.params.roomId) {
    return res.status(400).json({ message: 'Room ID is required' });
  }
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const { booking, pricing } = await createBookingService(
      req.userId,
      req.params.roomId,
      req.body
    );

    // Fetch room info to send in email
    const room = await Room.findById(req.params.roomId);

    // Send booking confirmation email
    await sendBookingEmail(booking, room);

    res.status(201).json({
      booking,
      pricing,
      message: 'Booking successful, confirmation email sent!',
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyBookings = async (req: Request, res: Response) => {
  await connectDB();
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
  await connectDB();
  if (!req.params.bookingId) {
    return res.status(400).json({ message: 'Booking ID is required' });
  }
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const booking = await cancelBookingService(req.params.bookingId, req.userId);
  res.json(booking);
};
