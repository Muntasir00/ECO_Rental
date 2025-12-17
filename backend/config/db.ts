import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/eco-rental-app-ts`);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB error', error);
    process.exit(1);
  }
};
