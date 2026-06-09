import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { uploadImageToSupabase } from '../utils/supabase';
import { KosType, KosStatus } from '@prisma/client';

export const createKos = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { name, description, address, city, price, type, availableRooms, facilities } = req.body;
    const ownerId = req.user?.id;

    if (!ownerId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    // Pastikan owner sudah terverifikasi (opsional, tergantung policy)
    if (!req.user?.isVerified) {
      res.status(403).json({ success: false, message: 'Akun Anda belum diverifikasi oleh Admin.' });
      return;
    }

    // Tangani unggahan gambar
    const files = (req as any).files as any[];
    if (!files || files.length === 0) {
      res.status(400).json({ success: false, message: 'Minimal harus ada 1 foto kos.' });
      return;
    }

    // Parsing facilities (karena dari form-data, array biasanya dikirim sebagai JSON string atau array string)
    let parsedFacilities: string[] = [];
    if (facilities) {
      try {
        parsedFacilities = JSON.parse(facilities); // Jika dikirim sbg '["id1", "id2"]'
      } catch (e) {
        if (Array.isArray(facilities)) {
          parsedFacilities = facilities; // Jika dikirim multiple field 'facilities'
        } else {
          parsedFacilities = [facilities]; // Jika hanya 1 string
        }
      }
    }

    // 1. Upload semua gambar ke Supabase secara paralel
    const uploadPromises = files.map(file => uploadImageToSupabase(file, `kos/${ownerId}`));
    const imageUrls = await Promise.all(uploadPromises);

    // 2. Simpan data Kos ke Database
    const newKos = await prisma.kos.create({
      data: {
        name,
        description,
        address,
        city: city || 'Semarang',
        price: parseInt(price),
        type: type as KosType,
        availableRooms: parseInt(availableRooms),
        ownerId,
        status: KosStatus.ACTIVE,
        // Relasi dengan gambar
        images: {
          create: imageUrls.map(url => ({ url }))
        },
        // Relasi dengan fasilitas (many-to-many explicit di Prisma schema)
        facilities: {
          create: parsedFacilities.map(facilityId => ({
            facility: {
              connect: { id: facilityId }
            }
          }))
        }
      },
      include: {
        images: true,
        facilities: { include: { facility: true } }
      }
    });

    res.status(201).json({ success: true, data: newKos, message: 'Kos berhasil ditambahkan.' });
  } catch (error: any) {
    console.error('Error creating kos:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.', error: error.message });
  }
};

export const getOwnerKos = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const ownerId = req.user?.id;
    if (!ownerId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const kosList = await prisma.kos.findMany({
      where: { ownerId },
      include: {
        images: true,
        facilities: { include: { facility: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({ success: true, data: kosList });
  } catch (error) {
    console.error('Error fetching owner kos:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
};

export const updateKos = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const ownerId = req.user?.id as string;
    const { name, description, price, availableRooms, status } = req.body;

    const existingKos = await prisma.kos.findFirst({
      where: { id, ownerId }
    });

    if (!existingKos) {
      res.status(404).json({ success: false, message: 'Kos tidak ditemukan atau Anda tidak memiliki akses.' });
      return;
    }

    const updatedKos = await prisma.kos.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price: parseInt(price) }),
        ...(availableRooms && { availableRooms: parseInt(availableRooms) }),
        ...(status && { status: status as KosStatus })
      }
    });

    res.status(200).json({ success: true, data: updatedKos, message: 'Kos berhasil diupdate.' });
  } catch (error) {
    console.error('Error updating kos:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
};

export const searchKos = async (req: Request, res: Response): Promise<void> => {
  try {
    const { city, minPrice, maxPrice, type, keyword } = req.query;

    const whereClause: any = {
      status: KosStatus.ACTIVE,
    };

    if (city) {
      whereClause.city = { contains: city as string, mode: 'insensitive' };
    }
    if (type) {
      whereClause.type = type as KosType;
    }
    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price.gte = parseInt(minPrice as string);
      if (maxPrice) whereClause.price.lte = parseInt(maxPrice as string);
    }
    if (keyword) {
      whereClause.OR = [
        { name: { contains: keyword as string, mode: 'insensitive' } },
        { description: { contains: keyword as string, mode: 'insensitive' } }
      ];
    }

    const kosList = await prisma.kos.findMany({
      where: whereClause,
      include: {
        images: { take: 1 }, // Ambil 1 gambar untuk cover
        facilities: { include: { facility: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({ success: true, data: kosList });
  } catch (error) {
    console.error('Error searching kos:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
};

export const getKosDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const kos = await prisma.kos.findUnique({
      where: { id },
      include: {
        images: true,
        facilities: { include: { facility: true } },
        owner: {
          select: { id: true, name: true, email: true, phone: true }
        },
        reviews: {
          include: {
            user: { select: { id: true, name: true } }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!kos) {
      res.status(404).json({ success: false, message: 'Kos tidak ditemukan.' });
      return;
    }

    res.status(200).json({ success: true, data: kos });
  } catch (error) {
    console.error('Error fetching kos detail:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
};

export const deleteKos = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const ownerId = req.user?.id as string;

    // Pastikan kos milik owner ini
    const existingKos = await prisma.kos.findFirst({
      where: { id, ownerId }
    });

    if (!existingKos) {
      res.status(404).json({ success: false, message: 'Kos tidak ditemukan atau Anda tidak memiliki akses.' });
      return;
    }

    // Hapus kos dari database (cascade delete akan menghapus KosImage dan KosFacility terkait)
    // Catatan: Gambar di Supabase Storage tidak ikut terhapus secara otomatis dalam versi ini
    await prisma.kos.delete({
      where: { id }
    });

    res.status(200).json({ success: true, message: 'Kos berhasil dihapus.' });
  } catch (error) {
    console.error('Error deleting kos:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
};

export const getOwnerReviews = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const ownerId = req.user?.id;
    if (!ownerId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const reviews = await prisma.review.findMany({
      where: {
        kos: {
          ownerId: ownerId
        }
      },
      include: {
        user: { select: { name: true } },
        kos: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.error('Error fetching owner reviews:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil data review' });
  }
};

export const getOwnerStats = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const ownerId = req.user?.id;
    if (!ownerId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    // Hitung total kos
    const totalKos = await prisma.kos.count({
      where: { ownerId }
    });

    // Hitung total kamar tersedia (sum dari availableRooms)
    const kosList = await prisma.kos.findMany({
      where: { ownerId },
      select: { availableRooms: true }
    });
    
    const totalAvailableRooms = kosList.reduce((sum, kos) => sum + kos.availableRooms, 0);

    // Hitung total review dan rata-rata rating
    const reviewData = await prisma.review.aggregate({
      where: { kos: { ownerId } },
      _count: { id: true },
      _avg: { rating: true }
    });

    res.status(200).json({
      success: true,
      data: {
        totalKos,
        totalAvailableRooms,
        totalReviews: reviewData._count.id,
        averageRating: reviewData._avg.rating || 0
      }
    });
  } catch (error) {
    console.error('Error fetching owner stats:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil statistik owner' });
  }
};
