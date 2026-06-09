import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, CheckCircle, Share2, Heart, Home, Bath, Wifi, Shield } from 'lucide-react';
import { api } from '../../services/api';
import Button from '../../components/atoms/Button';
import { useAuthStore } from '../../store/useAuthStore';

const KosDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [kos, setKos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false); // Mock saved state

  useEffect(() => {
    // Scroll ke atas saat komponen dimuat
    window.scrollTo(0, 0);

    const fetchKosDetail = async () => {
      try {
        const response = await api.get(`/kos/${id}`);
        if (response.data.success) {
          setKos(response.data.data);
        }
      } catch (error) {
        console.error('Failed to load kos detail:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKosDetail();
  }, [id]);

  const handleAction = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      // Fitur booking/chat masih dalam tahap pengembangan
      navigate('/live-chat');
    }
  };

  const handleWhatsApp = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (kos?.owner?.phone) {
      // Pastikan format nomor telepon benar (ganti 0 di depan dengan 62)
      let phone = kos.owner.phone;
      if (phone.startsWith('0')) {
        phone = '62' + phone.substring(1);
      }
      
      const message = encodeURIComponent(`Halo ${kos.owner.name}, saya tertarik dengan ${kos.name} yang Anda iklankan di KosSearch. Apakah kamar masih tersedia?`);
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    } else {
      alert('Maaf, nomor telepon pemilik tidak tersedia.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background text-brand">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-semibold">Memuat detail kos...</p>
        </div>
      </div>
    );
  }

  if (!kos) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-ink mb-2">Kos Tidak Ditemukan</h2>
          <p className="text-ink-light">Properti yang Anda cari mungkin telah dihapus.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-20 pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* ================= LEFT COLUMN (3/4 Width) ================= */}
          <div className="lg:col-span-3 flex flex-col">
            
            {/* HEADER SECTION */}
            <div className="mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-brand-soft text-brand-dark font-bold text-xs rounded-full uppercase tracking-wide">
                    {kos.type === 'CAMPUR' ? 'Kos Campur' : `Kos ${kos.type}`}
                  </span>
                  <div className="flex items-center text-sm font-semibold text-ink">
                    <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                    <span>4.8 <span className="text-ink-light font-normal">(12 Ulasan)</span></span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-2">{kos.name}</h1>
                <div className="flex items-center text-ink-light font-medium">
                  <MapPin size={18} className="mr-1.5 shrink-0 text-brand" />
                  <span>{kos.address}, {kos.city}</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="p-3 bg-surface border border-outline-light rounded-full hover:border-brand hover:text-brand transition-colors shadow-sm">
                  <Share2 size={20} />
                </button>
                <button 
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-3 bg-surface border border-outline-light rounded-full transition-colors shadow-sm ${
                    isSaved ? 'border-red-500 text-red-500 bg-red-50' : 'hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <Heart size={20} className={isSaved ? 'fill-red-500' : ''} />
                </button>
              </div>
            </div>

            {/* GALLERY SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 h-[300px] md:h-[450px]">
              {/* Main Image */}
              <div className="md:col-span-3 rounded-3xl overflow-hidden bg-surface relative h-full">
                {kos.images && kos.images.length > 0 ? (
                  <img 
                    src={kos.images[activeImage].url} 
                    alt="Main" 
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ink-light">No Image</div>
                )}
              </div>
              
              {/* Thumbnail Strip */}
              <div className="hidden md:flex flex-col gap-4 h-full">
                {kos.images?.slice(0, 4).map((img, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveImage(idx)}
                    className={`flex-1 rounded-2xl overflow-hidden cursor-pointer border-2 transition-colors ${
                      activeImage === idx ? 'border-brand' : 'border-transparent hover:border-outline'
                    }`}
                  >
                    <img src={img.url} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
                {kos.images?.length > 4 && (
                  <div 
                    onClick={() => setActiveImage(4)}
                    className="flex-1 rounded-2xl overflow-hidden cursor-pointer relative group"
                  >
                    <img src={kos.images[4].url} alt="Thumb 4" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-ink/60 flex items-center justify-center group-hover:bg-ink/70 transition-colors">
                      <span className="text-white font-bold text-lg">+{kos.images.length - 4} Foto</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CONTENT DETAILS */}
            <div className="space-y-10">
              {/* Description */}
              <section>
                <h2 className="text-2xl font-bold text-ink mb-4 border-b border-outline-light pb-2">Deskripsi</h2>
                <p className="text-ink-light leading-relaxed whitespace-pre-wrap">{kos.description}</p>
              </section>

              {/* Facilities */}
              <section>
                <h2 className="text-2xl font-bold text-ink mb-4 border-b border-outline-light pb-2">Fasilitas Utama</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {kos.facilities?.map((fac, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-ink font-medium">
                      <CheckCircle size={20} className="text-green-500" />
                      <span>{fac.facility?.name}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Owner Info */}
              <section className="bg-surface border border-outline-light rounded-3xl p-6 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-brand-soft border-2 border-brand flex items-center justify-center text-brand-dark font-bold text-2xl">
                  {kos.owner?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm text-ink-light mb-1">Dikelola oleh</p>
                  <h3 className="text-xl font-bold text-ink">{kos.owner?.name}</h3>
                  <p className="text-sm font-medium text-brand">Pemilik Terverifikasi</p>
                </div>
              </section>
            </div>
            
          </div>

          {/* ================= RIGHT COLUMN (1/4 Width Sticky Booking Card) ================= */}
          <div className="lg:col-span-1 relative">
            <div className="sticky top-32 bg-surface border border-outline-light rounded-3xl p-6 shadow-xl shadow-ink/5">
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-ink">Rp {kos.price.toLocaleString('id-ID')}</span>
                <span className="text-ink-light block mt-1 text-sm">/ bulan</span>
              </div>
              
              <div className="bg-brand-soft/30 rounded-2xl p-4 mb-6 border border-brand/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-ink">Ketersediaan</span>
                  {kos.availableRooms > 0 ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Tersedia</span>
                  ) : (
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">Penuh</span>
                  )}
                </div>
                <p className="text-2xl font-bold text-brand-dark">{kos.availableRooms} <span className="text-sm font-normal text-ink-light">kamar kosong</span></p>
              </div>

              <div className="space-y-3 mb-6 text-sm text-ink-light">
                <div className="flex justify-between">
                  <span>Tipe Kos</span>
                  <span className="font-semibold text-ink">{kos.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Minimum Sewa</span>
                  <span className="font-semibold text-ink">1 Bulan</span>
                </div>
              </div>

              <Button 
                variant="primary" 
                className="w-full py-4 text-lg mb-3 shadow-brand/20 shadow-lg"
                disabled={kos.availableRooms === 0}
                onClick={handleAction}
              >
                Ajukan Sewa
              </Button>
              <Button variant="outline" className="w-full py-4" onClick={handleWhatsApp}>
                Tanya Pemilik
              </Button>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default KosDetail;
