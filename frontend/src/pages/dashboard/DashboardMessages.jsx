import React from 'react';
import { MessageSquare, Wrench } from 'lucide-react';

const DashboardMessages = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-ink mb-1">Pesan Masuk</h1>
        <p className="text-sm text-ink-light">Berkomunikasi langsung dengan calon penyewa.</p>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-outline-light p-12 text-center">
        <div className="w-20 h-20 bg-brand-soft text-brand rounded-full flex items-center justify-center mx-auto mb-4">
          <Wrench size={40} />
        </div>
        <h3 className="text-xl font-bold text-ink mb-2">Dalam Pengembangan</h3>
        <p className="text-ink-light max-w-md mx-auto">
          Fitur Pesan saat ini sedang dalam tahap pengembangan. Fitur obrolan langsung (real-time chat) akan segera hadir di pembaruan selanjutnya!
        </p>
      </div>
    </div>
  );
};

export default DashboardMessages;
