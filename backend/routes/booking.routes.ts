import { Router } from 'express';
import {
  bookRoom,
  cancelBooking,
  getMyBookings,
} from '../controllers/booking.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

// user only
router.post('/:roomId', protect, bookRoom);
router.get('/my-bookings', protect, getMyBookings);
router.put('/cancel/:bookingId', protect, cancelBooking);

export default router;
