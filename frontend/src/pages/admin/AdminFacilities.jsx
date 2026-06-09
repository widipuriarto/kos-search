import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { List, Loader2, Plus, Trash2 } from 'lucide-react';

const AdminFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');

  const fetchFacilities = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.getFacilities();
      if (data.success) {
        setFacilities(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch facilities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setIsAdding(true);
      const res = await adminService.addFacility({ name, icon });
      if (res.success) {
        setFacilities([...facilities, res.data]);
        setName('');
        setIcon('');
      }
    } catch (error) {
      alert('Gagal menambahkan fasilitas.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus fasilitas ini?')) return;
    
    try {
      const res = await adminService.deleteFacility(id);
      if (res.success) {
        setFacilities(facilities.filter(f => f.id !== id));
      }
    } catch (error) {
      alert('Gagal menghapus fasilitas.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-purple-600">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900 mb-1">Fasilitas Kos</h1>
        <p className="text-sm text-slate-500">Kelola master data fasilitas yang bisa dipilih oleh pemilik kos.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form Tambah */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Plus size={18} /> Tambah Baru
            </h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Fasilitas</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Misal: AC, WiFi"
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Icon (Opsional)</label>
                <input 
                  type="text" 
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="Misal: wifi, snowflake"
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
                />
              </div>
              <button 
                type="submit"
                disabled={isAdding}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors disabled:opacity-70 flex justify-center"
              >
                {isAdding ? <Loader2 className="animate-spin" size={20} /> : 'Simpan'}
              </button>
            </form>
          </div>
        </div>

        {/* Tabel Data */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
                    <th className="p-4">Nama Fasilitas</th>
                    <th className="p-4">Icon String</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {facilities.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="p-8 text-center text-slate-500">
                        <List className="mx-auto mb-3 text-slate-400" size={32} />
                        Belum ada fasilitas.
                      </td>
                    </tr>
                  ) : (
                    facilities.map((f) => (
                      <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-medium text-slate-900">{f.name}</td>
                        <td className="p-4 text-slate-500 font-mono text-sm">{f.icon || '-'}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleDelete(f.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <Trash2 size={18} />
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

      </div>
    </div>
  );
};

export default AdminFacilities;
