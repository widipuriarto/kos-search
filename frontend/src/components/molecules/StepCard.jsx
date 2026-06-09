import React from 'react';

const StepCard = ({ number, title, description, isHighlighted = false }) => {
  return (
    <div className={`p-8 rounded-3xl relative overflow-hidden group ${
      isHighlighted ? 'bg-brand text-white shadow-xl shadow-brand/20' : 'bg-white shadow-sm border border-outline-light hover:shadow-xl hover:border-brand/30 transition-all'
    }`}>
      <div className={`text-5xl font-black opacity-10 absolute top-6 right-6 transition-transform group-hover:scale-110 ${
        isHighlighted ? 'text-white' : 'text-brand'
      }`}>
        {number}
      </div>
      <div className="relative z-10 mt-14">
        <h3 className={`text-xl font-bold mb-4 ${isHighlighted ? 'text-white' : 'text-ink'}`}>
          {title}
        </h3>
        <p className={`text-sm leading-relaxed ${isHighlighted ? 'text-white/90' : 'text-ink-light'}`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default StepCard;
