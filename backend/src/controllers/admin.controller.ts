import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const totalUsers = await prisma.user.count();
    const totalSeekers = await prisma.user.count({ where: { role: 'SEEKER' } });
    const totalOwners = await prisma.user.count({ where: { role: 'OWNER' } });
    const unverifiedOwners = await prisma.user.count({ where: { role: 'OWNER', isVerified: false } });
    
    const totalKos = await prisma.kos.count();
    const activeKos = await prisma.kos.count({ where: { status: 'ACTIVE' } });
    const hiddenKos = await prisma.kos.count({ where: { status: 'HIDDEN' } });

    const totalFacilities = await prisma.facility.count();
    const totalReviews = await prisma.review.count();
    const totalSavedKos = await prisma.savedKos.count();

    res.status(200).json({
      success: true,
      data: {
        users: { total: totalUsers, seekers: totalSeekers, owners: totalOwners, unverifiedOwners },
        kos: { total: totalKos, active: activeKos, hidden: hiddenKos },
        extras: { facilities: totalFacilities, reviews: totalReviews, savedKos: totalSavedKos }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getPendingOwners = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const pendingOwners = await prisma.user.findMany({
      where: { role: 'OWNER', isVerified: false },
      select: { id: true, name: true, email: true, phone: true, createdAt: true },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      success: true,
      data: pendingOwners
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;

    const owner = await prisma.user.findUnique({ where: { id } });
    if (!owner || owner.role !== 'OWNER') {
      res.status(404).json({ success: false, message: 'Pemilik Kos tidak ditemukan' });
      return;
    }

    await prisma.user.update({
      where: { id },
      data: { isVerified: true }
    });

    res.status(200).json({
      success: true,
      message: 'Pemilik kos berhasil diverifikasi'
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, phone: true, isVerified: true, createdAt: true },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getKos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const kosList = await prisma.kos.findMany({
      include: { owner: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, data: kosList });
  } catch (error) {
    next(error);
  }
};

export const getFacilities = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const facilities = await prisma.facility.findMany({
      orderBy: { name: 'asc' }
    });
    res.status(200).json({ success: true, data: facilities });
  } catch (error) {
    next(error);
  }
};

export const addFacility = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, icon } = req.body;
    if (!name) {
      res.status(400).json({ success: false, message: 'Nama fasilitas wajib diisi' });
      return;
    }
    const facility = await prisma.facility.create({
      data: { name, icon }
    });
    res.status(201).json({ success: true, data: facility });
  } catch (error) {
    next(error);
  }
};

export const deleteFacility = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    await prisma.facility.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'Fasilitas berhasil dihapus' });
  } catch (error) {
    next(error);
  }
};

export const getReviews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const reviews = await prisma.review.findMany({
      include: { 
        user: { select: { name: true } },
        kos: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};

export const getSavedKos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const savedKos = await prisma.savedKos.findMany({
      include: {
        user: { select: { name: true, email: true } },
        kos: { select: { name: true, city: true } }
      }
    });
    res.status(200).json({ success: true, data: savedKos });
  } catch (error) {
    next(error);
  }
};
