import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Fish,
  FileText,
  Plus,
  ArrowRight,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { products, articles, settings } = useApp();

  const totalProducts = products.length;
  const readyProducts = products.filter((p) => p.is_available).length;
  const poProducts = products.filter((p) => !p.is_available).length;
  const totalArticles = articles.length;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#202923] tracking-tight">
            Dashboard Admin Website LeleQu
          </h1>
          <p className="text-xs text-[#6B786F]">
            Pusat pengelolaan data katalog produk dan profil perusahaan untuk website resmi LeleQu.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/products"
            className="px-4 py-2.5 text-xs font-bold text-white bg-[#1B6044] hover:bg-[#123F2E] rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Produk Baru</span>
          </Link>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <span>Lihat Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Integration Notice Card (Website vs Mobile App) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#E8F3E9] to-[#F8FAF6] border border-[#78B98B]/40 space-y-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#1B6044] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Smartphone className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B6044] bg-white px-2 py-0.5 rounded shadow-2xs">
              Sistem Terintegrasi Backend & Database
            </span>
            <h3 className="text-base font-bold text-[#123F2E]">
              Pemisahan Tugas: Website Profile & Aplikasi Mobile Operasional
            </h3>
            <p className="text-xs text-neutral-700 leading-relaxed max-w-4xl">
              Website ini berfungsi sebagai media company profile, katalog produk ikan lele, dan pintu masuk pemesanan.
              Seluruh pesanan yang masuk dikirim ke database bersama dan <strong>dikelola secara terpusat melalui Aplikasi Mobile LeleQu</strong> (manajemen stok kolam, konfirmasi timbangan, dan operasional panen).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="p-3 bg-white rounded-xl border border-[#78B98B]/20 flex items-center gap-2 text-[#123F2E]">
            <CheckCircle2 className="w-4 h-4 text-[#1B6044] shrink-0" />
            <span>Website: CRUD Katalog Produk & Profil</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-[#78B98B]/20 flex items-center gap-2 text-[#123F2E]">
            <CheckCircle2 className="w-4 h-4 text-[#1B6044] shrink-0" />
            <span>Formulir: Pintu Masuk Pemesanan Pelanggan</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-[#78B98B]/20 flex items-center gap-2 text-[#123F2E]">
            <CheckCircle2 className="w-4 h-4 text-[#1B6044]" />
            <span>Aplikasi Mobile: Manajemen Pesanan & Kolam</span>
          </div>
        </div>
      </div>

      {/* Primary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Produk */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B786F]">Total Produk</span>
            <div className="w-8 h-8 rounded-lg bg-[#E8F3E9] text-[#1B6044] flex items-center justify-center">
              <Fish className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#123F2E] font-mono tabular-nums">
            {totalProducts}
          </div>
          <span className="text-[11px] text-[#6B786F] block">Komoditas & olahan lele</span>
        </div>

        {/* Stok Tersedia */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B786F]">Stok Tersedia</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 font-mono tabular-nums">
            {readyProducts}
          </div>
          <span className="text-[11px] text-[#6B786F] block">Siap ditimbang di kolam</span>
        </div>

        {/* Pre-Order / PO */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B786F]">Pre-Order (PO)</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-700 font-mono tabular-nums">
            {poProducts}
          </div>
          <span className="text-[11px] text-[#6B786F] block">Jadwal panen mendatang</span>
        </div>

        {/* Total Artikel */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B786F]">Artikel Edukasi</span>
            <div className="w-8 h-8 rounded-lg bg-[#E8F3E9] text-[#1B6044] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#123F2E] font-mono tabular-nums">
            {totalArticles}
          </div>
          <span className="text-[11px] text-[#6B786F] block">Konten edukasi budidaya</span>
        </div>
      </div>

      {/* Catalog Products Table Preview */}
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#202923]">
              Daftar Produk yang Ditampilkan di Website
            </h3>
            <p className="text-xs text-[#6B786F]">
              Katalog resmi yang dapat dipilih pelanggan saat memesan lele.
            </p>
          </div>
          <Link
            to="/admin/products"
            className="text-xs font-bold text-[#1B6044] hover:text-[#123F2E] flex items-center gap-1"
          >
            <span>Buka Halaman CRUD Produk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAF6] text-[#6B786F] font-semibold border-b border-neutral-100">
              <tr>
                <th className="py-3.5 px-6">Foto & Nama Produk</th>
                <th className="py-3.5 px-6">Ukuran / Kategori</th>
                <th className="py-3.5 px-6">Harga per Kg</th>
                <th className="py-3.5 px-6">Min. Order</th>
                <th className="py-3.5 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-neutral-50/50">
                  <td className="py-3.5 px-6 flex items-center gap-3">
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="w-10 h-10 rounded-xl object-cover border border-neutral-200 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          '/public/assets/aistudio/Ikan_lele_segar_5b6a360e.jpg';
                      }}
                    />
                    <div>
                      <span className="font-bold text-[#202923] block">{p.name}</span>
                      <span className="text-[11px] text-neutral-400 line-clamp-1 max-w-xs">
                        {p.description}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="bg-[#E8F3E9] text-[#123F2E] font-semibold px-2 py-0.5 rounded text-[11px]">
                      {p.grade}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 font-mono font-bold text-[#123F2E]">
                    {formatRupiah(p.price_per_kg)}
                  </td>
                  <td className="py-3.5 px-6 text-neutral-600 font-medium">
                    {p.min_order || '3 kg'}
                  </td>
                  <td className="py-3.5 px-6">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        p.is_available
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {p.is_available ? 'Stok Tersedia' : 'Pemesanan PO'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
