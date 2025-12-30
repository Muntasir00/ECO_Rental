import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5174', credentials: true }));

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/blogs', (await import('./routes/blog.routes.js')).default);

// Global error handler

app.use((req, res, next) => {
  console.log('Headers:', req.headers['content-type']);
  next();
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server:Something went wrong!' });
  }
);

export default app;
