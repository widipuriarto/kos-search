import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Home, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronsLeft,
  ChevronsRight,
  Globe,
  Star
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const DashboardTemplate = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  
  // State untuk Desktop Sidebar (Collapsed vs Expanded)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // State untuk Mobile Sidebar (Open vs Closed)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Kos Saya', icon: Home, path: '/dashboard/kos' },
    { name: 'Review', icon: Star, path: '/dashboard/reviews' },
    { name: 'Pesan', icon: MessageSquare, path: '/dashboard/messages' },
    { name: 'Pengaturan', icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <div className="h-screen bg-background flex font-sans overflow-hidden">
      
      {/* ================= SIDEBAR (DESKTOP) ================= */}
      <aside 
        className={`hidden md:flex flex-col bg-surface border-r border-outline-light transition-all duration-300 relative ${
          isSidebarCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        {/* Header/Logo Area */}
        <div className="h-16 flex items-center justify-between border-b border-outline-light px-4">
          {!isSidebarCollapsed ? (
            <span className="font-serif font-bold text-xl text-brand-dark truncate">
              KosSearch Owner
            </span>
          ) : (
            <span className="font-serif font-bold text-xl text-brand-dark mx-auto">
              KS
            </span>
          )}
          
          {/* Toggle Button Inside Header */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-ink-light hover:text-brand transition-colors"
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
              end={link.path === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-brand/10 text-brand-dark font-medium' 
                    : 'text-ink-light hover:bg-surface-hover hover:text-ink'
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
        <div className="p-4 border-t border-outline-light space-y-2">
          <button 
            onClick={() => navigate('/')}
            className={`flex items-center gap-3 px-3 py-3 w-full rounded-xl text-ink-light hover:bg-surface-hover hover:text-ink transition-all duration-200 ${
              isSidebarCollapsed ? 'justify-center' : ''
            }`}
            title={isSidebarCollapsed ? 'Kembali ke Beranda' : ''}
          >
            <Globe size={20} className={isSidebarCollapsed ? 'shrink-0' : ''} />
            {!isSidebarCollapsed && <span>Kembali ke Beranda</span>}
          </button>
          
          <button 
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200 ${
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
      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-ink/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile Drawer */}
      <aside 
        className={`fixed inset-y-0 left-0 w-64 bg-surface shadow-2xl z-50 transform transition-transform duration-300 md:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-outline-light">
          <span className="font-serif font-bold text-xl text-brand-dark">
            KosSearch
          </span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-ink-light hover:text-ink">
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/dashboard'}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-brand/10 text-brand-dark font-medium' 
                    : 'text-ink-light hover:bg-surface-hover hover:text-ink'
                }`
              }
            >
              <link.icon size={20} />
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-outline-light">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-surface border-b border-outline-light flex items-center justify-between px-4 md:px-8 z-10">
          
          {/* Mobile Hamburger */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-ink hover:text-brand transition-colors"
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:block">
            {/* Breadcrumb or Title placeholder can go here */}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-ink">{user?.name || 'Owner'}</p>
              <p className="text-xs text-brand font-medium">Pemilik Kos</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-soft border-2 border-brand flex items-center justify-center text-brand-dark font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'O'}
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

export default DashboardTemplate;
