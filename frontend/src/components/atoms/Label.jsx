import React from 'react';

const Label = ({ children, className = '', ...props }) => {
  return (
    <label className={`text-sm font-medium text-ink ml-1 block ${className}`} {...props}>
      {children}
    </label>
  );
};

export default Label;
