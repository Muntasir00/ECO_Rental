import { Router } from 'express';
import { getMe, updateProfile } from '../controllers/profile.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = Router();

router.get('/me', protect, getMe);

router.put(
  '/update',
  protect,
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'identityFile', maxCount: 1 },
  ]),
  updateProfile
);

export default router;
