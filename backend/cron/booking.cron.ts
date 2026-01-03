import cron from 'node-cron';
import { Booking } from '../models/booking.model.js';

export const bookingCronJob = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running booking auto-complete job');

    await Booking.updateMany(
      {
        status: 'ongoing',
        checkOut: { $lt: new Date() },
      },
      { $set: { status: 'completed' } }
    );
  });
};
