import React from 'react';

const FacilityCard = ({ Icon, title, description }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-outline-light hover:shadow-xl hover:border-brand/30 transition-all group">
      <div className="w-10 h-10 bg-brand-soft rounded-xl flex items-center justify-center text-brand mb-3 group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-bold text-ink mb-2">{title}</h3>
      <p className="text-ink-light text-xs leading-relaxed">{description}</p>
    </div>
  );
};

export default FacilityCard;
