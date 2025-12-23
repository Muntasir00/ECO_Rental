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

export default router;
