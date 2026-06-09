import React from 'react';
import { MessageSquare, Wrench } from 'lucide-react';

const AdminMessages = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900 mb-1">Pesan Masuk</h1>
        <p className="text-sm text-slate-500">Pusat komunikasi antar pengguna.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
        <div className="w-20 h-20 bg-blue-50 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wrench size={40} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Dalam Pengembangan</h3>
        <p className="text-slate-500 max-w-md mx-auto">
          Fitur Pesan saat ini sedang dalam tahap pengembangan. Fitur obrolan langsung (real-time chat) akan segera hadir di pembaruan selanjutnya!
        </p>
      </div>
    </div>
  );
};

export default AdminMessages;
