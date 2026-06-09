import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useAuthStore } from '../../store/useAuthStore';
import AuthTemplate from '../../components/templates/AuthTemplate';
import LoginForm from '../../components/organisms/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const setLogin = useAuthStore((state) => state.setLogin);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await authService.login(formData);
      if (response.success) {
        setLogin(response.data.user, response.data.token);
        
        if (response.data.user.role === 'ADMIN') {
          navigate('/admin');
        } else if (response.data.user.role === 'OWNER') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Email atau password salah');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthTemplate
      heading={<>Temukan hunian yang<br />mengerti gaya hidupmu.</>}
      subHeading="Bergabunglah dengan ribuan pencari dan pemilik kos yang telah menemukan kecocokan di KosSearch."
    >
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-ink mb-2">Selamat Datang</h1>
          <p className="text-ink-light">Silakan masuk ke akun Anda.</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm">
            {errorMsg}
          </div>
        )}

        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

        <p className="mt-8 text-center text-sm text-ink-light">
          Belum memiliki akun?{' '}
          <Link to="/register" className="font-semibold text-brand hover:text-brand-dark transition-colors">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </AuthTemplate>
  );
};

export default Login;
