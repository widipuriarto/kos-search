import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ children, isLoading, disabled, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "w-full mt-6 font-medium py-3.5 rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:hover:scale-100";
  
  const variants = {
    primary: "bg-brand hover:bg-brand-dark text-white shadow-brand/20",
    secondary: "bg-ink hover:bg-ink-light text-white shadow-ink/20"
  };

  return (
    <button 
      disabled={isLoading || disabled} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? <Loader2 size={20} className="animate-spin" /> : children}
    </button>
  );
};

export default Button;
