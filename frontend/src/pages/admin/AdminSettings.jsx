import React from 'react';
import { Settings, Wrench } from 'lucide-react';

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900 mb-1">Pengaturan Sistem</h1>
        <p className="text-sm text-slate-500">Konfigurasi global platform KosSearch.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
        <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wrench size={40} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Segera Hadir</h3>
        <p className="text-slate-500 max-w-md mx-auto">
          Panel konfigurasi sistem (SEO, Variabel Lingkungan, Kebijakan Privasi) sedang dalam tahap finalisasi antarmuka.
        </p>
      </div>
    </div>
  );
};

export default AdminSettings;
