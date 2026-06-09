import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Star, Loader2 } from 'lucide-react';

const DashboardReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/kos/owner/reviews');
        if (response.data.success) {
          setReviews(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch owner reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-brand">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-ink mb-1">Daftar Review</h1>
        <p className="text-sm text-ink-light">Lihat ulasan dan penilaian dari penyewa untuk semua properti kos Anda.</p>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-surface rounded-2xl shadow-sm border border-outline-light p-12 text-center">
          <Star className="mx-auto mb-3 text-outline" size={40} />
          <h3 className="text-xl font-bold text-ink mb-2">Belum Ada Review</h3>
          <p className="text-ink-light">Properti kos Anda belum mendapatkan ulasan dari penyewa.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r) => (
            <div key={r.id} className="bg-surface rounded-2xl shadow-sm border border-outline-light p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-ink text-lg">{r.kos.name}</h3>
                  <p className="text-sm text-ink-light font-medium">Dari: {r.user.name}</p>
                </div>
                <div className="flex items-center bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-100">
                  <Star size={16} className="fill-orange-500 text-orange-500 mr-1.5" />
                  <span className="font-bold text-orange-600">{r.rating}.0</span>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                <p className="text-ink italic text-sm leading-relaxed">
                  "{r.comment || 'Penyewa ini tidak meninggalkan komentar, hanya memberikan penilaian.'}"
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-xs text-ink-muted">
                  Dikirim pada {new Date(r.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardReviews;
