import { Router } from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';
import {
  createFacility,
  deleteFacility,
  getFacilities,
  getFacilityByRoom,
  updateFacility,
} from '../controllers/facility.controller.js';
const router = Router();

//public
router.get('/', protect, authorizeRoles('admin'), getFacilities);
router.get(
  '/room/:roomId',
  protect,
  authorizeRoles('admin'),
  getFacilityByRoom
);

//protected routes
router.post('/create', protect, authorizeRoles('admin'), createFacility);
router.put('/:id', protect, authorizeRoles('admin'), updateFacility);
router.delete('/:id', protect, authorizeRoles('admin'), deleteFacility);

export default router;
