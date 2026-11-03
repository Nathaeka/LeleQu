import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Building,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings } = useApp();

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      'Halo LeleQu, saya ingin menanyakan informasi mengenai ketersediaan ikan lele dan jadwal pengambilan di kolam.'
    );
    window.open(`https://wa.me/${settings.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-12 pb-20">
      {/* 1. HERO HEADER */}
      <section className="relative py-14 bg-[#123F2E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#78B98B] border border-white/15">
            Layanan Pelanggan & Informasi
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Hubungi Kantor & Kolam LeleQu
          </h1>
          <p className="text-sm sm:text-base text-neutral-200 max-w-2xl mx-auto leading-relaxed">
            Punya pertanyaan mengenai ketersediaan lele segar, jadwal panen, atau konfirmasi
            jadwal pengambilan (pickup) langsung di kolam? Tim LeleQu siap melayani Anda melalui WhatsApp resmi.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTACT SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct WhatsApp Contact Card */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B6044] bg-[#E8F3E9] px-2.5 py-1 rounded-lg inline-block">
                Komunikasi Cepat & Langsung
              </span>
              <h2 className="text-2xl font-bold text-[#202923]">
                Layanan Pelanggan via WhatsApp
              </h2>
              <p className="text-xs sm:text-sm text-[#6B786F] leading-relaxed">
                Untuk menjaga respons yang cepat dan langsung terhubung dengan pengelola kolam,
                seluruh komunikasi dan pertanyaan dilakukan langsung melalui WhatsApp resmi LeleQu.
              </p>
            </div>

            {/* Big WhatsApp CTA Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#E8F3E9] to-[#F8FAF6] border border-[#78B98B]/40 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#1B6044] text-white flex items-center justify-center shadow-sm shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-[#1B6044] font-bold block uppercase tracking-wider">
                    Nomor WhatsApp Resmi
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-[#123F2E] font-mono">
                    {settings.phone_display}
                  </span>
                </div>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">
                Klik tombol di bawah ini untuk memulai obrolan langsung di aplikasi WhatsApp Anda.
                Pesan akan langsung terhubung dengan admin dan petugas operasional kami.
              </p>

              <a
                href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
                  'Halo LeleQu, saya ingin menanyakan informasi pemesanan dan ketersediaan ikan lele.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-[#1B6044] hover:bg-[#123F2E] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] text-center"
              >
                <Phone className="w-4 h-4" />
                <span>Hubungi via WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#6B786F]">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F8FAF6] border border-neutral-100">
                <ShieldCheck className="w-4 h-4 text-[#1B6044] shrink-0" />
                <span>Respon cepat di jam kerja operasional</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F8FAF6] border border-neutral-100">
                <Clock className="w-4 h-4 text-[#1B6044] shrink-0" />
                <span>Pelayanan 06:00 – 18:00 WIB</span>
              </div>
            </div>
          </div>

          {/* Right Column: Office & Farm Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-5">
              <h3 className="text-base font-bold text-[#202923] flex items-center gap-2">
                <Building className="w-4 h-4 text-[#1B6044]" />
                <span>Lokasi & Operasional</span>
              </h3>

              <div className="space-y-4 text-xs">
                {/* Alamat Kolam & Penimbangan */}
                <div className="space-y-1 p-3.5 rounded-xl bg-[#F8FAF6] border border-neutral-100">
                  <span className="font-bold text-[#123F2E] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#1B6044]" />
                    Titik Pengambilan / Penimbangan:
                  </span>
                  <p className="text-neutral-600 leading-relaxed pl-5">
                    {settings.pickup_address}
                  </p>
                </div>

                {/* Email Resmi */}
                <div className="space-y-1 p-3.5 rounded-xl bg-[#F8FAF6] border border-neutral-100">
                  <span className="font-bold text-[#123F2E] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#1B6044]" />
                    Email Resmi:
                  </span>
                  <p className="text-neutral-600 pl-5">
                    {settings.email}
                  </p>
                </div>

                {/* Jam Operasional */}
                <div className="space-y-1 p-3.5 rounded-xl bg-[#F8FAF6] border border-neutral-100">
                  <span className="font-bold text-[#123F2E] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#1B6044]" />
                    Jadwal Operasional Kolam:
                  </span>
                  <p className="text-neutral-600 pl-5">
                    Senin – Minggu: 06:00 – 18:00 WIB
                  </p>
                  <p className="text-[11px] text-[#6B786F] pl-5">
                    (Penimbangan & pengambilan sore mulai 15:30 WIB)
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps link card */}
            <div className="bg-[#E8F3E9] rounded-3xl p-5 border border-[#78B98B]/35 space-y-3 text-center">
              <div className="w-10 h-10 rounded-full bg-[#1B6044] text-white flex items-center justify-center mx-auto shadow-xs">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#123F2E]">
                  Peta Lokasi Budidaya LeleQu
                </h4>
                <p className="text-[11px] text-[#202923]/75 mt-0.5">
                  Bobotsari, Purbalingga, Jawa Tengah
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Bobotsari+Purbalingga"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-white hover:bg-neutral-50 text-xs font-bold text-[#1B6044] border border-[#78B98B]/40 inline-flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <span>Buka Petunjuk Arah di Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
