import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { prisma } from '../utils/prisma';

// Extend interface Request bawaan Express agar mengenali properti user kita
export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, message: 'Akses Ditolak. Token tidak ditemukan.' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded: any = verifyToken(token);

    if (!decoded) {
      res.status(401).json({ success: false, message: 'Akses Ditolak. Token tidak valid atau kedaluwarsa.' });
      return;
    }

    // Ambil data user lengkap dari DB (opsional, tapi disarankan untuk memvalidasi user masih aktif)
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true, isVerified: true },
    });

    if (!user) {
      res.status(401).json({ success: false, message: 'User tidak ditemukan di database.' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ success: false, message: 'Forbidden. Anda tidak memiliki izin untuk akses ini.' });
      return;
    }
    next();
  };
};

export const requireVerified = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!req.user || !req.user.isVerified) {
    res.status(403).json({ success: false, message: 'Akun Anda belum diverifikasi untuk melakukan tindakan ini.' });
    return;
  }
  next();
};
