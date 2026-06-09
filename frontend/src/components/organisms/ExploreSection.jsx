import React, { useState, useEffect } from 'react';
import { MapPin, Search, Filter, Loader2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import KosCard from './KosCard';

const ExploreSection = ({ 
  handleSearch, 
  city, 
  setCity, 
  keyword, 
  setKeyword, 
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  type,
  setType,
  isLoading, 
  kosList 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const itemsPerPage = 10;

  // Reset page ke 1 ketika kosList berubah (karena filter/search baru)
  useEffect(() => {
    setCurrentPage(1);
  }, [kosList]);

  // Kalkulasi Pagination
  const totalPages = Math.ceil(kosList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = kosList.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const applyAdvancedFilter = (e) => {
    e.preventDefault();
    setIsFilterOpen(false);
    handleSearch(e);
  };

  return (
    <section id="rekomendasi" className="py-16 bg-white border-t border-outline-light flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink mb-3">Atau Cari Secara Manual</h2>
          <p className="text-ink-light">Gunakan filter pencarian klasik untuk menemukan kos yang tepat.</p>
        </div>

        {/* Manual Search Bar */}
        <div className="bg-surface p-2 rounded-2xl md:rounded-full border border-outline-light flex flex-col md:flex-row items-center gap-2 max-w-4xl mx-auto mb-16 relative z-10">
          <form onSubmit={handleSearch} className="flex-1 flex flex-col md:flex-row items-center w-full">
            {/* Location Input */}
            <div className="flex items-center flex-1 px-4 py-3 md:py-2 border-b md:border-b-0 md:border-r border-outline-light w-full">
              <MapPin className="text-ink-muted mr-3 shrink-0" size={20} />
              <div className="flex flex-col text-left w-full">
                <label className="text-[10px] font-bold text-ink-light tracking-wider uppercase">Kota</label>
                <input 
                  type="text" 
                  placeholder="Pilih kota..." 
                  className="w-full bg-transparent outline-none text-ink placeholder:text-ink-muted text-sm font-medium"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            {/* Keyword Input */}
            <div className="flex items-center flex-1 px-4 py-3 md:py-2 w-full">
              <Search className="text-ink-muted mr-3 shrink-0" size={20} />
              <div className="flex flex-col text-left w-full">
                <label className="text-[10px] font-bold text-ink-light tracking-wider uppercase">Katakunci</label>
                <input 
                  type="text" 
                  placeholder="Nama kos..." 
                  className="w-full bg-transparent outline-none text-ink placeholder:text-ink-muted text-sm font-medium"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </div>

            {/* Search Button */}
            <button 
              type="submit"
              className="w-full md:w-auto mt-2 md:mt-0 bg-ink hover:bg-ink-light text-white rounded-xl md:rounded-full py-3 px-8 flex items-center justify-center transition-colors font-medium text-sm gap-2"
            >
              Terapkan
            </button>
          </form>
        </div>

        {/* Kos Grid */}
        <div className="flex justify-between items-center mb-8 relative z-20">
          <h3 className="font-bold text-xl text-ink">Katalog Kos</h3>
          
          <div className="flex items-center gap-6">
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-full border border-outline-light bg-white text-ink hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-full border border-outline-light bg-white text-ink hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
            
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors border px-4 py-2 rounded-xl ${isFilterOpen ? 'border-brand text-brand bg-brand-soft' : 'border-outline-light bg-white text-ink hover:text-brand hover:border-brand/50'}`}
              >
                <Filter size={16} /> Filter
              </button>

              {/* Advanced Filter Dropdown */}
              {isFilterOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-outline-light p-5 animate-in fade-in slide-in-from-top-2">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-ink">Filter Lanjutan</h4>
                    <button onClick={() => setIsFilterOpen(false)} className="text-ink-muted hover:text-ink">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-ink-light uppercase mb-1">Tipe Kos</label>
                      <select 
                        className="w-full p-2.5 rounded-xl border border-outline-light bg-surface text-sm text-ink outline-none focus:border-brand"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value="">Semua Tipe</option>
                        <option value="PUTRA">Putra</option>
                        <option value="PUTRI">Putri</option>
                        <option value="CAMPUR">Campur</option>
                      </select>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-ink-light uppercase mb-1">Harga Min</label>
                        <input 
                          type="number" 
                          placeholder="Rp 0"
                          className="w-full p-2.5 rounded-xl border border-outline-light bg-surface text-sm text-ink outline-none focus:border-brand"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-ink-light uppercase mb-1">Harga Max</label>
                        <input 
                          type="number" 
                          placeholder="Rp ~"
                          className="w-full p-2.5 rounded-xl border border-outline-light bg-surface text-sm text-ink outline-none focus:border-brand"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                      </div>
                    </div>

                    <button 
                      onClick={applyAdvancedFilter}
                      className="w-full bg-brand hover:bg-brand-dark text-white rounded-xl py-2.5 font-bold text-sm transition-colors mt-2"
                    >
                      Terapkan Filter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20 text-brand relative z-0">
            <Loader2 className="animate-spin" size={40} />
          </div>
        ) : kosList.length > 0 ? (
          <div className="flex flex-col gap-10 relative z-0">
            {/* Grid 5 Kolom */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {currentItems.map((kos) => (
                <KosCard key={kos.id} kos={kos} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-surface rounded-2xl border border-outline-light border-dashed relative z-0">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-ink-light border border-outline-light">
              <Search size={32} />
            </div>
            <h3 className="text-lg font-bold text-ink mb-1">Kos Tidak Ditemukan</h3>
            <p className="text-sm text-ink-light">Coba ubah katakunci atau lokasi pencarian Anda.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default ExploreSection;
