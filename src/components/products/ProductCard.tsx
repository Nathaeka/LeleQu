import React from 'react';
import { Product } from '../../data/initialData';
import { useApp } from '../../context/AppContext';
import { Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, openOrderModal } = useApp();

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    openOrderModal(product);
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group bg-white rounded-2xl sm:rounded-3xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md hover:border-[#78B98B]/60 transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Image container */}
      <div className="relative aspect-16/10 overflow-hidden bg-neutral-100">
        <img
          src={product.image_url}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              '/public/assets/aistudio/Ikan_lele_segar_5b6a360e.jpg';
          }}
        />

        {/* Availability badge */}
        <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-semibold text-[#123F2E] shadow-xs">
          {product.is_available ? 'Stok Tersedia' : 'Pemesanan PO'}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {product.min_order && (
            <div className="text-[11px] font-medium text-[#6B786F]">
              <span>Min. Pemesanan: {product.min_order}</span>
            </div>
          )}

          <h3 className="text-sm sm:text-base font-bold text-[#202923] group-hover:text-[#1B6044] transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-[#6B786F] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#6B786F] block">
              Harga Satuan
            </span>
            <div className="text-sm sm:text-base font-bold text-[#123F2E] font-mono tabular-nums">
              {formatRupiah(product.price_per_kg)}
              <span className="text-xs font-normal text-[#6B786F]"> / kg</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedProduct(product)}
              className="p-2 text-neutral-600 hover:text-[#1B6044] hover:bg-[#E8F3E9] rounded-xl transition-colors border border-neutral-200"
              title="Lihat Detail Produk"
              aria-label="Lihat Detail Produk"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={handleOrder}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-[#1B6044] text-white hover:bg-[#123F2E] rounded-xl transition-all shadow-xs active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Pesan Lele</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
