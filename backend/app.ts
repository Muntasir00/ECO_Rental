import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { bookingCronJob } from './cron/booking.cron.js';

const app = express();

app.use(express.json());
bookingCronJob();

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

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

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/blogs', (await import('./routes/blog.routes.js')).default);
app.use('/profiles', (await import('./routes/profile.routes.js')).default);
app.use('/rooms', (await import('./routes/room.routes.js')).default);
app.use('/bookings', (await import('./routes/booking.routes.js')).default);
app.use(
  '/availability',
  (await import('./routes/availability.routes.js')).default
);

// Global error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server: Something went wrong!' });
  }
);

export default app;
