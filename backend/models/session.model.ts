import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
}

const sessionSchema = new Schema<ISession>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Session = mongoose.model<ISession>('Session', sessionSchema);
