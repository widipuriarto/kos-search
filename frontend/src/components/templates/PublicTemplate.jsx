import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Share2, MessageCircle, Globe, User, LogOut, LayoutDashboard } from 'lucide-react';
import Button from '../atoms/Button';

const PublicTemplate = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Menutup dropdown ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
    navigate('/');
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-500 ease-in-out translate-y-0 opacity-100 bg-white/90 backdrop-blur-md shadow-sm border-b border-outline-light">
        {/* perlebar navbar sebanyak 10px lagi: h-16 (64px) -> h-[74px] */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[74px] flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="font-serif font-bold text-2xl text-brand-dark tracking-tight">
              KosSearch
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#ai-assistant" onClick={(e) => scrollToSection(e, 'ai-assistant')} className="text-sm font-medium text-ink-light hover:text-brand transition-colors cursor-pointer">
              AI Assistant
            </a>
            <a href="#rekomendasi" onClick={(e) => scrollToSection(e, 'rekomendasi')} className="text-sm font-medium text-ink-light hover:text-brand transition-colors cursor-pointer">
              Rekomendasi
            </a>
            <a href="#tentang-kami" onClick={(e) => scrollToSection(e, 'tentang-kami')} className="text-sm font-medium text-ink-light hover:text-brand transition-colors cursor-pointer">
              Tentang Kami
            </a>
            <a href="#kontak" onClick={(e) => scrollToSection(e, 'kontak')} className="text-sm font-medium text-ink-light hover:text-brand transition-colors cursor-pointer">
              Kontak
            </a>
          </div>

          {/* Auth Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-full bg-brand-soft hover:bg-brand-soft border border-brand/20 flex items-center justify-center text-brand transition-colors focus:outline-none focus:ring-2 focus:ring-brand/50 shadow-sm"
                  aria-label="Profile Menu"
                >
                  <User size={20} />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-outline-light py-2 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 mb-1">
                      <p className="text-sm font-bold text-ink truncate">{user?.name}</p>
                      <p className="text-xs text-ink-light truncate">{user?.email}</p>
                    </div>
                    
                    <hr className="border-outline-light my-1" />
                    
                    {user?.role === 'ADMIN' && (
                      <Link 
                        to="/admin"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-ink hover:bg-surface transition-colors"
                      >
                        <LayoutDashboard size={16} className="text-ink-muted" />
                        Dasbor Admin
                      </Link>
                    )}

                    {user?.role === 'OWNER' && (
                      <Link 
                        to="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-ink hover:bg-surface transition-colors"
                      >
                        <LayoutDashboard size={16} className="text-ink-muted" />
                        Dasbor Owner
                      </Link>
                    )}

                    <Link 
                      to="/profile" 
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-ink hover:bg-surface transition-colors"
                    >
                      <User size={16} className="text-ink-muted" />
                      Lihat Profil
                    </Link>
                    
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full shadow-md shadow-orange-500/20 transition-all hover:-translate-y-0.5">
                  Masuk
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-outline-light py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Kiri: Logo & Deskripsi */}
            <div className="text-center md:text-left">
              <p className="font-serif text-3xl font-bold text-brand-dark mb-2">KosSearch</p>
              <p className="text-sm text-ink-light max-w-sm">
                Teman terbaik untuk mencari hunian sementara yang nyaman, aman, dan berkelas. Semua ada di genggaman Anda.
              </p>
            </div>

            {/* Kanan: Media Sosial */}
            <div className="flex flex-col items-center md:items-end gap-4">
              <p className="font-semibold text-ink">Temukan Kami</p>
              <div className="flex items-center gap-4">
                <a href="#" aria-label="Instagram" className="w-10 h-10 bg-surface border border-outline-light rounded-full flex items-center justify-center text-ink-light hover:text-brand hover:border-brand hover:shadow-md transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" aria-label="WhatsApp" className="w-10 h-10 bg-surface border border-outline-light rounded-full flex items-center justify-center text-ink-light hover:text-brand hover:border-brand hover:shadow-md transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </a>
              </div>
            </div>
            
          </div>
          
          <div className="border-t border-outline-light mt-10 pt-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-ink-muted">&copy; {new Date().getFullYear()} KosSearch. Hak cipta dilindungi undang-undang.</p>
            <p className="text-xs text-ink-muted font-medium bg-brand-soft/50 px-3 py-1 rounded-full text-brand-dark">Built with ❤️ for better living.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicTemplate;
