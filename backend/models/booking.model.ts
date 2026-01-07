import mongoose, { Document, Schema } from 'mongoose';

export type BookingStatus = 'ongoing' | 'completed' | 'cancelled';

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  room: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  checkIn: Date;
  checkOut: Date;
  referralCode?: string;
  discount?: number;
  totalPrice: number;
  status: BookingStatus;
  roomsBooked: number;
  totalGuest?: number;
}

const bookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },

    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },

    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },

    referralCode: String,
    discount: { type: Number, default: 0 },
    totalGuest: { type: Number, default: 1 },

    totalPrice: { type: Number, required: true },

    status: {
      type: String,
      enum: ['ongoing', 'completed', 'cancelled'],
      default: 'ongoing',
    },
    roomsBooked: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

bookingSchema.index({ room: 1 });
bookingSchema.index({ user: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ checkIn: 1, checkOut: 1 });
bookingSchema.index({ room: 1, status: 1, checkIn: 1, checkOut: 1 });

bookingSchema.index({
  room: 1,
  status: 1,
  checkIn: 1,
  checkOut: 1,
});

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
