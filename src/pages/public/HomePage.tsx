import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../../components/products/ProductCard';
import { ArticleCard } from '../../components/articles/ArticleCard';
import { Article } from '../../data/initialData';
import {
  ArrowRight,
  ShieldCheck,
  Droplets,
  Activity,
  CheckCircle2,
  Fish,
  ShoppingBag,
  MapPin,
  Clock,
  AlertCircle,
  Phone,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, articles, settings, openOrderModal } = useApp();
  const navigate = useNavigate();

  // Featured 3 products
  const featuredProducts = products.slice(0, 3);
  // Latest 3 published articles
  const latestArticles = articles.filter((a) => a.status === 'published').slice(0, 3);

  const handleSelectArticle = (art: Article) => {
    navigate(`/articles?slug=${art.slug}`);
  };

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center bg-[#123F2E] text-white overflow-hidden">
        {/* Background Image with Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/public/assets/aistudio/kolam_lele_8e878a5c.jpeg"
            alt="Kolam Budidaya LeleQu"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#123F2E] via-[#123F2E]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#123F2E] via-transparent to-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            {/* Editorial Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-[#78B98B] border border-white/15">
              <span className="w-2 h-2 rounded-full bg-[#78B98B]" />
              <span>Budidaya & Pengelolaan Kolam Ikan Lele Segar</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Dibudidayakan dengan Baik, <br className="hidden sm:inline" />
              Dihadirkan dengan Kualitas.
            </h1>

            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed max-w-xl">
              LeleQu menghadirkan produk ikan lele berkualitas melalui pengelolaan
              budidaya kolam yang terencana, standar kualitas yang terjaga, serta pembersihan
              higienis sebelum penimbangan langsung di kolam.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => openOrderModal()}
                className="px-6 py-3.5 rounded-xl bg-[#78B98B] hover:bg-[#78B98B]/90 text-[#123F2E] font-bold text-sm flex items-center gap-2 shadow-lg transition-all active:scale-[0.98]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pesan Lele (Pickup Only)</span>
              </button>
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-xs transition-colors"
              >
                Jelajahi Produk
              </Link>
            </div>

            {/* Highlights bullet tags */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#78B98B]" />
                <span>Bebas Bau Lumpur & Daging Padat</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#78B98B]" />
                <span>Pemberokan Air Mengalir 24 Jam</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#78B98B]" />
                <span>Ambil Langsung di Lokasi Kolam</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPANY HIGHLIGHTS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-14 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-md">
          <div className="space-y-1 p-2 sm:p-4 border-r border-neutral-100 last:border-none">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#123F2E] font-mono tabular-nums">
              {settings.stat_ponds}
            </span>
            <div className="text-xs sm:text-sm font-semibold text-[#202923]">
              Kolam Pengelolaan Aktif
            </div>
            <p className="text-[11px] text-[#6B786F]">
              Pengawasan kualitas air dan kebersihan rutin
            </p>
          </div>

          <div className="space-y-1 p-2 sm:p-4 border-r border-neutral-100 last:border-none">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#123F2E] font-mono tabular-nums">
              {settings.stat_harvest}
            </span>
            <div className="text-xs sm:text-sm font-semibold text-[#202923]">
              Kapasitas Panen Bulanan
            </div>
            <p className="text-[11px] text-[#6B786F]">
              Pasokan konsisten untuk rumah makan & keluarga
            </p>
          </div>

          <div className="space-y-1 p-2 sm:p-4 border-r border-neutral-100 last:border-none">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#123F2E] font-mono tabular-nums">
              {settings.stat_orders}
            </span>
            <div className="text-xs sm:text-sm font-semibold text-[#202923]">
              Pesanan Terlayani
            </div>
            <p className="text-[11px] text-[#6B786F]">
              Pelanggan tetap warung pecel lele & katering
            </p>
          </div>

          <div className="space-y-1 p-2 sm:p-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#123F2E] font-mono tabular-nums">
              {settings.stat_quality}
            </span>
            <div className="text-xs sm:text-sm font-semibold text-[#202923]">
              Higienis & Segar
            </div>
            <p className="text-[11px] text-[#6B786F]">
              Ikan hidup bugar ditimbang di depan pemesan
            </p>
          </div>
        </div>
      </section>

      {/* 3. PICKUP ONLY EXPLANATION SECTION (IMPORTANT REVISION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#E8F3E9] border border-[#78B98B]/40 p-8 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#1B6044] text-white text-xs font-bold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Ketentuan Pemesanan: Pickup Only</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123F2E]">
                Pengambilan Ikan Lele Langsung di Tempat
              </h2>
              <p className="text-sm text-[#202923]/80 leading-relaxed max-w-2xl">
                "Pesanan LeleQu hanya dapat diambil langsung di lokasi usaha. Saat ini kami belum menyediakan layanan pengiriman."
              </p>
            </div>

            <button
              onClick={() => openOrderModal()}
              className="px-6 py-3.5 bg-[#1B6044] hover:bg-[#123F2E] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition-colors shrink-0 self-start md:self-auto"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buat Pesanan Sekarang</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-[#78B98B]/20 space-y-1.5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#123F2E]">
                <Clock className="w-4 h-4 text-[#1B6044]" />
                <span>1. Tentukan Jadwal Ambil</span>
              </div>
              <p className="text-xs text-[#6B786F]">
                Pilih tanggal dan perkiraan jam pengambilan saat mengisi formulir pemesanan.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#78B98B]/20 space-y-1.5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#123F2E]">
                <ShieldCheck className="w-4 h-4 text-[#1B6044]" />
                <span>2. Konfirmasi & Persiapan Ikan</span>
              </div>
              <p className="text-xs text-[#6B786F]">
                Petugas kolam menyiapkan ikan segar hidup atau frozen sesuai jumlah pesanan Anda.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#78B98B]/20 space-y-1.5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#123F2E]">
                <MapPin className="w-4 h-4 text-[#1B6044]" />
                <span>3. Timbang & Ambil di Kolam</span>
              </div>
              <p className="text-xs text-[#6B786F]">
                Penimbangan presisi langsung di hadapan Anda di area kolam LeleQu Bobotsari.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Photo Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-lg border border-neutral-200">
              <img
                src="/public/assets/aistudio/kolam_lele_tok_18245844.jpeg"
                alt="Fasilitas Kolam LeleQu"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating verification card */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-4 rounded-2xl border border-neutral-200 shadow-xl max-w-xs space-y-1">
              <div className="flex items-center gap-2 text-[#1B6044]">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wide">
                  Standar Mutu Kolam
                </span>
              </div>
              <p className="text-[11px] text-[#6B786F] leading-tight">
                Pemeriksaan fisik ikan dan air harian menjaga lele tetap bugar dan nafsu makan baik.
              </p>
            </div>
          </div>

          {/* Text Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-wider uppercase text-[#1B6044]">
                Mengenal LeleQu
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202923] tracking-tight">
                Budidaya Ikan Lele Segar & Berkualitas
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#6B786F] leading-relaxed">
              LeleQu didirikan untuk menghadirkan kepastian mutu bagi konsumen rumah tangga
              dan pelaku usaha kuliner. Kami berfokus pada budidaya ikan lele berkualitas tinggi
              yang terbukti memiliki laju pertumbuhan seragam, daya tahan tinggi, dan tekstur daging lezat.
            </p>

            <p className="text-sm sm:text-base text-[#6B786F] leading-relaxed">
              Seluruh ikan lele yang kami panen melewati tahapan penanganan terencana,
              termasuk proses karantina dan pembersihan air sebelum ditimbang. Hal ini memastikan
              daging lele tetap kenyal, padat, dan bebas dari aroma lumpur.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-neutral-200">
                <Droplets className="w-5 h-5 text-[#1B6044] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#202923]">Air Terawat Bersih</h4>
                  <p className="text-[11px] text-[#6B786F]">Sirkulasi terjaga dan kebersihan dasar kolam teratur.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-neutral-200">
                <Fish className="w-5 h-5 text-[#1B6044]" />
                <div>
                  <h4 className="text-xs font-bold text-[#202923]">Daging Bebas Bau Lumpur</h4>
                  <p className="text-[11px] text-[#6B786F]">Proses pemberokan menghasilkan rasa daging gurih alami.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#1B6044] hover:text-[#123F2E] transition-colors group"
              >
                <span>Pelajari Profil Lengkap LeleQu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-1">
            <span className="text-xs font-bold tracking-wider uppercase text-[#1B6044]">
              Katalog Pilihan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202923]">
              Produk Ikan Lele Segar & Olahan
            </h2>
            <p className="text-xs sm:text-sm text-[#6B786F]">
              Tersedia dalam berbagai pilihan ukuran segar, lele frozen vacuum pack, hingga fillet boneless.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1B6044] hover:text-[#123F2E] p-2 transition-colors self-start md:self-auto"
          >
            <span>Lihat Semua Produk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 6. WHY CHOOSE LELEQU */}
      <section className="bg-white py-16 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-xl mx-auto text-center space-y-2">
            <span className="text-xs font-bold tracking-wider uppercase text-[#1B6044]">
              Standar Kualitas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202923]">
              Mengapa Memilih Produk LeleQu?
            </h2>
            <p className="text-xs sm:text-sm text-[#6B786F]">
              Komitmen kami menjaga mutu ikan lele terbaik dari kolam hingga siap Anda olah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8FAF6] border border-neutral-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8F3E9] flex items-center justify-center text-[#123F2E]">
                <Droplets className="w-5 h-5 text-[#1B6044]" />
              </div>
              <h3 className="text-base font-bold text-[#202923]">
                Bebas Bau Lumpur
              </h3>
              <p className="text-xs text-[#6B786F] leading-relaxed">
                Pemberokan dengan air bersih mengalir membersihkan saluran pencernaan lele sebelum penimbangan.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF6] border border-neutral-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8F3E9] flex items-center justify-center text-[#123F2E]">
                <Activity className="w-5 h-5 text-[#1B6044]" />
              </div>
              <h3 className="text-base font-bold text-[#202923]">
                Pakan Bernutrisi
              </h3>
              <p className="text-xs text-[#6B786F] leading-relaxed">
                Diberi pakan pelet berprotein tinggi secara terjadwal untuk menghasilkan lele berdaging padat dan tidak lembek.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF6] border border-neutral-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8F3E9] flex items-center justify-center text-[#123F2E]">
                <Fish className="w-5 h-5 text-[#1B6044]" />
              </div>
              <h3 className="text-base font-bold text-[#202923]">
                Ukuran Seragam
              </h3>
              <p className="text-xs text-[#6B786F] leading-relaxed">
                Sortir pemilahan ukuran presisi memudahkan perhitungan porsi bagi warung makan dan pengusaha kuliner.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF6] border border-neutral-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8F3E9] flex items-center justify-center text-[#123F2E]">
                <MapPin className="w-5 h-5 text-[#1B6044]" />
              </div>
              <h3 className="text-base font-bold text-[#202923]">
                Timbang Transparan
              </h3>
              <p className="text-xs text-[#6B786F] leading-relaxed">
                Pengambilan langsung di kolam memungkinkan Anda memeriksa kondisi ikan dan menyaksikan proses penimbangan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ARTICLES PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-1">
            <span className="text-xs font-bold tracking-wider uppercase text-[#1B6044]">
              Edukasi & Wawasan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202923]">
              Artikel Perikanan Air Tawar
            </h2>
            <p className="text-xs sm:text-sm text-[#6B786F]">
              Wawasan praktis seputar pengelolaan kolam, kualitas air, manajemen pakan, dan penanganan panen.
            </p>
          </div>

          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1B6044] hover:text-[#123F2E] p-2 transition-colors self-start md:self-auto"
          >
            <span>Semua Artikel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map((art) => (
            <ArticleCard
              key={art.id}
              article={art}
              onSelect={handleSelectArticle}
            />
          ))}
        </div>
      </section>

      {/* 8. ORDER CTA BANNER (REPLACES PARTNERSHIP CTA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#123F2E] text-white p-8 sm:p-12 overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-5">
            <span className="inline-block text-xs font-bold tracking-wider uppercase text-[#78B98B]">
              Layanan Pemesanan Lele
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Pesan Ikan Lele Segar & Siap Ambil di Kolam
            </h2>
            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
              Membutuhkan pasokan lele segar untuk warung pecel lele, katering, atau konsumsi keluarga?
              Buat pesanan sekarang dan ambil langsung di lokasi kolam LeleQu sesuai jadwal yang Anda tentukan.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openOrderModal()}
                className="px-6 py-3.5 rounded-xl bg-[#78B98B] hover:bg-[#78B98B]/90 text-[#123F2E] font-bold text-sm flex items-center gap-2 transition-colors shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Formulir Pesan Lele</span>
              </button>
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors"
              >
                Informasi Lokasi & Kontak
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
