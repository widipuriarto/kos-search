import React, { useState, useEffect } from 'react';
import { Home, Star, LayoutDashboard, Plus, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';

const OwnerOverview = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    totalKos: 0,
    totalAvailableRooms: 0,
    totalReviews: 0,
    averageRating: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/kos/owner/stats');
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch owner stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-brand">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-surface border border-outline-light rounded-3xl p-8 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-soft to-white opacity-40 rounded-full translate-x-1/3 -translate-y-1/3 z-0"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-serif font-bold text-ink mb-2">
            Selamat datang kembali, {user?.name}!
          </h1>
          <p className="text-ink-light max-w-2xl text-lg">
            Pantau ringkasan performa bisnis properti Anda. Pastikan selalu memperbarui data ketersediaan kamar agar pencari kos tidak kecewa.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Properti */}
        <div className="bg-white border border-outline-light rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
              <Home size={24} />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-ink-light uppercase tracking-wider mb-1">Total Properti</p>
            <h3 className="text-3xl font-bold text-ink">{stats.totalKos}</h3>
          </div>
        </div>

        {/* Total Kamar Kosong */}
        <div className="bg-white border border-outline-light rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center">
              <LayoutDashboard size={24} />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-ink-light uppercase tracking-wider mb-1">Kamar Tersedia</p>
            <h3 className="text-3xl font-bold text-ink">{stats.totalAvailableRooms}</h3>
          </div>
        </div>

        {/* Total Review */}
        <div className="bg-white border border-outline-light rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
              <Star size={24} />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-ink-light uppercase tracking-wider mb-1">Total Ulasan</p>
            <h3 className="text-3xl font-bold text-ink">{stats.totalReviews}</h3>
          </div>
        </div>

        {/* Average Rating */}
        <div className="bg-white border border-outline-light rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-xl flex items-center justify-center">
              <Star size={24} className="fill-yellow-500" />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-ink-light uppercase tracking-wider mb-1">Rata-rata Rating</p>
            <h3 className="text-3xl font-bold text-ink">
              {stats.averageRating ? stats.averageRating.toFixed(1) : '0.0'}
            </h3>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-ink mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            to="/dashboard/kos/new"
            className="flex items-center justify-between p-6 bg-brand-soft/30 hover:bg-brand-soft/50 border border-brand/20 rounded-2xl transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white text-brand rounded-full flex items-center justify-center shadow-sm">
                <Plus size={24} />
              </div>
              <div>
                <h3 className="font-bold text-ink mb-1 group-hover:text-brand transition-colors">Tambah Properti Baru</h3>
                <p className="text-sm text-ink-light">Daftarkan kos baru Anda ke platform KosSearch.</p>
              </div>
            </div>
            <ArrowRight className="text-brand opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
          </Link>

          <Link 
            to="/dashboard/reviews"
            className="flex items-center justify-between p-6 bg-surface hover:bg-surface-hover border border-outline-light rounded-2xl transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white text-ink rounded-full flex items-center justify-center shadow-sm border border-outline-light">
                <Star size={24} />
              </div>
              <div>
                <h3 className="font-bold text-ink mb-1 group-hover:text-brand transition-colors">Lihat Semua Ulasan</h3>
                <p className="text-sm text-ink-light">Pantau penilaian dan saran dari penyewa kos Anda.</p>
              </div>
            </div>
            <ArrowRight className="text-ink-light opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
          </Link>
        </div>
      </div>

    </div>
  );
};

export default OwnerOverview;
