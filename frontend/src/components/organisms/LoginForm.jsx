import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import InputField from '../molecules/InputField';
import Button from '../atoms/Button';

const LoginForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        label="Email"
        type="email"
        icon={Mail}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="budi@example.com"
        required
      />

      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-ink ml-1">Password</label>
          <Link to="/forgot-password" className="text-xs text-brand font-medium hover:text-brand-dark transition-colors">
            Lupa password?
          </Link>
        </div>
        <InputField
          type="password"
          icon={Lock}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="••••••••"
          required
        />
      </div>

      <Button type="submit" isLoading={isLoading}>
        Masuk
      </Button>
    </form>
  );
};

export default LoginForm;
