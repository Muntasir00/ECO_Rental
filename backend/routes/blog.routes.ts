import { Router } from 'express';
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} from '../controllers/blog.controller.js';

import { protect } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = Router();

//public
router.get('/', getBlogs);
router.get('/:id', getBlogById);

//protected routes
router.post(
  '/create',
  protect,
  authorizeRoles('admin'),
  upload.single('image'),
  createBlog
);
router.put(
  '/:id',
  protect,
  authorizeRoles('admin'),
  upload.single('image'),
  updateBlogById
);
router.delete('/:id', protect, authorizeRoles('admin'), deleteBlogById);

export default router;
