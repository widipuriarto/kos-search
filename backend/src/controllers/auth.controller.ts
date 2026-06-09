import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../utils/prisma';
import { generateToken } from '../utils/jwt';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, role, phone } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: 'Name, email, dan password wajib diisi!' });
      return;
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'Email sudah terdaftar!' });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default role adalah SEEKER jika tidak dikirim dari FE, 
    // tapi pastikan tidak bisa create ADMIN dari endpoint public ini
    const assignedRole = role === 'OWNER' ? 'OWNER' : 'SEEKER';

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role: assignedRole,
        // Jika owner, isVerified false dulu, nunggu admin
        isVerified: assignedRole === 'SEEKER' ? true : false,
      },
    });

    // Generate Token
    const token = generateToken({ userId: newUser.id, role: newUser.role });

    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      data: {
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          phone: newUser.phone,
          isVerified: newUser.isVerified,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    console.log("Login attempt:", { email: email?.trim(), passwordLength: password?.length });

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email dan password wajib diisi!' });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    
    if (!user) {
      res.status(401).json({ success: false, message: 'Email atau password salah' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Email atau password salah' });
      return;
    }

    const token = generateToken({ userId: user.id, role: user.role });

    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          isVerified: user.isVerified,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user.id;
    const { name, phone } = req.body;

    if (!name) {
      res.status(400).json({ success: false, message: 'Nama tidak boleh kosong!' });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        phone: phone || null,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Profil berhasil diperbarui',
      data: {
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          phone: updatedUser.phone,
          isVerified: updatedUser.isVerified,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
