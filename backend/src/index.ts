import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/auth.route';
import kosRoutes from './routes/kos.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Dasar
app.use(cors());
app.use(express.json()); // Parsing application/json
app.use(express.urlencoded({ extended: true })); // Parsing application/x-www-form-urlencoded

// Route Testing Sederhana
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'KosSearch API is running smoothly! 🚀',
  });
});

import adminRoutes from './routes/admin.routes';
import chatRoutes from './routes/chat.routes';

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/kos', kosRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chat', chatRoutes);

// Middleware Error Handler harus di paling bawah
app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
