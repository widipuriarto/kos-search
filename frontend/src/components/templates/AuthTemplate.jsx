import React from 'react';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthTemplate = ({ children, imageSrc, heading, subHeading }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans">
      {/* Left Side - Form Container */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-12 relative z-10 min-h-screen md:min-h-0">
        
        {/* Logo / Back to Home */}
        <Link 
          to="/" 
          className="absolute top-6 left-6 md:top-8 md:left-16 flex items-center gap-2 cursor-pointer text-ink hover:text-brand transition-colors duration-200"
        >
          <Home size={20} />
          <span className="font-semibold text-lg font-serif tracking-wide">KosSearch</span>
        </Link>

        {/* Dynamic Form Content */}
        <div className="w-full max-w-md mx-auto mt-12 md:mt-0">
          {children}
        </div>
        
      </div>

      {/* Right Side - Image Showcase (Hidden on Mobile) */}
      <div className="hidden md:flex w-1/2 bg-surface p-6">
        <div className="w-full h-full relative rounded-4xl overflow-hidden bg-brand/10 border-4 border-white shadow-xl">
          <img 
            src={imageSrc || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"} 
            alt="Showcase" 
            className="w-full h-full object-cover opacity-90 mix-blend-multiply"
          />
          
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent flex flex-col justify-end p-12">
            <h2 className="text-white text-4xl font-serif font-bold mb-4 leading-tight">
              {heading}
            </h2>
            <p className="text-white/80 text-lg font-light max-w-md">
              {subHeading}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTemplate;
