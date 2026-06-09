import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronsLeft,
  ChevronsRight,
  ShieldCheck,
  Home,
  List,
  Star,
  Heart,
  MessageSquare,
  Globe
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const AdminTemplate = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Overview', icon: LayoutDashboard, path: '/admin' },
    { name: 'Total Pengguna', icon: Users, path: '/admin/users' },
    { name: 'Total Properti', icon: Home, path: '/admin/kos' },
    { name: 'Verifikasi Akun', icon: ShieldCheck, path: '/admin/verification' },
    { name: 'Fasilitas', icon: List, path: '/admin/facilities' },
    { name: 'Review', icon: Star, path: '/admin/reviews' },
    { name: 'Saved Kos', icon: Heart, path: '/admin/saved-kos' },
    { name: 'Pesan', icon: MessageSquare, path: '/admin/messages' },
    { name: 'Pengaturan', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="h-screen bg-slate-50 flex font-sans overflow-hidden">
      
      {/* ================= SIDEBAR (DESKTOP) ================= */}
      <aside 
        className={`hidden md:flex flex-col bg-slate-900 text-slate-300 transition-all duration-300 relative ${
          isSidebarCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        {/* Header/Logo Area */}
        <div className="h-16 flex items-center justify-between border-b border-slate-800 px-4">
          {!isSidebarCollapsed ? (
            <span className="font-serif font-bold text-xl text-white truncate">
              KosSearch Admin
            </span>
          ) : (
            <span className="font-serif font-bold text-xl text-white mx-auto">
              KSA
            </span>
          )}
          
          {/* Toggle Button Inside Header */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            {isSidebarCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 flex flex-col gap-2 px-3 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600/20 text-blue-400 font-medium' 
                    : 'hover:bg-slate-800 hover:text-white'
                } ${isSidebarCollapsed ? 'justify-center' : ''}`
              }
              title={isSidebarCollapsed ? link.name : ''}
            >
              <link.icon size={20} className={isSidebarCollapsed ? 'shrink-0' : ''} />
              {!isSidebarCollapsed && <span className="truncate">{link.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer Actions (Home & Logout) */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button 
            onClick={() => navigate('/')}
            className={`flex items-center gap-3 px-3 py-3 w-full rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 ${
              isSidebarCollapsed ? 'justify-center' : ''
            }`}
            title={isSidebarCollapsed ? 'Kembali ke Beranda' : ''}
          >
            <Globe size={20} className={isSidebarCollapsed ? 'shrink-0' : ''} />
            {!isSidebarCollapsed && <span>Kembali ke Beranda</span>}
          </button>
          
          <button 
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200 ${
              isSidebarCollapsed ? 'justify-center' : ''
            }`}
            title={isSidebarCollapsed ? 'Logout' : ''}
          >
            <LogOut size={20} className={isSidebarCollapsed ? 'shrink-0' : ''} />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ================= MOBILE SIDEBAR (OVERLAY) ================= */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <aside 
        className={`fixed inset-y-0 left-0 w-64 bg-slate-900 text-slate-300 shadow-2xl z-50 transform transition-transform duration-300 md:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          <span className="font-serif font-bold text-xl text-white">
            KosSearch Admin
          </span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/admin'}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600/20 text-blue-400 font-medium' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <link.icon size={20} />
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-10">
          
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-slate-600 hover:text-slate-900 transition-colors"
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:block">
            {/* Breadcrumb or Title placeholder can go here */}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">{user?.name || 'Administrator'}</p>
              <p className="text-xs text-blue-600 font-medium">Super Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-600 flex items-center justify-center text-blue-700 font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        {/* Page Content (Outlet) */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminTemplate;
