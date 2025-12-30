import { Router } from 'express';
import { createAdmin } from '../controllers/admin.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';

const router = Router();

router.post('/create-admin', createAdmin);

export default router;

// , protect, authorizeRoles('admin')
