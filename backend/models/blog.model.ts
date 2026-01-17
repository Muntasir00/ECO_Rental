import mongoose, { Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  images: {
    url: string;
    publicId: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new mongoose.Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const Blog = mongoose.model<IBlog>('Blog', blogSchema);
