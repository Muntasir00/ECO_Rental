import { Router } from 'express';
import {
  createRoom,
  getRooms,
  getRoomById,
  searchRooms,
} from '../controllers/room.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';

const router = Router();

// public
router.get('/', getRooms);
router.get('/:id', getRoomById);

// admin only
router.post('/', protect, authorizeRoles('admin'), createRoom);
router.get('/search', searchRooms);

export default router;
