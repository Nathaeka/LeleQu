import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle,
  Target,
  Compass,
  ShieldCheck,
  Droplets,
  HeartHandshake,
  Leaf,
  Layers,
  ShoppingBag,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { openOrderModal } = useApp();

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO HEADER */}
      <section className="relative py-20 bg-[#123F2E] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/public/assets/aistudio/kolam_lele_8e878a5c.jpeg"
            alt="Fasilitas Kolam LeleQu"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#123F2E] via-[#123F2E]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#78B98B] border border-white/15">
            Tentang Perusahaan
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
            Dedikasi Menghadirkan Ikan Lele Berkualitas & Terpercaya
          </h1>
          <p className="text-sm sm:text-base text-neutral-200 max-w-2xl mx-auto leading-relaxed">
            Mengenal komitmen LeleQu dalam mengelola budidaya perikanan air tawar melalui
            standar perawatan kolam yang terencana, higienis, dan transparan.
          </p>
        </div>
      </section>

      {/* 2. COMPANY STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold tracking-wider uppercase text-[#1B6044]">
              Kisah Kami
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202923]">
              Berawal Dari Kepedulian Terhadap Mutu dan Kesegaran Ikan Lele
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#6B786F] leading-relaxed">
              <p>
                LeleQu hadir dengan misi sederhana namun mendasar: menyediakan ikan lele segar
                yang terjamin kebersihannya, tidak berbau lumpur, dan memiliki bobot daging yang padat.
                Kebutuhan pasar dan warung makan akan lele berkualitas menuntut pengelolaan kolam
                yang cermat dari awal tebar hingga masa panen.
              </p>
              <p>
                Melalui pengelolaan kolam yang terencana, kami mengontrol secara rutin parameter
                air, kebersihan dasar kolam, dan asupan pakan bernutrisi tinggi. Ikan lele
                yang dibesarkan di fasilitas kami mendapatkan ruang gerak yang cukup dan lingkungan yang sehat.
              </p>
              <p>
                Kami melayani pelanggan secara langsung dengan sistem <strong>Pickup Only</strong> di lokasi kolam.
                Pelanggan dapat menentukan jadwal kedatangan, melihat langsung kondisi ikan lele yang aktif,
                dan menyaksikan proses penimbangan yang transparan.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-4/3 rounded-3xl overflow-hidden border border-neutral-200 shadow-md">
              <img
                src="/public/assets/aistudio/kolam_lele_tok_18245844.jpeg"
                alt="Fasilitas Kolam LeleQu"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-center text-[#6B786F] italic">
              Area kolam budidaya dan pemeliharaan ikan lele LeleQu.
            </p>
          </div>
        </div>
      </section>

      {/* 3. VISION & MISSION */}
      <section className="bg-white py-16 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="p-8 rounded-3xl bg-[#F8FAF6] border border-neutral-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F3E9] flex items-center justify-center text-[#123F2E]">
                <Target className="w-6 h-6 text-[#1B6044]" />
              </div>
              <h3 className="text-xl font-bold text-[#202923]">Visi Perusahaan</h3>
              <p className="text-sm text-[#6B786F] leading-relaxed">
                Menjadi penyedia produk ikan lele air tawar terpercaya yang dikenal luas
                karena kualitas daging terbaik, kebersihan terjamin, dan pelayanan pemesanan
                langsung yang memuaskan pelanggan.
              </p>
            </div>

            {/* Mission */}
            <div className="p-8 rounded-3xl bg-[#F8FAF6] border border-neutral-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F3E9] flex items-center justify-center text-[#123F2E]">
                <Compass className="w-6 h-6 text-[#1B6044]" />
              </div>
              <h3 className="text-xl font-bold text-[#202923]">Misi Perusahaan</h3>
              <ul className="space-y-3 text-sm text-[#6B786F]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#1B6044] shrink-0 mt-0.5" />
                  <span>Menerapkan standar perawatan kolam dan sanitasi air secara berkala.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#1B6044] shrink-0 mt-0.5" />
                  <span>Menyediakan ikan lele segar bebas bau lumpur melalui proses pembersihan yang higienis.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#1B6044] shrink-0 mt-0.5" />
                  <span>Memberikan pelayanan penimbangan jujur dan kemudahan pemesanan ambil langsung di kolam.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPANY VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-xl mx-auto text-center space-y-2">
          <span className="text-xs font-bold tracking-wider uppercase text-[#1B6044]">
            Nilai Perusahaan
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202923]">
            Nilai Utama Pelayanan LeleQu
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#E8F3E9] flex items-center justify-center text-[#1B6044]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#202923]">Kualitas Terjaga</h4>
            <p className="text-xs text-[#6B786F] leading-relaxed">
              Ikan lele sehat, lincah, berdaging padat, dan dipuasakan sebelum penimbangan.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#E8F3E9] flex items-center justify-center text-[#1B6044]">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#202923]">Kejujuran Timbangan</h4>
            <p className="text-xs text-[#6B786F] leading-relaxed">
              Proses timbang terbuka langsung di hadapan pelanggan saat pengambilan di kolam.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#E8F3E9] flex items-center justify-center text-[#1B6044]">
              <Leaf className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#202923]">Alami & Bersih</h4>
            <p className="text-xs text-[#6B786F] leading-relaxed">
              Air kolam dirawat bersih tanpa menggunakan bahan kimia berbahaya.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#E8F3E9] flex items-center justify-center text-[#1B6044]">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#202923]">Pelayanan Terjadwal</h4>
            <p className="text-xs text-[#6B786F] leading-relaxed">
              Penyiapan pesanan sesuai waktu pengambilan yang Anda sepakati.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200 shadow-md space-y-5 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-[#202923]">
            Ingin Memesan Ikan Lele Segar?
          </h3>
          <p className="text-sm text-[#6B786F] max-w-lg mx-auto">
            Gunakan formulir pemesanan online kami dan jadwalkan pengambilan langsung
            di lokasi kolam LeleQu.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openOrderModal()}
              className="px-6 py-3.5 rounded-xl bg-[#1B6044] hover:bg-[#123F2E] text-white font-bold text-sm shadow-sm transition-colors flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Formulir Pesan Lele (Pickup)</span>
            </button>
            <Link
              to="/products"
              className="px-6 py-3.5 rounded-xl bg-[#F8FAF6] hover:bg-neutral-100 text-[#202923] font-semibold text-sm border border-neutral-200 transition-colors"
            >
              Lihat Katalog Produk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
