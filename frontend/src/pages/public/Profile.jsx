import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { authService } from '../../services/authService';
import { Mail, Shield, User as UserIcon, Heart, MapPin, Edit3, X, Save } from 'lucide-react';
import Button from '../../components/atoms/Button';
import InputField from '../../components/molecules/InputField';

const Profile = () => {
  const { user, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk form edit
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

  const handleUpdateProfile = async () => {
    try {
      setIsLoading(true);
      const res = await authService.updateProfile(formData);
      if (res.success) {
        updateUser({
          name: formData.name,
          phone: formData.phone,
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert(error.response?.data?.message || 'Gagal memperbarui profil');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <p className="text-ink-light font-medium">Memuat profil...</p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-20 pt-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-serif font-bold text-ink mb-2">Profil Saya</h1>
            <p className="text-ink-light">Kelola informasi data diri dan preferensi Anda.</p>
          </div>
          {isEditing && (
            <button 
              onClick={() => {
                setIsEditing(false);
                setFormData({ name: user.name, phone: user.phone || '' });
              }}
              className="flex items-center gap-2 text-sm font-medium text-ink-light hover:text-red-500 transition-colors"
            >
              <X size={18} /> Batal Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* ================= LEFT COLUMN: CARD PROFIL ================= */}
          <div className="md:col-span-1">
            <div className="bg-surface border border-outline-light rounded-3xl p-6 shadow-xl shadow-ink/5 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-brand-soft border-4 border-white shadow-md flex items-center justify-center text-brand font-bold text-4xl mb-4">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-bold text-ink mb-1">{user.name}</h2>
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-1 bg-brand-soft text-brand-dark rounded-full mb-6">
                <Shield size={14} />
                <span>{user.role === 'OWNER' ? 'Pemilik Kos' : 'Pencari Kos'}</span>
              </div>

              <div className="w-full space-y-4">
                <div className="flex items-center gap-3 text-sm text-ink-light border-b border-outline-light pb-4">
                  <Mail size={18} className="text-brand shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3 text-sm text-ink-light border-b border-outline-light pb-4">
                    <UserIcon size={18} className="text-brand shrink-0" />
                    <span>{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm text-ink-light pb-2">
                  <MapPin size={18} className="text-brand shrink-0" />
                  <span>Indonesia</span>
                </div>
              </div>

              {!isEditing && (
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(true)}
                  className="w-full mt-6 flex items-center justify-center gap-2"
                >
                  <Edit3 size={16} /> Edit Profil
                </Button>
              )}
            </div>
          </div>

          {/* ================= RIGHT COLUMN: KONTEN LAIN ================= */}
          <div className="md:col-span-2 space-y-8">
            
            <div className="bg-surface border border-outline-light rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
                <UserIcon className="text-brand" /> {isEditing ? 'Ubah Informasi Dasar' : 'Informasi Dasar'}
              </h3>
              
              {isEditing ? (
                <div className="space-y-4">
                  <InputField
                    label="Nama Lengkap"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Masukkan nama lengkap"
                  />
                  <InputField
                    label="Nomor Telepon"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Contoh: 08123456789"
                  />
                  <div>
                    <p className="text-sm font-medium text-ink-light ml-1 mb-1.5">Alamat Email (Tidak dapat diubah)</p>
                    <div className="w-full py-3 px-4 bg-background border border-outline-light rounded-2xl text-ink-light cursor-not-allowed">
                      {user.email}
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button 
                      onClick={handleUpdateProfile} 
                      isLoading={isLoading} 
                      className="!w-auto !mt-0 px-8"
                    >
                      <Save size={18} /> Simpan Perubahan
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-ink-light mb-1">Nama Lengkap</p>
                    <p className="font-semibold text-ink">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink-light mb-1">Alamat Email</p>
                    <p className="font-semibold text-ink">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink-light mb-1">Nomor Telepon</p>
                    <p className="font-semibold text-ink">{user.phone || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink-light mb-1">Status Verifikasi</p>
                    {user.isVerified ? (
                      <span className="text-green-600 font-semibold text-sm bg-green-50 px-2 py-0.5 rounded">Terverifikasi</span>
                    ) : (
                      <span className="text-orange-500 font-semibold text-sm bg-orange-50 px-2 py-0.5 rounded">Belum Diverifikasi</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Placeholder untuk Kos Tersimpan (hanya jika SEEKER) */}
            {user.role === 'SEEKER' && !isEditing && (
              <div className="bg-surface border border-outline-light rounded-3xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-ink flex items-center gap-2">
                    <Heart className="text-red-500" /> Kos Favorit
                  </h3>
                  <button className="text-xs font-semibold text-brand hover:text-white border border-brand hover:bg-brand px-4 py-1.5 rounded-full transition-colors">
                    Lihat Semua
                  </button>
                </div>
                
                <div className="flex flex-col items-center justify-center py-10 bg-background/50 rounded-2xl border border-dashed border-outline">
                  <Heart size={48} className="text-outline-light mb-4" />
                  <p className="text-ink-light font-medium mb-4">Belum ada kos yang difavoritkan.</p>
                  <Link 
                    to="/" 
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-brand hover:bg-brand-dark text-white font-medium rounded-full transition-colors shadow-brand/20 shadow-md"
                  >
                    Mulai Eksplorasi
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
