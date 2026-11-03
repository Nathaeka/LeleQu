import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, Order } from '../../data/initialData';
import {
  MapPin,
  Clock,
  Phone,
  Scale,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const OrderPage: React.FC = () => {
  const { products, addOrder, settings, showToast, orderProduct } = useApp();

  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [quantityKg, setQuantityKg] = useState<number>(10);
  const [pickupDate, setPickupDate] = useState<string>('');
  const [pickupTime, setPickupTime] = useState<string>('16:00 WIB');
  const [notes, setNotes] = useState('');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderProduct) {
      setSelectedProductId(orderProduct.id);
    } else if (products.length > 0 && !selectedProductId) {
      setSelectedProductId(products[0].id);
    }

    if (!pickupDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setPickupDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [orderProduct, products]);

  const currentProduct: Product | undefined =
    products.find((p) => p.id === selectedProductId) || products[0];

  const pricePerKg = currentProduct ? currentProduct.price_per_kg : 25000;
  const subtotal = (quantityKg || 0) * pricePerKg;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;

    if (!customerName.trim() || !customerPhone.trim()) {
      showToast('Mohon isi nama lengkap dan nomor WhatsApp aktif Anda.', 'error');
      return;
    }

    if (quantityKg < 1) {
      showToast('Jumlah pesanan minimal 1 kilogram.', 'error');
      return;
    }

    if (!pickupDate) {
      showToast('Mohon tentukan tanggal rencana pengambilan di kolam.', 'error');
      return;
    }

    const orderResult = addOrder({
      customer_name: customerName.trim(),
      customer_phone: customerPhone.trim(),
      product_id: currentProduct.id,
      product_name: currentProduct.name,
      product_grade: currentProduct.grade,
      price_per_kg: currentProduct.price_per_kg,
      quantity_kg: quantityKg,
      total_price: subtotal,
      pickup_date: pickupDate,
      pickup_time: pickupTime,
      notes: notes.trim(),
      pickup_location: settings.pickup_address,
    });

    setCreatedOrder(orderResult);
    showToast('Pesanan berhasil dibuat! Silakan konfirmasi via WhatsApp.', 'success');
  };

  const getWhatsAppUrl = () => {
    if (!createdOrder) return '#';
    const msg = encodeURIComponent(
      `Halo LeleQu, saya telah membuat pesanan melalui website:\n\n*Nomor Pesanan:* ${createdOrder.order_number}\n*Nama:* ${createdOrder.customer_name}\n*Produk:* ${createdOrder.product_name}\n*Ukuran:* ${createdOrder.product_grade}\n*Jumlah:* ${createdOrder.quantity_kg} kg\n*Total:* ${formatRupiah(createdOrder.total_price)}\n*Rencana Ambil:* ${createdOrder.pickup_date} (${createdOrder.pickup_time})\n*Metode:* Pengambilan Langsung (Pickup Only)\n\nMohon konfirmasi kesiapan pesanan. Terima kasih!`
    );
    return `https://wa.me/${settings.whatsapp}?text=${msg}`;
  };

  return (
    <div className="space-y-10 pb-20">
      {/* 1. HERO HEADER */}
      <section className="relative py-12 bg-[#123F2E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#78B98B] border border-white/15">
            Sistem Pemesanan Mandiri (Pickup Only)
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Formulir Pemesanan Ikan Lele
          </h1>
          <p className="text-sm sm:text-base text-neutral-200 max-w-2xl mx-auto leading-relaxed">
            Pesan ikan lele segar siap panen langsung dari kolam LeleQu. Seluruh pesanan disiapkan
            segar untuk diambil langsung di fasilitas budidaya kami.
          </p>
        </div>
      </section>

      {/* 2. WIDE HORIZONTAL FORM CONTAINER (MEMANJANG, TANPA PERLU DI-SCROLL) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
          {createdOrder ? (
            /* Confirmation Screen */
            <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      Pesanan Berhasil Disimpan
                    </span>
                    <h3 className="text-xl font-extrabold text-[#202923]">
                      Kode: <span className="text-[#1B6044] font-mono">{createdOrder.order_number}</span>
                    </h3>
                  </div>
                </div>

                <div className="bg-[#F8FAF6] p-4 rounded-2xl border border-neutral-200 text-xs space-y-2.5">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Pemesan:</span>
                    <span className="font-bold text-[#202923]">{createdOrder.customer_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Nomor WhatsApp:</span>
                    <span className="font-mono font-medium text-[#202923]">{createdOrder.customer_phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Jadwal Pengambilan:</span>
                    <span className="font-bold text-[#123F2E]">
                      {createdOrder.pickup_date} · {createdOrder.pickup_time}
                    </span>
                  </div>
                  {createdOrder.notes && (
                    <div className="pt-1.5 border-t border-neutral-200 text-[11px] text-neutral-600">
                      <span className="text-neutral-500 block">Catatan Petugas:</span>
                      <span className="italic">"{createdOrder.notes}"</span>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p>
                    Ikan dipuasakan dalam air mengalir agar bebas bau lumpur dan dipersiapkan hidup saat jam penjemputan.
                  </p>
                </div>
              </div>

              <div className="md:col-span-6 bg-[#F8FAF6] p-6 rounded-2xl border border-neutral-200 space-y-5">
                <div className="border-b border-neutral-200 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6B786F] block">
                    Ringkasan Komoditas
                  </span>
                  <h4 className="text-base font-bold text-[#202923] mt-1">
                    {createdOrder.product_name}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-neutral-600 mt-1">
                    <span>Ukuran: <strong>{createdOrder.product_grade}</strong></span>
                    <span className="font-mono font-bold text-[#123F2E]">{createdOrder.quantity_kg} kg</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-[#202923]">Total Pembayaran:</span>
                  <span className="text-xl font-extrabold text-[#123F2E] font-mono tabular-nums">
                    {formatRupiah(createdOrder.total_price)}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-neutral-200 text-xs space-y-1">
                  <span className="font-bold text-[#123F2E] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#1B6044]" />
                    Lokasi Pengambilan di Kolam:
                  </span>
                  <p className="text-neutral-600 leading-relaxed pl-5">
                    {createdOrder.pickup_location}
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#1B6044] hover:bg-[#123F2E] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors text-center"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Konfirmasi via WhatsApp Sekarang</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setCreatedOrder(null)}
                    className="w-full py-2.5 px-4 rounded-xl border border-neutral-300 text-neutral-700 text-xs font-semibold hover:bg-white transition-colors"
                  >
                    Buat Pesanan Baru
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Wide 2-Column Form */
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Form Fields */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-5 border-b lg:border-b-0 lg:border-r border-neutral-100">
                {/* 1. Produk & Volume */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B6044]">
                    <Scale className="w-4 h-4" />
                    <span>1. Pilihan Produk & Jumlah</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-8">
                      <label className="block text-xs font-medium text-[#6B786F] mb-1">
                        Pilihan Produk Ikan Lele *
                      </label>
                      <select
                        value={selectedProductId}
                        onChange={(e) => setSelectedProductId(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-[#202923] font-medium focus:border-[#1B6044] focus:outline-none bg-white"
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({formatRupiah(p.price_per_kg)}/kg)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-xs font-medium text-[#6B786F] mb-1">
                        Kuantitas (Kg) *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="1"
                          required
                          value={quantityKg}
                          onChange={(e) => setQuantityKg(Math.max(1, parseInt(e.target.value) || 0))}
                          className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold font-mono text-[#202923] focus:border-[#1B6044] focus:outline-none"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 pointer-events-none">
                          KG
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pilihan Cepat */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="text-[11px] text-[#6B786F]">Pilihan cepat:</span>
                    {[5, 10, 20, 25, 50].map((kg) => (
                      <button
                        key={kg}
                        type="button"
                        onClick={() => setQuantityKg(kg)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                          quantityKg === kg
                            ? 'bg-[#123F2E] text-white shadow-2xs'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {kg} kg
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Data Pemesan */}
                <div className="space-y-2.5 pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B6044]">
                    <Phone className="w-4 h-4" />
                    <span>2. Data Pemesan</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#6B786F] mb-1">
                        Nama Lengkap Pemesan *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Pak Budi / Bu Siti"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#6B786F] mb-1">
                        Nomor WhatsApp Aktif *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+62 812-xxxx-xxxx"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Jadwal Pengambilan */}
                <div className="space-y-2.5 pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B6044]">
                    <Clock className="w-4 h-4" />
                    <span>3. Jadwal Pengambilan di Kolam</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#6B786F] mb-1">
                        Tanggal Pengambilan *
                      </label>
                      <input
                        type="date"
                        required
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#6B786F] mb-1">
                        Jam Pengambilan *
                      </label>
                      <select
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none bg-white"
                      >
                        <option value="08:30 WIB">Pagi: 08:30 WIB</option>
                        <option value="10:00 WIB">Pagi: 10:00 WIB</option>
                        <option value="13:30 WIB">Siang: 13:30 WIB</option>
                        <option value="15:30 WIB">Sore: 15:30 WIB (Waktu Panen Ideal)</option>
                        <option value="16:00 WIB">Sore: 16:00 WIB (Waktu Panen Ideal)</option>
                        <option value="16:30 WIB">Sore: 16:30 WIB (Waktu Panen Ideal)</option>
                        <option value="17:00 WIB">Sore: 17:00 WIB</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 4. Catatan Opsional */}
                <div className="pt-3 border-t border-neutral-100">
                  <label className="block text-xs font-medium text-[#6B786F] mb-1">
                    Catatan Tambahan untuk Petugas Kolam (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Disiangi bersih / minta lele yang lincah siap olah..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none"
                  />
                </div>
              </div>

              {/* Right Column: Preview, Location, Summary, and Submit */}
              <div className="lg:col-span-5 p-6 sm:p-8 bg-[#F8FAF6]/80 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  {/* Product Snapshot */}
                  <div className="bg-white p-3.5 rounded-2xl border border-neutral-200 flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                      <img
                        src={currentProduct?.image_url}
                        alt={currentProduct?.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            '/public/assets/aistudio/Ikan_lele_segar_5b6a360e.jpg';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#1B6044] bg-[#E8F3E9] px-2 py-0.5 rounded">
                        Ukuran: {currentProduct?.grade}
                      </span>
                      <h5 className="text-xs font-bold text-[#202923] truncate mt-1">
                        {currentProduct?.name}
                      </h5>
                      <span className="text-xs font-mono font-bold text-[#123F2E]">
                        {formatRupiah(pricePerKg)} / kg
                      </span>
                    </div>
                  </div>

                  {/* Pickup Location Info */}
                  <div className="p-3.5 rounded-2xl bg-white border border-neutral-200 text-xs space-y-1">
                    <span className="font-bold text-[#123F2E] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#1B6044] shrink-0" />
                      Titik Pengambilan di Lokasi Usaha:
                    </span>
                    <p className="text-[11px] text-neutral-600 leading-relaxed pl-5">
                      {settings.pickup_address}
                    </p>
                    <p className="text-[10px] text-amber-800 bg-amber-50 px-2 py-1 rounded mt-1.5 font-medium">
                      * Seluruh pesanan menggunakan sistem pickup only / ambil di lokasi kolam.
                    </p>
                  </div>

                  {/* Price Breakdown */}
                  <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B786F] block">
                      Ringkasan Biaya Pesanan
                    </span>
                    <div className="flex items-center justify-between text-xs text-neutral-600">
                      <span>Harga Satuan:</span>
                      <span className="font-mono font-medium">{formatRupiah(pricePerKg)} / kg</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-neutral-600">
                      <span>Kuantitas Pesanan:</span>
                      <span className="font-mono font-bold text-[#123F2E]">{quantityKg} kg</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-neutral-600">
                      <span>Layanan Pengiriman:</span>
                      <span className="font-bold text-[#1B6044]">Rp 0 (Ambil di Kolam)</span>
                    </div>
                    <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#202923]">Estimasi Total:</span>
                      <span className="text-lg font-extrabold text-[#123F2E] font-mono tabular-nums">
                        {formatRupiah(subtotal)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="space-y-2 pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#1B6044] hover:bg-[#123F2E] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Kirim Pesanan Sekarang</span>
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6B786F] pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1B6044]" />
                    <span>Diteruskan langsung ke sistem operasional LeleQu</span>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
