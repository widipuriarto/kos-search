import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, MapPin, Eye, EyeOff, Loader2, Home } from 'lucide-react';
import { authService } from '../../services/authService'; // Kita perlu menambahkan apiKos ke service
import { api } from '../../services/api';

import { useAuthStore } from '../../store/useAuthStore';

const KosList = () => {
  const { user } = useAuthStore();
  const [kosList, setKosList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchKosList = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/kos/owner');
      if (response.data.success) {
        setKosList(response.data.data);
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Gagal memuat daftar kos.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKosList();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kos ini? Data tidak dapat dikembalikan.')) {
      try {
        await api.delete(`/kos/${id}`);
        setKosList(kosList.filter(kos => kos.id !== id));
      } catch (error) {
        alert(error.response?.data?.message || 'Gagal menghapus kos.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-brand">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Banner Peringatan jika belum diverifikasi */}
      {user && !user.isVerified && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-bold text-yellow-800">Akun sedang ditinjau</h3>
              <div className="mt-1 text-sm text-yellow-700">
                <p>Akun Anda belum diverifikasi oleh Admin. Anda belum dapat mengiklankan kos baru sampai proses peninjauan selesai.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-ink mb-1">Daftar Kos Saya</h1>
          <p className="text-sm text-ink-light">Kelola semua properti kos Anda di satu tempat.</p>
        </div>
        
        {/* Sembunyikan tombol jika belum diverifikasi */}
        {user?.isVerified && (
          <Link 
            to="/dashboard/kos/new" 
            className="bg-brand hover:bg-brand-dark text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-brand/20 flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            <span>Tambah Kos Baru</span>
          </Link>
        )}
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
          {errorMsg}
        </div>
      )}

      {/* Grid Kos Cards */}
      {kosList.length === 0 && !errorMsg ? (
        <div className="bg-surface border border-outline border-dashed rounded-3xl p-12 text-center">
          <div className="w-16 h-16 bg-brand-soft rounded-full flex items-center justify-center mx-auto mb-4 text-brand">
            <Home size={32} />
          </div>
          <h3 className="text-lg font-semibold text-ink mb-2">Belum ada properti</h3>
          <p className="text-ink-light mb-6">Anda belum mendaftarkan properti kos satupun. Mulai iklankan kos Anda sekarang!</p>
          {user?.isVerified ? (
            <Link 
              to="/dashboard/kos/new" 
              className="inline-flex items-center justify-center px-6 py-2.5 bg-brand hover:bg-brand-dark text-white font-medium rounded-full transition-colors shadow-brand/20 shadow-md"
            >
              <Plus size={18} className="mr-2" /> Tambah Kos Pertama Anda
            </Link>
          ) : (
            <button disabled className="inline-flex items-center justify-center px-6 py-2.5 bg-outline-light text-ink-muted font-medium rounded-full cursor-not-allowed">
              Menunggu Verifikasi...
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {kosList.map((kos) => (
            <div key={kos.id} className="bg-surface border border-outline-light rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col group">
              {/* Image Header */}
              <div className="h-48 bg-outline relative overflow-hidden">
                {kos.images && kos.images.length > 0 ? (
                  <img 
                    src={kos.images[0].url} 
                    alt={kos.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ink-light bg-surface-hover">
                    <span className="text-xs">No Image</span>
                  </div>
                )}
                
                {/* Status Badge */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full backdrop-blur-md shadow-sm flex items-center gap-1 ${
                    kos.status === 'ACTIVE' 
                      ? 'bg-green-500/90 text-white border border-green-400/50' 
                      : 'bg-yellow-500/90 text-white border border-yellow-400/50'
                  }`}>
                    {kos.status === 'ACTIVE' ? <Eye size={12} /> : <EyeOff size={12} />}
                    {kos.status === 'ACTIVE' ? 'Aktif' : 'Disembunyikan'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-ink line-clamp-1">{kos.name}</h3>
                  <span className="text-brand font-bold shrink-0">Rp {kos.price.toLocaleString('id-ID')}</span>
                </div>
                
                <div className="flex items-center text-ink-light text-sm mb-4">
                  <MapPin size={14} className="mr-1 shrink-0" />
                  <span className="truncate">{kos.city}</span>
                </div>
                
                <div className="mt-auto flex items-center gap-2 text-xs">
                  <span className="bg-surface-hover text-ink-muted px-2 py-1 rounded-md">
                    Kamar Kosong: <strong className="text-ink">{kos.availableRooms}</strong>
                  </span>
                  <span className="bg-surface-hover text-ink-muted px-2 py-1 rounded-md">
                    Tipe: <strong className="text-ink">{kos.type}</strong>
                  </span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="border-t border-outline-light p-3 flex gap-2 bg-surface-hover/50">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-ink-light hover:text-brand transition-colors rounded-lg hover:bg-brand/5">
                  <Edit size={16} /> Edit
                </button>
                <div className="w-px bg-outline-light my-1" />
                <button 
                  onClick={() => handleDelete(kos.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-ink-light hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                >
                  <Trash2 size={16} /> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KosList;
