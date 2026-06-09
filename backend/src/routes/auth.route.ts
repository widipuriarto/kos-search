import { Router } from 'express';
import { register, login, updateProfile } from '../controllers/auth.controller';
import { requireAuth, requireRole } from '../middlewares/auth.middleware';

const router = Router();

// Public Routes
router.post('/register', register);
router.post('/login', login);

// Protected Route Example (Untuk testing verifikasi token)
router.get('/me', requireAuth, (req: any, res) => {
  res.json({
    success: true,
    data: req.user,
  });
});

// Update Profile Route
router.put('/update', requireAuth, updateProfile);

export default router;
