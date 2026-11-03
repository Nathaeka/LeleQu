import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ToastContainer } from '../components/common/Toast';
import {
  LayoutDashboard,
  Fish,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  User,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { currentAdmin, logoutAdmin } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If not authenticated, redirect to login
  if (!currentAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Data Produk', path: '/admin/products', icon: Fish },
    { name: 'Kelola Artikel', path: '/admin/articles', icon: FileText },
    { name: 'Pengaturan Website', path: '/admin/settings', icon: Settings },
  ];

  const isCurrent = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF6] text-[#202923] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-neutral-200/90 shrink-0 select-none">
        {/* Sidebar Header */}
        <div className="h-20 flex items-center px-6 border-b border-neutral-100 gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#123F2E] flex items-center justify-center p-1.5 shadow-xs overflow-hidden">
            <img
              src="/public/assets/aistudio/logo_lele2_58eae7d6.png"
              alt="LeleQu"
              className="w-7 h-7 object-contain brightness-0 invert"
            />
          </div>
          <div>
            <span className="text-base font-extrabold tracking-tight text-[#123F2E] block">
              LeleQu CMS
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#78B98B]">
              Admin Dashboard
            </span>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isCurrent(item.path, item.exact);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-[#123F2E] text-white shadow-xs'
                    : 'text-[#6B786F] hover:bg-neutral-50 hover:text-[#202923]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? 'text-[#78B98B]' : 'text-neutral-400'}`} />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-100 space-y-3">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-600 bg-neutral-50 hover:bg-neutral-100 rounded-xl border border-neutral-200 transition-colors"
          >
            <span>Buka Website Publik</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#E8F3E9] text-[#123F2E] flex items-center justify-center font-bold text-xs">
                <User className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#202923] block truncate max-w-[100px]">
                  {currentAdmin.name}
                </span>
                <span className="text-[10px] text-[#6B786F] block truncate max-w-[100px]">
                  {currentAdmin.email}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 bg-white flex flex-col h-full z-10 p-4 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#123F2E] flex items-center justify-center p-1 shadow-xs overflow-hidden">
                  <img
                    src="/public/assets/aistudio/logo_lele2_58eae7d6.png"
                    alt="LeleQu"
                    className="w-6 h-6 object-contain brightness-0 invert"
                  />
                </div>
                <span className="font-bold text-sm text-[#123F2E]">LeleQu CMS</span>
              </div>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isCurrent(item.path, item.exact);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                      active
                        ? 'bg-[#123F2E] text-white'
                        : 'text-[#6B786F] hover:bg-neutral-50 hover:text-[#202923]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-neutral-100 space-y-2">
              <Link
                to="/"
                className="w-full text-center block py-2 text-xs font-semibold text-[#1B6044] bg-[#E8F3E9] rounded-xl"
              >
                Lihat Web Publik
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-center py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-neutral-200/80 px-4 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#202923] tracking-tight">
                Admin Website LeleQu
              </h2>
              <p className="text-[11px] text-[#6B786F] hidden sm:block">
                Pengelolaan Data Produk & Profil Website
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/admin/products"
              className="px-3.5 py-2 text-xs font-bold text-[#1B6044] bg-[#E8F3E9] hover:bg-[#78B98B]/30 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Fish className="w-4 h-4" />
              <span>Kelola Produk</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-neutral-200 text-xs">
              <div className="w-8 h-8 rounded-full bg-[#1B6044] text-white flex items-center justify-center font-bold text-xs">
                {currentAdmin.name.charAt(0)}
              </div>
              <div className="text-left">
                <span className="font-bold text-[#202923] block leading-tight">
                  {currentAdmin.name}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">Aktif</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};
