import React, { forwardRef } from 'react';

const Input = forwardRef(({ className = '', hasIcon = false, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full py-3 bg-surface border border-outline-light focus:border-brand focus:ring-2 focus:ring-brand/20 rounded-2xl outline-none transition-all duration-200 ${
        hasIcon ? 'pl-11 pr-4' : 'px-4'
      } ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
