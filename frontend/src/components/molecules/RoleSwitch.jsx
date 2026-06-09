import React from 'react';

const RoleSwitch = ({ role, setRole, onRoleChange }) => {
  const handleClick = (newRole) => {
    setRole(newRole);
    if (onRoleChange) onRoleChange(newRole);
  };

  return (
    <div className="flex p-1 mb-8 bg-surface border border-outline-light rounded-full relative z-20 shadow-sm">
      <button
        type="button"
        onClick={() => handleClick('SEEKER')}
        className={`flex-1 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 z-10 ${
          role === 'SEEKER' ? 'text-brand-dark' : 'text-ink-light hover:text-ink'
        }`}
      >
        Pencari Kos
      </button>
      <button
        type="button"
        onClick={() => handleClick('OWNER')}
        className={`flex-1 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 z-10 ${
          role === 'OWNER' ? 'text-brand-dark' : 'text-ink-light hover:text-ink'
        }`}
      >
        Pemilik Kos
      </button>
      {/* Animated Background Pill */}
      <div
        className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-brand-soft border border-brand/20 rounded-full transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)"
        style={{ transform: role === 'OWNER' ? 'translateX(100%)' : 'translateX(0)' }}
      />
    </div>
  );
};

export default RoleSwitch;
