import React from 'react';
import { MessageCircle, Wrench, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const LiveChat = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-outline-light p-10 text-center relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-brand-soft to-white opacity-50 z-0"></div>

        <div className="relative z-10">
          <div className="w-24 h-24 bg-brand-soft text-brand rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <MessageCircle size={48} />
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Wrench size={16} className="text-ink-light" />
            </div>
          </div>
          
          <h1 className="text-3xl font-serif font-bold text-ink mb-3">Live Chat</h1>
          <p className="text-ink-light mb-8">
            Fitur obrolan langsung sedang dalam tahap pemeliharaan dan pengembangan. Kami sedang menyiapkan sistem yang lebih baik untuk Anda!
          </p>

          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 w-full bg-ink hover:bg-ink-light text-white font-bold py-4 px-6 rounded-xl transition-all"
          >
            <ArrowLeft size={20} />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
