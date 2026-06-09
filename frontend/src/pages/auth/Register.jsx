import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useAuthStore } from '../../store/useAuthStore';
import AuthTemplate from '../../components/templates/AuthTemplate';
import RoleSwitch from '../../components/molecules/RoleSwitch';
import RegisterForms from '../../components/organisms/RegisterForms';

const Register = () => {
  const navigate = useNavigate();
  const setLogin = useAuthStore((state) => state.setLogin);

  const [role, setRole] = useState('SEEKER');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (formData, submittedRole) => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await authService.register({ ...formData, role: submittedRole });
      if (response.success) {
        setLogin(response.data.user, response.data.token);
        if(response.data.user.role === 'OWNER') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Terjadi kesalahan saat registrasi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthTemplate
      heading={<>Mulai perjalanan<br />properti Anda.</>}
      subHeading="Bergabunglah dengan komunitas KosSearch dan rasakan pengalaman pencarian yang transparan dan jujur."
    >
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
        
        {/* Header Berubah Sesuai Role */}
        <div className="mb-6 relative h-20">
          <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${role === 'SEEKER' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none'}`}>
            <h1 className="text-4xl font-serif font-bold text-ink mb-2">Akun Pencari</h1>
            <p className="text-ink-light">Mulai temukan kos idamanmu sekarang.</p>
          </div>
          <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${role === 'OWNER' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}>
            <h1 className="text-4xl font-serif font-bold text-brand-dark mb-2">Akun Pemilik</h1>
            <p className="text-ink-light">Iklankan propertimu ke ribuan pencari.</p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm">
            {errorMsg}
          </div>
        )}

        {/* Role Selector Slider */}
        <RoleSwitch role={role} setRole={(r) => { setRole(r); setErrorMsg(''); }} />

        {/* Sliding Forms Container */}
        <RegisterForms role={role} onSubmit={handleRegister} isLoading={isLoading} />

        <p className="mt-8 text-center text-sm text-ink-light">
          Sudah memiliki akun?{' '}
          <Link to="/login" className="font-semibold text-brand hover:text-brand-dark transition-colors">
            Masuk disini
          </Link>
        </p>
      </div>
    </AuthTemplate>
  );
};

export default Register;
