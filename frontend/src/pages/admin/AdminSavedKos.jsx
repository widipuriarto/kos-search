import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Heart, Loader2 } from 'lucide-react';

const AdminSavedKos = () => {
  const [savedKos, setSavedKos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSavedKos = async () => {
      try {
        setIsLoading(true);
        const data = await adminService.getSavedKos();
        if (data.success) {
          setSavedKos(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch saved kos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSavedKos();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-rose-600">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900 mb-1">Rekap Kos Disimpan</h1>
        <p className="text-sm text-slate-500">Melihat daftar properti yang telah difavoritkan oleh pencari.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
                <th className="p-4">Pengguna</th>
                <th className="p-4">Properti Kos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {savedKos.length === 0 ? (
                <tr>
                  <td colSpan="2" className="p-8 text-center text-slate-500">
                    <Heart className="mx-auto mb-3 text-slate-400" size={32} />
                    Belum ada kos yang difavoritkan.
                  </td>
                </tr>
              ) : (
                savedKos.map((s) => (
                  <tr key={`${s.userId}-${s.kosId}`} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-slate-900">{s.user.name}</div>
                      <div className="text-xs text-slate-500">{s.user.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-slate-700">{s.kos.name}</div>
                      <div className="text-xs text-slate-500">{s.kos.city}</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSavedKos;
