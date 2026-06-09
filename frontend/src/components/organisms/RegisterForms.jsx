import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Info } from 'lucide-react';
import InputField from '../molecules/InputField';
import Button from '../atoms/Button';

const RegisterForms = ({ role, onSubmit, isLoading }) => {
  const [seekerForm, setSeekerForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [ownerForm, setOwnerForm] = useState({ name: '', email: '', phone: '', password: '' });

  const handleSeekerSubmit = (e) => {
    e.preventDefault();
    onSubmit(seekerForm, 'SEEKER');
  };

  const handleOwnerSubmit = (e) => {
    e.preventDefault();
    onSubmit(ownerForm, 'OWNER');
  };

  return (
    <div className="grid">
      {/* Form SEEKER */}
      <div
        className={`col-start-1 row-start-1 transition-all duration-500 ease-in-out ${
          role === 'SEEKER' ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 -translate-x-8 pointer-events-none z-0'
        }`}
      >
        <form onSubmit={handleSeekerSubmit} className="space-y-4 px-1">
          <InputField
            label="Nama Lengkap"
            type="text"
            icon={User}
            value={seekerForm.name}
            onChange={(e) => setSeekerForm({ ...seekerForm, name: e.target.value })}
            placeholder="Budi Santoso"
            required
          />
          <InputField
            label="Email"
            type="email"
            icon={Mail}
            value={seekerForm.email}
            onChange={(e) => setSeekerForm({ ...seekerForm, email: e.target.value })}
            placeholder="budi@example.com"
            required
          />
          <InputField
            label="Nomor WhatsApp"
            type="tel"
            icon={Phone}
            value={seekerForm.phone}
            onChange={(e) => setSeekerForm({ ...seekerForm, phone: e.target.value })}
            placeholder="081234567890"
            required
          />
          <InputField
            label="Password"
            type="password"
            icon={Lock}
            value={seekerForm.password}
            onChange={(e) => setSeekerForm({ ...seekerForm, password: e.target.value })}
            placeholder="••••••••"
            required
            minLength={6}
          />
          <Button type="submit" isLoading={isLoading} variant="primary">
            Buat Akun
          </Button>
        </form>
      </div>

      {/* Form OWNER */}
      <div
        className={`col-start-1 row-start-1 transition-all duration-500 ease-in-out ${
          role === 'OWNER' ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-8 pointer-events-none z-0'
        }`}
      >
        <form onSubmit={handleOwnerSubmit} className="space-y-4 px-1">
          <div className="bg-brand-soft/50 border border-brand/20 p-3 rounded-2xl flex gap-3 items-start mb-2">
            <Info size={20} className="text-brand-dark shrink-0 mt-0.5" />
            <p className="text-xs text-ink-muted leading-relaxed">
              Setelah registrasi, akun Anda perlu diverifikasi oleh tim kami sebelum dapat menayangkan iklan properti.
            </p>
          </div>

          <InputField
            label="Nama Sesuai KTP"
            type="text"
            icon={User}
            value={ownerForm.name}
            onChange={(e) => setOwnerForm({ ...ownerForm, name: e.target.value })}
            placeholder="Siti Aminah"
            required
          />
          <InputField
            label="Email Bisnis"
            type="email"
            icon={Mail}
            value={ownerForm.email}
            onChange={(e) => setOwnerForm({ ...ownerForm, email: e.target.value })}
            placeholder="siti.kos@example.com"
            required
          />
          <InputField
            label="Nomor WhatsApp Aktif"
            type="tel"
            icon={Phone}
            value={ownerForm.phone}
            onChange={(e) => setOwnerForm({ ...ownerForm, phone: e.target.value })}
            placeholder="081234567890"
            required
          />
          <InputField
            label="Password"
            type="password"
            icon={Lock}
            value={ownerForm.password}
            onChange={(e) => setOwnerForm({ ...ownerForm, password: e.target.value })}
            placeholder="••••••••"
            required
            minLength={6}
          />
          <Button type="submit" isLoading={isLoading} variant="secondary">
            Daftar sebagai Pemilik
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForms;
