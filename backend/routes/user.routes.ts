import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/user.controller';
import { isAuthenticated } from '../middleware/isAuthenticated';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', isAuthenticated, logoutUser);

export default router;
