import { Blog } from '../../models/blog.model.js';
import { CreateBlogTypes } from '../../types/blog.js';

export const createBlogService = async (data: CreateBlogTypes) => {
  return await Blog.create(data);
};

export const getAllBlogsService = async (page = 1, limit = 10, search = '') => {
  const query = search ? { title: { $regex: search, $options: 'i' } } : {};
  const blogs = await Blog.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Blog.countDocuments(query);

  return {
    blogs,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getBlogByIdService = async (id: string) => {
  return await Blog.findById(id);
};

export const updateBlogByIdService = async (
  id: string,
  data: Partial<{
    title: string;
    content: string;
    images: { url: string; publicId: string }[];
  }>
) => {
  return await Blog.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBlogByIdService = async (id: string) => {
  return await Blog.findByIdAndDelete(id);
};
