import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import { Users, Home, ShieldAlert, Loader2, List, Star, Heart } from 'lucide-react';

const AdminOverview = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getStats();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-blue-600">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900 mb-1">Overview Sistem</h1>
        <p className="text-sm text-slate-500">Pantau performa dan statistik platform KosSearch Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* Total Pengguna */}
        <div 
          onClick={() => navigate('/admin/users')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 group-hover:text-blue-600 transition-colors">Total Pengguna</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Users size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.users.total}</p>
          <p className="text-xs text-slate-500 mt-2">
            <span className="font-semibold text-slate-700">{stats.users.seekers}</span> Seeker, <span className="font-semibold text-slate-700">{stats.users.owners}</span> Owner
          </p>
        </div>

        {/* Pemilik Belum Verifikasi */}
        <div 
          onClick={() => navigate('/admin/verification')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md hover:border-yellow-300 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 group-hover:text-yellow-600 transition-colors">Antrean Verifikasi</h3>
            <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg group-hover:bg-yellow-500 group-hover:text-white transition-colors">
              <ShieldAlert size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.users.unverifiedOwners}</p>
          <p className="text-xs text-slate-500 mt-2">Pemilik kos menunggu persetujuan</p>
        </div>

        {/* Total Kos */}
        <div 
          onClick={() => navigate('/admin/kos')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md hover:border-emerald-300 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 group-hover:text-emerald-600 transition-colors">Total Properti</h3>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Home size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.kos.total}</p>
          <p className="text-xs text-slate-500 mt-2">
            <span className="font-semibold text-emerald-600">{stats.kos.active}</span> Aktif, <span className="font-semibold text-slate-400">{stats.kos.hidden}</span> Disembunyikan
          </p>
        </div>

        {/* Total Fasilitas */}
        <div 
          onClick={() => navigate('/admin/facilities')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md hover:border-purple-300 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 group-hover:text-purple-600 transition-colors">Master Fasilitas</h3>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <List size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.extras.facilities}</p>
          <p className="text-xs text-slate-500 mt-2">Item fasilitas terdaftar</p>
        </div>

        {/* Total Review */}
        <div 
          onClick={() => navigate('/admin/reviews')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md hover:border-orange-300 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 group-hover:text-orange-600 transition-colors">Total Review</h3>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <Star size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.extras.reviews}</p>
          <p className="text-xs text-slate-500 mt-2">Ulasan dari pengguna</p>
        </div>

        {/* Total Saved Kos */}
        <div 
          onClick={() => navigate('/admin/saved-kos')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md hover:border-rose-300 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 group-hover:text-rose-600 transition-colors">Kos Disimpan</h3>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg group-hover:bg-rose-500 group-hover:text-white transition-colors">
              <Heart size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.extras.savedKos}</p>
          <p className="text-xs text-slate-500 mt-2">Total klik favorit kos</p>
        </div>

      </div>
    </div>
  );
};

export default AdminOverview;
