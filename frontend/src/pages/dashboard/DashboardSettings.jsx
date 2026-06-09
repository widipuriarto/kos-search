import React from 'react';
import { Settings, Wrench } from 'lucide-react';

const DashboardSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-ink mb-1">Pengaturan</h1>
        <p className="text-sm text-ink-light">Konfigurasi akun dan preferensi properti Anda.</p>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-outline-light p-12 text-center">
        <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wrench size={40} />
        </div>
        <h3 className="text-xl font-bold text-ink mb-2">Segera Hadir</h3>
        <p className="text-ink-light max-w-md mx-auto">
          Panel pengaturan khusus pemilik kos sedang dalam tahap finalisasi antarmuka. Anda dapat mengatur profil lewat menu profil untuk sementara waktu.
        </p>
      </div>
    </div>
  );
};

export default DashboardSettings;
