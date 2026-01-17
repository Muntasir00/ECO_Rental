import { Router } from 'express';
import {
  bookRoom,
  cancelBooking,
  getBookings,
  getMyBookings,
} from '../controllers/booking.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';

const router = Router();

// user only
router.post('/:roomId', protect, bookRoom);
router.get('/my-bookings', protect, getMyBookings);
router.put('/cancel/:bookingId', protect, cancelBooking);
router.get('/bookings-list', protect, authorizeRoles('admin'), getBookings);

export default router;
