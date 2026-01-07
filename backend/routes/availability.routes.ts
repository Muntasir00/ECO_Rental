import { Router } from 'express';
import { getRoomAvailability } from '../controllers/availability.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/rooms/:roomId/availability', getRoomAvailability);

export default router;
