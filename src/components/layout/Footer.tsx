import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { MapPin, Phone, Mail, Instagram, Facebook, ArrowUpRight, Shield, AlertCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, openOrderModal } = useApp();

  return (
    <footer className="bg-[#123F2E] text-white pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1B6044]/60">
          {/* Brand & Story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#1B6044] flex items-center justify-center p-1.5 shadow-xs overflow-hidden">
                <img
                  src="/public/assets/aistudio/logo_lele2_58eae7d6.png"
                  alt="Logo LeleQu"
                  className="w-7 h-7 object-contain brightness-0 invert"
                />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                LeleQu
              </span>
            </div>
            <p className="text-sm text-[#78B98B]/90 font-medium">
              "{settings.tagline}"
            </p>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-md">
              {settings.description}
            </p>

            {/* Pickup Notice */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#78B98B] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-white">Layanan Pickup Only:</strong> Pesanan hanya dapat diambil langsung di lokasi kolam kami sesuai jadwal terkonfirmasi.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#1B6044] hover:bg-[#78B98B] hover:text-[#123F2E] flex items-center justify-center text-neutral-200 transition-colors"
                title="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#1B6044] hover:bg-[#78B98B] hover:text-[#123F2E] flex items-center justify-center text-neutral-200 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#1B6044] hover:bg-[#78B98B] hover:text-[#123F2E] flex items-center justify-center text-neutral-200 transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#78B98B]">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  Produk Ikan
                </Link>
              </li>
              <li>
                <Link to="/order" className="hover:text-white transition-colors">
                  Pemesanan
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Produk Utama */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#78B98B]">
              Produk Ikan Lele
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <Link to="/products" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Lele Segar Konsumsi (8-10)</span>
                  <ArrowUpRight className="w-3 h-3 text-[#78B98B]" />
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Lele Pecel Lele (10-12)</span>
                  <ArrowUpRight className="w-3 h-3 text-[#78B98B]" />
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Lele Jumbo Super (6-8)</span>
                  <ArrowUpRight className="w-3 h-3 text-[#78B98B]" />
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Lele Frozen Siap Masak</span>
                  <ArrowUpRight className="w-3 h-3 text-[#78B98B]" />
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Fillet Lele Tanpa Duri</span>
                  <ArrowUpRight className="w-3 h-3 text-[#78B98B]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak & Lokasi Pengambilan */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#78B98B]">
              Lokasi Pengambilan (Pickup)
            </h4>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#78B98B] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {settings.address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#78B98B] shrink-0" />
                <span>{settings.phone_display}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#78B98B] shrink-0" />
                <span>{settings.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} LeleQu Indonesia. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors">
              Budidaya Ikan Lele Berkualitas
            </span>
            <Link
              to="/admin/login"
              className="flex items-center gap-1 hover:text-white transition-colors text-neutral-400"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
