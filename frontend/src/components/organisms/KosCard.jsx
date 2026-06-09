import React from 'react';
import { MapPin, Star, Snowflake, Wifi, Bath, BedDouble, Archive, BookOpen, Utensils, Bike, Car, Key, Camera, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap = {
  'snowflake': Snowflake,
  'wifi': Wifi,
  'bath': Bath,
  'bed': BedDouble,
  'archive': Archive,
  'book-open': BookOpen,
  'utensils': Utensils,
  'bike': Bike,
  'car': Car,
  'key': Key,
  'camera': Camera,
};

const KosCard = ({ kos }) => {
  // Ambil gambar pertama sebagai cover, jika ada
  const coverImage = kos.images && kos.images.length > 0 
    ? kos.images[0].url 
    : 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'; // Fallback image

  return (
    <Link 
      to={`/kos/${kos.id}`} 
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col border border-outline-light/50"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-hover">
        <img 
          src={coverImage} 
          alt={kos.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-brand-dark rounded-full shadow-sm">
            {kos.type === 'CAMPUR' ? 'Campur' : kos.type}
          </span>
        </div>
        
        {/* Available Rooms Badge */}
        {kos.availableRooms <= 2 && kos.availableRooms > 0 && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-red-500/90 backdrop-blur-sm text-[10px] font-bold text-white rounded-full shadow-sm animate-pulse">
              Sisa {kos.availableRooms} Kamar
            </span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-bold text-base text-ink line-clamp-1 group-hover:text-brand transition-colors">
            {kos.name}
          </h3>
          <div className="flex items-center gap-1 text-xs font-semibold text-ink shrink-0">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span>4.8</span>
          </div>
        </div>

        <div className="flex items-center text-ink-light text-[11px] mb-3">
          <MapPin size={12} className="mr-1 shrink-0" />
          <span className="truncate">{kos.city} &bull; {kos.address}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          {kos.facilities?.slice(0, 4).map((fac, idx) => {
            const Icon = iconMap[fac.facility?.icon] || CheckCircle2;
            return (
              <div key={idx} className="bg-surface-hover p-1.5 rounded-md text-ink-muted" title={fac.facility?.name}>
                <Icon size={14} />
              </div>
            );
          })}
          {kos.facilities?.length > 4 && (
            <span className="text-[10px] font-medium text-ink-muted ml-1">
              +{kos.facilities.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto pt-3 border-t border-outline-light flex items-center justify-between">
          <p className="font-bold text-base text-ink">
            Rp {kos.price.toLocaleString('id-ID')}
            <span className="text-[10px] text-ink-light font-normal">/bln</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default KosCard;
