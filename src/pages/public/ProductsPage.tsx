import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../../components/products/ProductCard';
import { Search, Filter, RefreshCw, ShoppingBag, MapPin, AlertCircle } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { products, settings, openOrderModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');

  const gradeOptions = [
    { label: 'Semua Produk', value: 'all' },
    { label: 'Konsumsi (8-10)', value: 'Konsumsi' },
    { label: 'Pecel Lele (10-12)', value: 'Pecel Lele' },
    { label: 'Super Jumbo (6-8)', value: 'Super' },
    { label: 'Frozen Siap Masak', value: 'Frozen' },
    { label: 'Fillet / Olahan', value: 'Fillet' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.grade.toLowerCase().includes(searchQuery.toLowerCase());

      // Grade
      const matchesGrade =
        selectedGrade === 'all'
          ? true
          : selectedGrade === 'Fillet'
          ? p.grade.toLowerCase().includes('fillet') || p.grade.toLowerCase().includes('olahan')
          : p.grade.toLowerCase().includes(selectedGrade.toLowerCase());

      // Availability
      const matchesAvailability =
        selectedAvailability === 'all'
          ? true
          : selectedAvailability === 'ready'
          ? p.is_available === true
          : p.is_available === false;

      return matchesSearch && matchesGrade && matchesAvailability;
    });
  }, [products, searchQuery, selectedGrade, selectedAvailability]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedGrade('all');
    setSelectedAvailability('all');
  };

  return (
    <div className="space-y-10 pb-20">
      {/* 1. HERO HEADER */}
      <section className="relative py-16 bg-[#123F2E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#78B98B] border border-white/15">
            Katalog Resmi Produk Ikan Lele
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Produk Ikan Lele Segar & Olahan LeleQu
          </h1>
          <p className="text-sm sm:text-base text-neutral-200 max-w-2xl mx-auto leading-relaxed">
            Dipanen dari kolam budidaya yang terkelola bersih. Berbagai pilihan ukuran
            lele segar, lele frozen vacuum pack higienis, dan fillet murni tanpa duri.
          </p>
        </div>
      </section>

      {/* 2. PICKUP ONLY MANDATORY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E8F3E9] border border-[#78B98B]/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#1B6044] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-xs sm:text-sm font-bold text-[#123F2E] block">
                Sistem Pengambilan: Pickup Only (Ambil Langsung di Lokasi Usaha)
              </span>
              <p className="text-xs text-neutral-700 leading-relaxed">
                "Pesanan LeleQu hanya dapat diambil langsung di lokasi usaha. Saat ini kami belum menyediakan layanan pengiriman."
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[#1B6044] font-medium pt-0.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{settings.pickup_address}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => openOrderModal()}
            className="px-5 py-2.5 bg-[#1B6044] hover:bg-[#123F2E] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors shrink-0 self-stretch sm:self-auto justify-center"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Formulir Pesan Lele</span>
          </button>
        </div>
      </section>

      {/* 3. SEARCH & FILTER TOOLBAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search input */}
            <div className="relative w-full md:flex-1">
              <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari lele konsumsi, pecel lele, fillet, atau frozen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#F8FAF6] border border-neutral-200 text-sm text-[#202923] placeholder:text-[#6B786F] focus:outline-none focus:border-[#1B6044] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#6B786F] hover:text-[#202923]"
                >
                  Hapus
                </button>
              )}
            </div>

            {/* Availability segmented toggle */}
            <div className="flex items-center gap-1 bg-[#F8FAF6] p-1.5 rounded-2xl border border-neutral-200 self-stretch sm:self-auto shrink-0">
              <button
                onClick={() => setSelectedAvailability('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
                  selectedAvailability === 'all'
                    ? 'bg-white text-[#123F2E] font-bold shadow-xs'
                    : 'text-[#6B786F] hover:text-[#202923]'
                }`}
              >
                Semua Status
              </button>
              <button
                onClick={() => setSelectedAvailability('ready')}
                className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
                  selectedAvailability === 'ready'
                    ? 'bg-white text-[#123F2E] font-bold shadow-xs'
                    : 'text-[#6B786F] hover:text-[#202923]'
                }`}
              >
                Siap Panen
              </button>
              <button
                onClick={() => setSelectedAvailability('po')}
                className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
                  selectedAvailability === 'po'
                    ? 'bg-white text-[#123F2E] font-bold shadow-xs'
                    : 'text-[#6B786F] hover:text-[#202923]'
                }`}
              >
                Pre-Order
              </button>
            </div>
          </div>

          {/* Grade filter segmented chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            <span className="text-xs font-bold text-[#6B786F] mr-2 shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Pilihan Ukuran:</span>
            </span>
            {gradeOptions.map((g) => (
              <button
                key={g.value}
                onClick={() => setSelectedGrade(g.value)}
                className={`px-3.5 py-1.5 text-xs rounded-xl font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedGrade === g.value
                    ? 'bg-[#1B6044] text-white font-semibold'
                    : 'bg-[#F8FAF6] text-[#6B786F] hover:bg-neutral-100 hover:text-[#202923] border border-neutral-200'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#202923]">
              Tidak Ada Produk yang Sesuai
            </h3>
            <p className="text-xs text-[#6B786F]">
              Coba sesuaikan kata kunci pencarian atau ubah filter kategori produk.
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-[#1B6044] text-white rounded-xl hover:bg-[#123F2E] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Semua Filter</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
