import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5174', credentials: true }));

app.use('/user', userRoutes);

export default app;
