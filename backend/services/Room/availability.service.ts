import { Booking } from '../../models/booking.model.js';

export const getRoomAvailabilityService = async (
  roomId: string,
  startDate?: string,
  endDate?: string
) => {
  const filter: any = {
    room: roomId,
    status: 'ongoing',
  };

  if (startDate && endDate) {
    filter.$or = [
      {
        checkIn: { $lte: new Date(endDate) },
        checkOut: { $gte: new Date(startDate) },
      },
    ];
  }

  const bookings = await Booking.find(filter).select('checkIn checkOut status');

  return bookings.map(b => ({
    start: b.checkIn,
    end: b.checkOut,
    status: 'booked',
  }));
};
