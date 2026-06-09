import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import AuthTemplate from '../../components/templates/AuthTemplate';
import InputField from '../../components/molecules/InputField';
import Button from '../../components/atoms/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi API Call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <AuthTemplate
      imageSrc="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop"
      heading={<>Jangan khawatir,<br />kami akan membantumu.</>}
      subHeading="Masukkan email yang terdaftar dan kami akan mengirimkan tautan untuk mengatur ulang password Anda."
    >
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-ink mb-2">Lupa Password?</h1>
          <p className="text-ink-light">Masukkan email Anda untuk mereset sandi.</p>
        </div>

        {isSuccess ? (
          <div className="p-6 bg-brand-soft/50 border border-brand/20 rounded-2xl text-center space-y-4">
            <h3 className="font-semibold text-brand-dark">Email Terkirim!</h3>
            <p className="text-sm text-ink-muted">
              Silakan cek kotak masuk email Anda ({email}) untuk menemukan tautan reset password.
            </p>
            <Button variant="secondary" onClick={() => setIsSuccess(false)} className="mt-4">
              Kirim ulang email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Email Terdaftar"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="budi@example.com"
              required
            />

            <Button type="submit" isLoading={isLoading} variant="primary">
              Kirim Tautan Reset
            </Button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-ink-light">
          Ingat password Anda?{' '}
          <Link to="/login" className="font-semibold text-brand hover:text-brand-dark transition-colors">
            Kembali ke Login
          </Link>
        </p>
      </div>
    </AuthTemplate>
  );
};

export default ForgotPassword;
