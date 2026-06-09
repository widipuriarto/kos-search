import multer from 'multer';

// Kita menggunakan memoryStorage karena file akan langsung diteruskan ke Supabase Storage,
// tidak disimpan di hard disk server lokal (kecuali untuk file sementara).
const storage = multer.memoryStorage();

// Filter agar hanya menerima file gambar
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar yang diperbolehkan!'));
  }
};

// Batas ukuran file 5MB per gambar
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
