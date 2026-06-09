import { createClient } from '@supabase/supabase-js';

// Pastikan variabel ini ada di file .env backend Anda
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn("Peringatan: SUPABASE_URL atau SUPABASE_KEY belum di-set di .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Fungsi utilitas untuk mengunggah file gambar ke Supabase Storage.
 * @param file Objek file dari multer
 * @param folderName Nama folder di dalam bucket (opsional)
 * @returns Public URL gambar yang berhasil diunggah
 */
export const uploadImageToSupabase = async (file: any, folderName: string = 'kos-images'): Promise<string> => {
  // Buat nama file unik
  const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const fileName = `${folderName}/${uniquePrefix}-${file.originalname.replace(/\s+/g, '-')}`;

  // Unggah file ke bucket bernama 'kossearch-bucket'
  // Pastikan Anda sudah membuat bucket ini di Dashboard Supabase dan mengaturnya ke Public
  const { data, error } = await supabase.storage
    .from('kossearch-bucket')
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(`Gagal mengunggah gambar: ${error.message}`);
  }

  // Ambil public URL dari file yang diunggah
  const { data: publicUrlData } = supabase.storage
    .from('kossearch-bucket')
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
};
