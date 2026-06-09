import React from 'react';

const AboutSection = () => {
  return (
    <section id="tentang-kami" className="py-24 bg-brand-soft/20 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-white rounded-full blur-[80px] opacity-60 -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800" 
                alt="Tentang KosSearch" 
                className="rounded-[2rem] shadow-2xl object-cover aspect-[4/3] w-full"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl border border-outline-light max-w-xs hidden sm:block animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand text-white rounded-full flex items-center justify-center font-bold text-lg">
                    10k+
                  </div>
                  <div>
                    <p className="font-bold text-ink">Pengguna Aktif</p>
                    <p className="text-xs text-ink-light">Di seluruh Indonesia</p>
                  </div>
                </div>
              </div>
              {/* Bubble box kedua */}
              <div className="absolute top-8 -left-8 bg-white p-5 rounded-3xl shadow-xl border border-outline-light max-w-xs hidden sm:block animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 text-brand rounded-full flex items-center justify-center font-bold text-lg">
                    50+
                  </div>
                  <div>
                    <p className="font-bold text-ink text-sm">Kota Terjangkau</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 order-1 md:order-2">
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-2 block">Mengenal Kami</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-ink mb-6 leading-tight">
              Lebih Dari Sekadar<br/>Pencarian Kos Biasa
            </h2>
            <p className="text-lg text-ink-light leading-relaxed mb-6">
              Berangkat dari kesulitan mencari kos yang sesuai ekspektasi, KosSearch hadir sebagai solusi platform pencarian hunian sementara yang cerdas dan transparan.
            </p>
            <p className="text-lg text-ink-light leading-relaxed mb-8">
              Kami menggabungkan antarmuka modern dengan kecerdasan buatan untuk memastikan pengalaman terbaik, baik bagi pencari kos maupun pemilik properti.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
