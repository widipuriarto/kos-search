import React from 'react';
import { Wifi, Shield, Wind, Sparkles, Coffee, Car, Tv, Map } from 'lucide-react';
import FacilityCard from '../molecules/FacilityCard';

const FacilitySection = () => {
  const facilities = [
    {
      Icon: Wifi,
      title: "High-Speed WiFi",
      description: "Koneksi internet super cepat yang stabil, sangat cocok untuk mahasiswa atau pekerja WFH."
    },
    {
      Icon: Shield,
      title: "Keamanan 24/7",
      description: "Dilengkapi dengan CCTV dan akses kunci pintar atau penjaga kos yang siaga 24 jam."
    },
    {
      Icon: Wind,
      title: "Kamar Ber-AC",
      description: "Tidur lebih nyenyak dengan fasilitas penyejuk ruangan modern yang dirawat rutin."
    },
    {
      Icon: Sparkles,
      title: "Layanan Kebersihan",
      description: "Kamar dan area umum dibersihkan secara berkala oleh staf kebersihan profesional."
    },
    {
      Icon: Coffee,
      title: "Dapur Bersama",
      description: "Area dapur yang bersih, dilengkapi kompor, kulkas, dan dispenser air minum gratis."
    },
    {
      Icon: Car,
      title: "Parkir Luas",
      description: "Area parkir yang teduh dan luas, cukup untuk motor dan mobil dengan pengawasan ketat."
    },
    {
      Icon: Tv,
      title: "Ruang Komunal",
      description: "Area bersantai bersama yang dilengkapi TV, sofa empuk, dan colokan listrik di setiap sudut."
    },
    {
      Icon: Map,
      title: "Lokasi Strategis",
      description: "Berada di pusat kota, dekat dengan kampus, area perkantoran, dan akses transportasi umum."
    }
  ];

  return (
    <section className="h-screen bg-white border-t border-outline-light flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink mb-2">Standar Kenyamanan KosSearch</h2>
          <p className="text-sm text-ink-light max-w-2xl mx-auto">Kami memastikan setiap properti yang terdaftar memiliki standar fasilitas yang menunjang produktivitas Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {facilities.map((fac, idx) => (
            <FacilityCard 
              key={idx}
              Icon={fac.Icon}
              title={fac.title}
              description={fac.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitySection;
