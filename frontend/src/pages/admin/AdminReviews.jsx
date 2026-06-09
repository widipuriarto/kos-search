import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Star, Loader2 } from 'lucide-react';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const data = await adminService.getReviews();
        if (data.success) {
          setReviews(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-orange-600">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900 mb-1">Daftar Review</h1>
        <p className="text-sm text-slate-500">Semua ulasan yang diberikan oleh pencari kos.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
                <th className="p-4">Pengguna</th>
                <th className="p-4">Kos</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Komentar</th>
                <th className="p-4">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">
                    <Star className="mx-auto mb-3 text-slate-400" size={32} />
                    Belum ada review.
                  </td>
                </tr>
              ) : (
                reviews.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{r.user.name}</td>
                    <td className="p-4 text-slate-600">{r.kos.name}</td>
                    <td className="p-4">
                      <div className="flex items-center text-orange-500 font-medium">
                        <Star size={16} className="fill-orange-500 mr-1" /> {r.rating}
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 max-w-xs truncate" title={r.comment}>
                      {r.comment || '-'}
                    </td>
                    <td className="p-4 text-slate-600">
                      {new Date(r.createdAt).toLocaleDateString('id-ID')}
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

export default AdminReviews;
