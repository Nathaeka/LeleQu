import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Menu, X, ShoppingBag, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { currentAdmin, openOrderModal } = useApp();

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang Kami', path: '/about' },
    { name: 'Produk Ikan', path: '/products' },
    { name: 'Pemesanan', path: '/order' },
    { name: 'Hubungi Kami', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Brand Wordmark with Catfish Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-[#123F2E] flex items-center justify-center p-1.5 shadow-sm group-hover:bg-[#1B6044] transition-colors overflow-hidden">
              <img
                src="/public/assets/aistudio/logo_lele2_58eae7d6.png"
                alt="Logo LeleQu"
                className="w-7 h-7 object-contain brightness-0 invert"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#123F2E]">
                LeleQu
              </span>
              <span className="text-[11px] font-medium tracking-wide text-[#6B786F] -mt-1 hidden sm:block">
                Freshwater Aquaculture
              </span>
            </div>
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#202923]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`whitespace-nowrap transition-colors py-1 ${
                  isActive(link.path)
                    ? 'text-[#1B6044] font-semibold border-b-2 border-[#1B6044]'
                    : 'text-[#6B786F] hover:text-[#123F2E]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Zone 3: Actions (CTA & Admin Link) */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            {currentAdmin ? (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-[#E8F3E9] text-[#123F2E] hover:bg-[#78B98B]/30 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#1B6044]" />
                <span>Dashboard CMS</span>
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="text-xs font-medium text-[#6B786F] hover:text-[#123F2E] transition-colors px-2 py-1"
              >
                Admin Login
              </Link>
            )}

            <button
              onClick={() => openOrderModal()}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#1B6044] hover:bg-[#123F2E] rounded-xl shadow-xs transition-all active:scale-[0.98]"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Pesan Lele</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => openOrderModal()}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#1B6044] rounded-lg"
            >
              Pesan Lele
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#E8F3E9] text-[#123F2E] font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openOrderModal();
              }}
              className="w-full text-center px-4 py-3 text-sm font-bold text-white bg-[#1B6044] hover:bg-[#123F2E] rounded-xl shadow-xs flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pesan Lele (Pickup Only)</span>
            </button>

            <Link
              to={currentAdmin ? '/admin' : '/admin/login'}
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-xs font-medium text-neutral-600 py-2 hover:text-[#123F2E]"
            >
              {currentAdmin ? 'Buka Dashboard Admin (CMS)' : 'Login Admin CMS'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
