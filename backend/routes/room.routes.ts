import { Router } from 'express';
import {
  createRoom,
  getRooms,
  getRoomById,
  searchRooms,
  updateRoom,
  deleteRoom,
} from '../controllers/room.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = Router();

// public
router.get('/', getRooms);
router.get('/search', searchRooms);
router.get('/:id', getRoomById);
// admin only
router.post(
  '/',
  protect,
  authorizeRoles('admin'),
  upload.array('images', 10),
  createRoom
);
router.put(
  '/:id',
  protect,
  authorizeRoles('admin'),
  upload.array('images', 5),
  updateRoom
);
router.delete('/:id', protect, authorizeRoles('admin'), deleteRoom);

export default router;
