import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';

const InputField = ({ label, icon: Icon, ...props }) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && <Label>{label}</Label>}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-light">
            <Icon size={18} />
          </div>
        )}
        <Input hasIcon={!!Icon} {...props} />
      </div>
    </div>
  );
};

export default InputField;
