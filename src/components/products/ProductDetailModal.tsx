import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Check, ShoppingBag, MapPin, AlertCircle, ShieldCheck } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, openOrderModal, settings } = useApp();

  if (!selectedProduct) return null;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleStartOrder = () => {
    const prod = selectedProduct;
    setSelectedProduct(null);
    openOrderModal(prod);
  };

  return (
    <div
      onClick={() => setSelectedProduct(null)}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
    >
      {/* Modal Container: Compact, horizontal split on tablet/desktop so the entire card is visible without cutoff */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl sm:rounded-3xl max-w-lg sm:max-w-2xl lg:max-w-3xl w-full shadow-2xl border border-neutral-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        <div className="grid grid-cols-1 sm:grid-cols-12 flex-1 overflow-y-auto">
          {/* Left Column: Compact Photo & Quick Badges */}
          <div className="sm:col-span-5 relative bg-neutral-100 min-h-[160px] sm:min-h-full flex flex-col justify-between overflow-hidden">
            <img
              src={selectedProduct.image_url}
              alt={selectedProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center absolute inset-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  '/public/assets/aistudio/Ikan_lele_segar_5b6a360e.jpg';
              }}
            />
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* Mobile close button on image */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="sm:hidden absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-colors z-10"
              aria-label="Tutup modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Bottom Badges on Image */}
            <div className="relative z-10 p-3 space-y-1">
              <span className="inline-block bg-white/95 backdrop-blur-xs text-[#123F2E] text-xs font-bold px-2.5 py-1 rounded-lg shadow-xs">
                {selectedProduct.grade}
              </span>
              {selectedProduct.min_order && (
                <span className="block text-[11px] font-medium text-white/90 drop-shadow-xs">
                  Minimal Pemesanan: {selectedProduct.min_order}
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Compact Details & Actions */}
          <div className="sm:col-span-7 p-4 sm:p-5 flex flex-col justify-between space-y-3 sm:space-y-4">
            {/* Top Bar with Category & Desktop Close */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#1B6044] bg-[#E8F3E9] px-2 py-0.5 rounded-md">
                    Katalog Resmi LeleQu
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                      selectedProduct.is_available
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {selectedProduct.is_available ? 'Stok Kolam Tersedia' : 'Pemesanan PO'}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="hidden sm:flex w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 items-center justify-center transition-colors"
                  aria-label="Tutup modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Price in Compact Layout */}
              <h2 className="text-base sm:text-lg font-bold text-[#202923] leading-snug">
                {selectedProduct.name}
              </h2>

              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-bold text-[#123F2E] font-mono tabular-nums">
                  {formatRupiah(selectedProduct.price_per_kg)}
                </span>
                <span className="text-xs font-normal text-[#6B786F]">/ kilogram</span>
              </div>
            </div>

            {/* Compact Pickup Alert Banner */}
            <div className="bg-[#E8F3E9]/90 border border-[#78B98B]/35 rounded-xl p-2.5 sm:p-3 text-xs text-[#123F2E] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[11px] sm:text-xs text-[#123F2E]">
                <AlertCircle className="w-3.5 h-3.5 text-[#1B6044] shrink-0" />
                <span>Pengambilan Langsung di Lokasi Usaha (Pickup Only)</span>
              </div>
              <p className="text-[11px] text-neutral-700 leading-normal pl-5">
                "Pesanan LeleQu hanya diambil di kolam. Belum melayani kurir pengiriman."
              </p>
              <div className="flex items-center gap-1 text-[11px] text-[#1B6044] font-medium pl-5 pt-0.5 truncate">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate">{settings.pickup_address}</span>
              </div>
            </div>

            {/* Description Text */}
            <p className="text-xs text-[#202923]/85 leading-relaxed line-clamp-3 sm:line-clamp-4">
              {selectedProduct.description}
            </p>

            {/* Quality Checklist (Compact 2-col) */}
            {selectedProduct.characteristics && selectedProduct.characteristics.length > 0 && (
              <div className="bg-[#F8FAF6] p-2.5 rounded-xl border border-neutral-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {selectedProduct.characteristics.slice(0, 4).map((char, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#202923]">
                      <Check className="w-3 h-3 text-[#1B6044] shrink-0" />
                      <span className="truncate">{char}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons: Full & Clear */}
            <div className="pt-1 space-y-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleStartOrder}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#1B6044] hover:bg-[#123F2E] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-[0.99]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Pesan Lele (Pickup)</span>
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="py-2.5 px-3.5 rounded-xl border border-neutral-200 text-neutral-700 text-xs sm:text-sm font-medium hover:bg-neutral-50 transition-colors"
                >
                  Tutup
                </button>
              </div>

              <div className="flex items-center justify-center gap-1 text-[10px] text-[#6B786F]">
                <ShieldCheck className="w-3 h-3 text-[#1B6044]" />
                <span>Penimbangan akurat saat diambil di kolam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
