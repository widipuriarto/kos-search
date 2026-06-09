import React from 'react';
import StepCard from '../molecules/StepCard';

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Cari & Temukan",
      description: "Gunakan filter cerdas kami atau biarkan AI Assistant mencarikan kos yang paling sesuai dengan kriteria dan budget Anda.",
      isHighlighted: false
    },
    {
      number: "02",
      title: "Survei & Cocokkan",
      description: "Hubungi pemilik kos untuk mengatur jadwal survei, baik secara virtual maupun datang langsung ke lokasi.",
      isHighlighted: true
    },
    {
      number: "03",
      title: "Pesan & Tempati",
      description: "Lakukan kesepakatan langsung dengan pemilik dan Anda siap pindah ke hunian baru yang nyaman.",
      isHighlighted: false
    }
  ];

  return (
    <section className="py-24 bg-brand-soft/20 relative overflow-hidden">
      {/* Background Decorative Blob */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/3">
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-2 block">Mudah & Cepat</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-ink mb-6 leading-tight">Cara Mulai<br/>Ngekos Bersama Kami</h2>
            <p className="text-lg text-ink-light mb-8">Tidak perlu ribet berkeliling kota. Hanya dengan tiga langkah mudah, kamar impian Anda sudah bisa ditempati.</p>
            <a href="#rekomendasi" className="bg-ink hover:bg-ink-light text-white font-semibold py-3 px-8 rounded-full transition-colors hidden lg:inline-block">
              Cari Kos Sekarang
            </a>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <StepCard 
                key={idx}
                number={step.number}
                title={step.title}
                description={step.description}
                isHighlighted={step.isHighlighted}
              />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
