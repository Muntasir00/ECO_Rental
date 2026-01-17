import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary.js';
import {
  createBlogService,
  getAllBlogsService,
  getBlogByIdService,
  updateBlogByIdService,
  deleteBlogByIdService,
} from '../services/Blog/blog.service.js';
import { connectDB } from '../config/db.js';

export const createBlog = async (req: Request, res: Response) => {
  await connectDB();

  const { title, content } = req.body;
  const files = req.files as Express.Multer.File[];

  if (!title || !content || !files || files.length === 0) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const uploadResults = await Promise.all(
    files.map(file =>
      cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
        { folder: 'blogs' }
      )
    )
  );

  const images = uploadResults.map(result => ({
    url: result.secure_url,
    publicId: result.public_id,
  }));

  const blog = await createBlogService({
    title,
    content,
    images,
  });

  res.status(201).json({
    success: true,
    message: 'Blog created successfully',
    blog,
  });
};

export const getBlogs = async (req: Request, res: Response) => {
  await connectDB();
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
  await connectDB();
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
  await connectDB();
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Blog ID is required.' });
  }

  const { title, content, removeImageIds } = req.body;
  const files = req.files as Express.Multer.File[];

  const blog = await getBlogByIdService(id);
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  let images = [...blog.images];

  if (removeImageIds && Array.isArray(removeImageIds)) {
    await Promise.all(
      removeImageIds.map((publicId: string) =>
        cloudinary.uploader.destroy(publicId)
      )
    );

    images = images.filter(img => !removeImageIds.includes(img.publicId));
  }

  if (files && files.length > 0) {
    const uploadResults = await Promise.all(
      files.map(file =>
        cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
          { folder: 'blogs' }
        )
      )
    );

    const newImages = uploadResults.map(img => ({
      url: img.secure_url,
      publicId: img.public_id,
    }));

    images.push(...newImages);
  }

  const updatedBlog = await updateBlogByIdService(id, {
    title,
    content,
    images,
  });

  res.status(200).json({
    success: true,
    message: 'Blog updated successfully',
    blog: updatedBlog,
  });
};

export const deleteBlogById = async (req: Request, res: Response) => {
  await connectDB();
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Blog ID is required.' });
  }

  const blog = await getBlogByIdService(id);
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found.' });
  }

  await Promise.all(
    blog.images.map(img => cloudinary.uploader.destroy(img.publicId))
  );

  await deleteBlogByIdService(id);

  res.status(200).json({
    success: true,
    message: 'Blog and images deleted successfully',
  });
};
