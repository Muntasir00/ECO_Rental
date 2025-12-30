import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary.js';
import {
  createBlogService,
  getAllBlogsService,
  getBlogByIdService,
  updateBlogByIdService,
  deleteBlogByIdService,
} from '../services/Blog/blog.service.js';

export const createBlog = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  if (!title || !content || !req.file) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const uploadResult = await cloudinary.uploader.upload(
    `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
    { folder: 'blogs' }
  );

  const blog = await createBlogService({
    title,
    content,
    imageUrl: uploadResult.secure_url,
    imagePublicId: uploadResult.public_id,
  });
  res.status(201).json({
    success: true,
    message: 'Blog created successfully',
    blog,
  });
};

export const getBlogs = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = (req.query.search as string) || '';

  const blogs = await getAllBlogsService(page, limit, search);
  res.status(200).json({
    success: true,
    blogs,
  });
};

export const getBlogById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Blog ID is required.' });
  }
  const blog = await getBlogByIdService(id);

  if (!blog) {
    return res.status(404).json({ message: 'Blog not found.' });
  }

  res.status(200).json({
    success: true,
    blog,
  });
};

export const updateBlogById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Blog ID is required.' });
  }

  const blog = await getBlogByIdService(id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });

  let updatedData: any = {
    title: req.body.title,
    content: req.body.content,
  };

  if (req.file) {
    if (blog.imagePublicId) {
      await cloudinary.uploader.destroy(blog.imagePublicId.toString());
    }

    const uploadResult = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
      { folder: 'blogs' }
    );

    updatedData.imageUrl = uploadResult.secure_url;
    updatedData.imagePublicId = uploadResult.public_id;
  }

  const updatedBlog = await updateBlogByIdService(id, updatedData);

  res.status(200).json({
    success: true,
    message: 'Blog updated successfully',
    blog: updatedBlog,
  });
};

export const deleteBlogById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Blog ID is required.' });
  }
  const deletedBlog = await deleteBlogByIdService(id);

  if (!deletedBlog) {
    return res.status(404).json({ message: 'Blog not found.' });
  }

  res.status(200).json({
    success: true,
    message: 'Blog deleted successfully',
  });
};
