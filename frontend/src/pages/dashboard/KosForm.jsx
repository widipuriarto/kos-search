import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import InputField from '../../components/molecules/InputField';
import Button from '../../components/atoms/Button';

import { useAuthStore } from '../../store/useAuthStore';

const KosForm = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Early return protection jika owner belum diverifikasi
  if (user && !user.isVerified) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="bg-yellow-50 p-6 rounded-full mb-4">
          <X size={48} className="text-yellow-500" />
        </div>
        <h2 className="text-2xl font-bold text-ink mb-2">Akses Ditolak</h2>
        <p className="text-ink-light max-w-md mb-6">
          Akun Anda sedang dalam proses peninjauan oleh Admin. Anda tidak dapat menambahkan kos baru sampai akun disetujui.
        </p>
        <Link 
          to="/dashboard/kos" 
          className="inline-flex items-center justify-center px-6 py-2.5 bg-ink hover:bg-ink-light text-white font-medium rounded-full transition-colors shadow-lg shadow-ink/10"
        >
          <ArrowLeft size={18} className="mr-2" /> Kembali ke Daftar Kos
        </Link>
      </div>
    );
  }

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: 'Semarang',
    price: '',
    type: 'CAMPUR',
    availableRooms: '',
  });

  const [images, setImages] = useState([]); // Array of File objects
  const [imagePreviews, setImagePreviews] = useState([]); // Array of strings (URLs)

  // Dalam implementasi nyata, facilities ini harus diambil dari API GET /api/facilities
  // Untuk sementara, kita hardcode beberapa contoh
  const MOCK_FACILITIES = [
    { id: '1', name: 'WiFi' },
    { id: '2', name: 'AC' },
    { id: '3', name: 'Kamar Mandi Dalam' },
    { id: '4', name: 'Dapur Umum' },
    { id: '5', name: 'Parkir Motor' },
  ];
  const [selectedFacilities, setSelectedFacilities] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Batasi maksimal 5 gambar
    if (images.length + files.length > 5) {
      alert('Maksimal hanya 5 gambar yang diperbolehkan.');
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    // Buat URL preview
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const toggleFacility = (id) => {
    setSelectedFacilities(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    if (images.length === 0) {
      setErrorMsg('Harap unggah minimal 1 foto kos.');
      setIsLoading(false);
      return;
    }

    // Buat FormData karena kita mengirim file
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('description', formData.description);
    submitData.append('address', formData.address);
    submitData.append('city', formData.city);
    submitData.append('price', formData.price);
    submitData.append('type', formData.type);
    submitData.append('availableRooms', formData.availableRooms);
    
    // Append facilities array as string
    submitData.append('facilities', JSON.stringify(selectedFacilities));

    // Append images
    images.forEach((image) => {
      submitData.append('images', image);
    });

    try {
      const response = await api.post('/kos', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data.success) {
        alert('Kos berhasil ditambahkan!');
        navigate('/dashboard/kos');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || 'Gagal menambahkan kos.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="flex items-center gap-4">
        <Link to="/dashboard/kos" className="p-2 bg-surface hover:bg-surface-hover rounded-full transition-colors border border-outline-light">
          <ArrowLeft size={20} className="text-ink" />
        </Link>
        <div>
          <h1 className="text-2xl font-serif font-bold text-ink">Tambah Kos Baru</h1>
          <p className="text-sm text-ink-light">Lengkapi detail properti agar mudah ditemukan pencari.</p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-surface border border-outline-light rounded-3xl p-6 md:p-8 space-y-8">
        
        {/* Seksi 1: Informasi Dasar */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-ink border-b border-outline-light pb-2">Informasi Dasar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField 
              label="Nama Kos" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Contoh: Kos Mawar Indah" 
              required 
            />
            
            <div className="space-y-1.5 w-full">
              <label className="text-sm font-medium text-ink ml-1 block">Tipe Kos</label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-surface border border-outline-light focus:border-brand focus:ring-2 focus:ring-brand/20 rounded-2xl outline-none transition-all duration-200"
              >
                <option value="CAMPUR">Campur</option>
                <option value="PUTRA">Putra</option>
                <option value="PUTRI">Putri</option>
              </select>
            </div>

            <InputField 
              label="Harga per Bulan (Rp)" 
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Contoh: 1500000" 
              required 
            />

            <InputField 
              label="Kamar Tersedia" 
              name="availableRooms"
              type="number"
              value={formData.availableRooms}
              onChange={handleInputChange}
              placeholder="Contoh: 5" 
              required 
            />
          </div>

          <div className="space-y-1.5 w-full">
            <label className="text-sm font-medium text-ink ml-1 block">Deskripsi Kos</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 bg-surface border border-outline-light focus:border-brand focus:ring-2 focus:ring-brand/20 rounded-2xl outline-none transition-all duration-200 resize-none"
              placeholder="Ceritakan kelebihan kos Anda..."
              required
            ></textarea>
          </div>
        </section>

        {/* Seksi 2: Lokasi */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-ink border-b border-outline-light pb-2">Lokasi</h2>
          
          <InputField 
            label="Kota" 
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Semarang" 
            required 
          />

          <div className="space-y-1.5 w-full">
            <label className="text-sm font-medium text-ink ml-1 block">Alamat Lengkap</label>
            <textarea 
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="2"
              className="w-full px-4 py-3 bg-surface border border-outline-light focus:border-brand focus:ring-2 focus:ring-brand/20 rounded-2xl outline-none transition-all duration-200 resize-none"
              placeholder="Jalan, RT/RW, Kelurahan..."
              required
            ></textarea>
          </div>
        </section>

        {/* Seksi 3: Fasilitas */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-ink border-b border-outline-light pb-2">Fasilitas Tersedia</h2>
          <div className="flex flex-wrap gap-3">
            {MOCK_FACILITIES.map(fac => (
              <button
                key={fac.id}
                type="button"
                onClick={() => toggleFacility(fac.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFacilities.includes(fac.id)
                    ? 'bg-brand text-white border-brand'
                    : 'bg-surface border border-outline-light text-ink-light hover:border-brand/50'
                }`}
              >
                {fac.name}
              </button>
            ))}
          </div>
        </section>

        {/* Seksi 4: Foto */}
        <section className="space-y-4">
          <div className="flex justify-between items-end border-b border-outline-light pb-2">
            <h2 className="text-lg font-bold text-ink">Foto Properti</h2>
            <span className="text-sm text-ink-light">{images.length}/5 diunggah</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Upload Button */}
            {images.length < 5 && (
              <label className="border-2 border-dashed border-outline-light hover:border-brand hover:bg-brand-soft/50 rounded-2xl h-32 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                <Upload size={24} className="text-ink-light group-hover:text-brand mb-2" />
                <span className="text-xs text-ink-light font-medium">Unggah Foto</span>
                <input 
                  type="file" 
                  multiple 
                  accept="image/png, image/jpeg, image/webp" 
                  className="hidden" 
                  onChange={handleImageChange}
                />
              </label>
            )}

            {/* Image Previews */}
            {imagePreviews.map((preview, idx) => (
              <div key={idx} className="relative rounded-2xl h-32 overflow-hidden border border-outline-light group">
                <img src={preview} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-muted">Format yang didukung: JPG, PNG, WEBP. Maksimal 5MB per foto.</p>
        </section>

        {/* Submit Button */}
        <div className="pt-6 border-t border-outline-light">
          <Button type="submit" isLoading={isLoading} className="md:w-auto px-12 ml-auto">
            Simpan Properti
          </Button>
        </div>

      </form>
    </div>
  );
};

export default KosForm;
