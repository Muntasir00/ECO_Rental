import { Router } from 'express';
import {
  createAdmin,
  getDashboardOverview,
} from '../controllers/admin.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';

const router = Router();

router.post('/create-admin', createAdmin);
router.get(
  '/dashboard-overview',
  protect,
  authorizeRoles('admin'),
  getDashboardOverview,
);

export default router;

// , protect, authorizeRoles('admin')
