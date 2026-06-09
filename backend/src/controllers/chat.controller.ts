import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { processChatPrompt } from '../services/ai.service';
import { KosStatus, KosType } from '@prisma/client';

export const handleChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ success: false, message: "Pesan tidak boleh kosong." });
      return;
    }

    // 1. Ekstrak kriteria menggunakan Gemini
    const criteria = await processChatPrompt(message);

    // 2. Jika user hanya mengobrol (bukan cari kos), langsung kembalikan teks balasan
    if (criteria.isChatOnly) {
      res.status(200).json({
        success: true,
        data: {
          reply: criteria.chatReply,
          kosCards: []
        }
      });
      return;
    }

    // 3. Jika mencari kos, buat filter query untuk Prisma
    const whereClause: any = {
      status: KosStatus.ACTIVE, // Pastikan hanya kos aktif yang ditampilkan
    };

    if (criteria.city) {
      whereClause.city = { contains: criteria.city, mode: 'insensitive' };
    }

    if (criteria.type) {
      // Pastikan string yang di-return Gemini cocok dengan Enum KosType
      const typeUpper = criteria.type.toUpperCase();
      if (['PUTRA', 'PUTRI', 'CAMPUR'].includes(typeUpper)) {
        whereClause.type = typeUpper as KosType;
      }
    }

    if (criteria.minPrice || criteria.maxPrice) {
      whereClause.price = {};
      if (criteria.minPrice) whereClause.price.gte = criteria.minPrice;
      if (criteria.maxPrice) whereClause.price.lte = criteria.maxPrice;
    }

    if (criteria.keyword) {
      whereClause.OR = [
        { name: { contains: criteria.keyword, mode: 'insensitive' } },
        { description: { contains: criteria.keyword, mode: 'insensitive' } },
        { address: { contains: criteria.keyword, mode: 'insensitive' } }
      ];
    }

    if (criteria.facilities && criteria.facilities.length > 0) {
      whereClause.AND = criteria.facilities.map((fac: string) => ({
        facilities: {
          some: {
            facility: {
              name: { contains: fac, mode: 'insensitive' }
            }
          }
        }
      }));
    }

    // 4. Lakukan pencarian di database (maksimal 6 hasil agar rapi)
    const kosList = await prisma.kos.findMany({
      where: whereClause,
      take: 6,
      include: {
        images: { take: 1 }, // Ambil 1 gambar untuk cover card
        facilities: { include: { facility: true } },
        owner: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    // 5. Susun balasan
    let finalReply = criteria.chatReply;
    if (kosList.length === 0) {
      finalReply = "Maaf, saya tidak menemukan kos yang benar-benar pas dengan kriteria Anda saat ini. Mau coba kriteria yang sedikit berbeda?";
    }

    res.status(200).json({
      success: true,
      data: {
        reply: finalReply,
        kosCards: kosList
      }
    });

  } catch (error: any) {
    console.error("Error in handleChat:", error);
    res.status(500).json({ 
      success: false, 
      message: "Gagal memproses percakapan AI.",
      error: error.message
    });
  }
};
