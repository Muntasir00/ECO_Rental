import express from 'express';
import cors from 'cors';

import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import blogRoutes from './routes/blog.routes.js';
import profileRoutes from './routes/profile.routes.js';
import roomRoutes from './routes/room.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import availabilityRoutes from './routes/availability.routes.js';
import facilityRoutes from './routes/facility.routes.js';

import { bookingCronJob } from './cron/booking.cron.js';

const app = express();

/* ---------- Body Parsers ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- CORS ---------- */
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://eco-rental-bqf5.vercel.app',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

/* ---------- Cron Job ---------- */
// if (process.env.ENABLE_CRON === 'true') {
bookingCronJob();
// }

/* ---------- Routes ---------- */
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/blogs', blogRoutes);
app.use('/profiles', profileRoutes);
app.use('/rooms', roomRoutes);
app.use('/bookings', bookingRoutes);
app.use('/availability', availabilityRoutes);
app.use('/facilities', facilityRoutes);

/* ---------- Global Error Handler ---------- */
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);

    if (err.message === 'Not allowed by CORS') {
      return res.status(403).json({ message: err.message });
    }

    res.status(err.status || 500).json({
      message: err.message || 'Server: Something went wrong!',
    });
  }
);

export default app;
