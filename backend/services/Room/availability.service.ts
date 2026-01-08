import { Booking } from '../../models/booking.model.js';
import { Room } from '../../models/room.model.js';

export const getRoomAvailabilityService = async (
  roomId: string,
  startDate?: string,
  endDate?: string
) => {
  const room = await Room.findById(roomId);

  if (!room) {
    throw new Error('Room not found');
  }

  if (!startDate || !endDate) {
    return {
      roomId,
      totalRooms: room.availableRooms,
      totalGuests: room.guest,
      availableRooms: room.availableRooms,
      isAvailable: room.availableRooms > 0,
      bookings: [],
    };
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  // overlapping bookings
  const bookings = await Booking.find({
    room: roomId,
    status: 'ongoing',
    checkIn: { $lt: end },
    checkOut: { $gt: start },
  }).select('checkIn checkOut roomsBooked');

  const totalBookedRooms = bookings.reduce((sum, b) => sum + b.roomsBooked, 0);

  const availableRooms = Math.max(room.availableRooms - totalBookedRooms, 0);

  return {
    roomId,
    totalRooms: room.availableRooms,
    totalGuests: room.guest,
    bookedRooms: totalBookedRooms,
    availableRooms,
    isAvailable: availableRooms > 0,
    bookings: bookings.map(b => ({
      start: b.checkIn,
      end: b.checkOut,
      roomsBooked: b.roomsBooked,
      status: 'booked',
    })),
  };
};
