import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { Save, RefreshCw, Building, Phone, MapPin, BarChart3 } from 'lucide-react';

export const ManageSettings: React.FC = () => {
  const { settings, updateSettings, resetAllData } = useApp();
  const [formData, setFormData] = useState({ ...settings });
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs">
        <div>
          <h1 className="text-xl font-extrabold text-[#202923]">Pengaturan Perusahaan & Profil</h1>
          <p className="text-xs text-[#6B786F]">
            Konfigurasi informasi kontak, alamat operasional, dan statistik yang tampil pada website publik.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setResetModalOpen(true)}
          className="px-3.5 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset ke Data Awal</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand & Identity */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-100 text-xs font-bold uppercase tracking-wider text-[#1B6044]">
            <Building className="w-4 h-4" />
            <span>Identitas Perusahaan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#6B786F] mb-1">
                Nama Perusahaan
              </label>
              <input
                type="text"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#6B786F] mb-1">
                Tagline Resmi
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6B786F] mb-1">
              Headline Utama Homepage
            </label>
            <input
              type="text"
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6B786F] mb-1">
              Deskripsi Singkat Perusahaan
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-100 text-xs font-bold uppercase tracking-wider text-[#1B6044]">
            <Phone className="w-4 h-4" />
            <span>Kontak & Lokasi Kantor</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#6B786F] mb-1">
                Nomor WhatsApp (Format angka)
              </label>
              <input
                type="text"
                placeholder="6281234567890"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#6B786F] mb-1">
                Tampilan Nomor Telepon
              </label>
              <input
                type="text"
                placeholder="+62 812-3456-7890"
                value={formData.phone_display}
                onChange={(e) => setFormData({ ...formData, phone_display: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#6B786F] mb-1">
                Email Perusahaan
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6B786F] mb-1">
              Alamat Lengkap Fasilitas & Kolam
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6B786F] mb-1">
              Lokasi Pengambilan Ikan (Pickup Address di Formulir Pesan)
            </label>
            <input
              type="text"
              value={formData.pickup_address}
              onChange={(e) => setFormData({ ...formData, pickup_address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none"
            />
          </div>
        </div>

        {/* Company Stats Counters */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-100 text-xs font-bold uppercase tracking-wider text-[#1B6044]">
            <BarChart3 className="w-4 h-4" />
            <span>Statistik Highlights Homepage</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#6B786F] mb-1">
                Jumlah Kolam
              </label>
              <input
                type="text"
                value={formData.stat_ponds}
                onChange={(e) => setFormData({ ...formData, stat_ponds: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-[#123F2E] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#6B786F] mb-1">
                Kapasitas Panen
              </label>
              <input
                type="text"
                value={formData.stat_harvest}
                onChange={(e) => setFormData({ ...formData, stat_harvest: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-[#123F2E] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#6B786F] mb-1">
                Pesanan Terlayani
              </label>
              <input
                type="text"
                value={formData.stat_orders}
                onChange={(e) => setFormData({ ...formData, stat_orders: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-[#123F2E] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#6B786F] mb-1">
                Standar Kualitas
              </label>
              <input
                type="text"
                value={formData.stat_quality}
                onChange={(e) => setFormData({ ...formData, stat_quality: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-[#123F2E] font-mono"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#1B6044] hover:bg-[#123F2E] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Pengaturan</span>
          </button>
        </div>
      </form>

      {/* Reset Confirmation Modal */}
      <ConfirmationModal
        isOpen={resetModalOpen}
        title="Reset Semua Data ke Default?"
        message="Tindakan ini akan mengembalikan seluruh produk, artikel, kemitraan, pesan, dan pengaturan ke data contoh awal. Lanjutkan?"
        confirmLabel="Reset Sekarang"
        onConfirm={() => {
          resetAllData();
          setFormData({ ...settings });
        }}
        onClose={() => setResetModalOpen(false)}
      />
    </div>
  );
};
