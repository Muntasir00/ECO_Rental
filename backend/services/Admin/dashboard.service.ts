import { Booking } from '../../models/booking.model.js';
import { Room } from '../../models/room.model.js';
import { startOfWeek, prevWeekStart, prevWeekEnd } from '../../utils/date.js';
import { trend } from '../../utils/trend.js';

export const getDashboardOverviewService = async () => {
  // ------------------------
  // TOTAL BOOKINGS
  // ------------------------
  const totalBookings = await Booking.countDocuments();

  // ------------------------
  // NEW BOOKINGS (TREND)
  // ------------------------
  const currentWeekBookings = await Booking.countDocuments({
    createdAt: { $gte: startOfWeek },
  });

  const prevWeekBookings = await Booking.countDocuments({
    createdAt: { $gte: prevWeekStart, $lt: prevWeekEnd },
  });

  // ------------------------
  // TOTAL REVENUE
  // ------------------------
  const revenueAgg = await Booking.aggregate([
    { $match: { status: { $in: ['ongoing', 'completed'] } } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } },
  ]);

  const totalRevenue = revenueAgg[0]?.total || 0;

  // ------------------------
  // CHECK-IN / CHECK-OUT
  // ------------------------
  const totalCheckIn = await Booking.countDocuments({
    checkIn: { $gte: startOfWeek },
  });

  const totalCheckOut = await Booking.countDocuments({
    checkOut: { $gte: startOfWeek },
  });

  // ------------------------
  // ROOMS AVAILABLE
  // ------------------------
  const roomsAgg = await Room.aggregate([
    { $group: { _id: null, total: { $sum: '$availableRooms' } } },
  ]);

  const roomsAvailable = roomsAgg[0]?.total || 0;

  //   ------------------------
  // BOOKINGS BY MONTH (CHART)
  // ------------------------

  const bookingsByMonthAgg = await Booking.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        totalBookings: { $sum: 1 },
      },
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 },
    },
  ]);

  // ------------------------
  // REVENUE BY MONTH (CHART)
  // ------------------------
  const revenueByMonth = await Booking.aggregate([
    { $match: { status: { $in: ['ongoing', 'completed'] } } },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        revenue: { $sum: '$totalPrice' },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const revenueChart = {
    labels: revenueByMonth.map(
      i => `${monthNames[i._id.month - 1]} ${i._id.year}`,
    ),
    data: revenueByMonth.map(i => i.revenue),
  };

  const bookingsByMonthChart = {
    labels: bookingsByMonthAgg.map(
      i => `${monthNames[i._id.month - 1]} ${i._id.year}`,
    ),
    data: bookingsByMonthAgg.map(i => i.totalBookings),
  };

  // ------------------------
  // FINAL RESPONSE (REACT READY)
  // ------------------------
  return {
    cards: [
      {
        key: 'totalBookings',
        title: 'Total Bookings',
        value: totalBookings,
      },
      {
        key: 'roomsAvailable',
        title: 'Rooms Available',
        value: roomsAvailable,
      },
      {
        key: 'newBookings',
        title: 'New Bookings',
        value: currentWeekBookings,
        ...trend(currentWeekBookings, prevWeekBookings),
      },
      {
        key: 'checkIn',
        title: 'Check-ins',
        value: totalCheckIn,
      },
      {
        key: 'checkOut',
        title: 'Check-outs',
        value: totalCheckOut,
      },
      {
        key: 'revenue',
        title: 'Total Revenue',
        value: totalRevenue,
      },
    ],
    charts: {
      revenueByMonth: revenueChart,
      bookingsByMonth: bookingsByMonthChart,
    },
  };
};
