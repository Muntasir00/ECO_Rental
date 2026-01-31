import { Router } from 'express';
import {
  registerUser,
  logoutUser,
  loginUser,
  verification,
  forgotPassword,
  verifyOTP,
  changePassword,
  refreshAccessToken,
} from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

import { googleLogin } from '../controllers/googleLogInController.js';
import { appleLogin } from '../controllers/appleLogInController.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', protect, logoutUser);
router.post('/verify', verification);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp/:email', verifyOTP);
router.post('/change-password/:email', changePassword);
router.post('/refresh-token', refreshAccessToken);
router.post('/auth/google', googleLogin);
router.post('/auth/apple', appleLogin);

export default router;
