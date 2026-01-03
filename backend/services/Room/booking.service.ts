import { Booking } from '../../models/booking.model.js';
import { Room } from '../../models/room.model.js';
import { Profile } from '../../models/profile.model.js';
import mongoose from 'mongoose';

export const createBookingService = async (
  userId: string,
  roomId: string,
  payload: any
) => {
  const { checkIn, checkOut, roomsBooked, name, email, phoneNumber } = payload;

  if (!roomsBooked || roomsBooked <= 0) {
    throw new Error('roomsBooked must be greater than 0');
  }

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  if (end <= start) {
    throw new Error('Invalid check-in/check-out dates');
  }

  const nights = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

  // atomic availability update
  const room = await Room.findOneAndUpdate(
    { _id: roomId, availableRooms: { $gte: roomsBooked } },
    { $inc: { availableRooms: -roomsBooked } },
    { new: true }
  );

  if (!room) {
    throw new Error('Not enough rooms available');
  }

  const totalPrice = nights * room.pricePerNight * roomsBooked;

  const booking = await Booking.create({
    user: userId,
    room: room._id,
    roomsBooked,
    name,
    email,
    phoneNumber,
    checkIn: start,
    checkOut: end,
    totalPrice,
  });

  // update available flag
  room.available = room.availableRooms > 0;
  await room.save();

  return booking;
};

export const getUserBookingsService = (userId: string, type?: string) => {
  const query: any = { user: userId };

  if (type === 'past') query.status = 'completed';
  if (type === 'ongoing') query.status = 'ongoing';

  return Booking.find(query).populate('room');
};

export const cancelBookingService = async (
  bookingId: string,
  userId: string
) => {
  const booking = await Booking.findOne({
    _id: bookingId,
    user: userId,
    status: 'ongoing',
  });

  if (!booking) {
    throw new Error('Cannot cancel booking');
  }

  booking.status = 'cancelled';
  await booking.save();

  const room = await Room.findByIdAndUpdate(
    booking.room,
    { $inc: { availableRooms: booking.roomsBooked } },
    { new: true }
  );

  if (room) {
    room.available = room.availableRooms > 0;
    await room.save();
  }

  return booking;
};
