import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Home, Loader2 } from 'lucide-react';

const AdminKos = () => {
  const [kosList, setKosList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchKos = async () => {
      try {
        setIsLoading(true);
        const data = await adminService.getKos();
        if (data.success) {
          setKosList(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch kos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchKos();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-emerald-600">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900 mb-1">Total Properti</h1>
        <p className="text-sm text-slate-500">Daftar semua properti kos di platform.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
                <th className="p-4">Nama Kos</th>
                <th className="p-4">Tipe</th>
                <th className="p-4">Kota</th>
                <th className="p-4">Pemilik</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {kosList.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">
                    <Home className="mx-auto mb-3 text-slate-400" size={32} />
                    Belum ada data kos.
                  </td>
                </tr>
              ) : (
                kosList.map((kos) => (
                  <tr key={kos.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{kos.name}</td>
                    <td className="p-4">
                      <span className="text-xs text-slate-500 border border-slate-200 px-2 py-1 rounded">
                        {kos.type}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">{kos.city}</td>
                    <td className="p-4 text-slate-600">
                      <div>{kos.owner.name}</div>
                      <div className="text-xs text-slate-400">{kos.owner.email}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-md font-medium ${
                        kos.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {kos.status}
                      </span>
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

export default AdminKos;
