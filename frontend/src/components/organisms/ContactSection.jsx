import React from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactSection = () => {
  return (
    <section id="kontak" className="py-24 bg-brand-soft/20 border-t border-outline-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-soft text-brand rounded-full mb-6">
          <Send size={32} />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-6">Butuh Bantuan Lebih Lanjut?</h2>
        <p className="text-lg text-ink-light mb-10 max-w-2xl mx-auto">
          Tim layanan pelanggan kami siap membantu menjawab pertanyaan Anda atau mengatasi kendala teknis kapan saja.
        </p>
        
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <div className="flex items-center gap-3 bg-surface border border-outline-light px-6 py-4 rounded-2xl w-full sm:w-auto">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-ink shadow-sm">
              <span className="font-bold">@</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-ink-light uppercase tracking-wider">Email Kami</p>
              <p className="font-semibold text-ink">hello@kossearch.com</p>
            </div>
          </div>
          
          <Link to="/live-chat" className="flex items-center gap-3 bg-brand text-white px-6 py-4 rounded-2xl shadow-lg shadow-brand/20 w-full sm:w-auto hover:-translate-y-1 transition-transform cursor-pointer">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white shadow-sm">
              <MessageCircle size={20} />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white/80 uppercase tracking-wider">Hubungi Kami</p>
              <span className="font-bold">Live Chat Sekarang</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
