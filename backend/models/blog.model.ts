import mongoose, { Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  imagePublicId: String;
}

const blogSchema = new mongoose.Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const Blog = mongoose.model<IBlog>('Blog', blogSchema);
