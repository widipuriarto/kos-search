import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { CheckCircle, Clock, Loader2 } from 'lucide-react';

const AdminVerification = () => {
  const [pendingOwners, setPendingOwners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState(null);

  const fetchPendingOwners = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.getPendingOwners();
      if (data.success) {
        setPendingOwners(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch pending owners:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingOwners();
  }, []);

  const handleVerify = async (id) => {
    try {
      setVerifyingId(id);
      const res = await adminService.verifyOwner(id);
      if (res.success) {
        // Remove verified owner from list
        setPendingOwners(pendingOwners.filter(owner => owner.id !== id));
      }
    } catch (error) {
      alert('Gagal memverifikasi akun.');
    } finally {
      setVerifyingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-blue-600">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900 mb-1">Verifikasi Pemilik Kos</h1>
        <p className="text-sm text-slate-500">Tinjau dan setujui pendaftaran akun pemilik kos baru.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
                <th className="p-4">Nama Lengkap</th>
                <th className="p-4">Email</th>
                <th className="p-4">No. Telepon</th>
                <th className="p-4">Tanggal Daftar</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {pendingOwners.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">
                    <CheckCircle className="mx-auto mb-3 text-emerald-400" size={32} />
                    Tidak ada antrean verifikasi saat ini.
                  </td>
                </tr>
              ) : (
                pendingOwners.map((owner) => (
                  <tr key={owner.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-slate-900">{owner.name}</div>
                    </td>
                    <td className="p-4 text-slate-600">{owner.email}</td>
                    <td className="p-4 text-slate-600">{owner.phone || '-'}</td>
                    <td className="p-4 text-slate-600">
                      {new Date(owner.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleVerify(owner.id)}
                        disabled={verifyingId === owner.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {verifyingId === owner.id ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : (
                          <CheckCircle size={16} />
                        )}
                        Setujui
                      </button>
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

export default AdminVerification;
