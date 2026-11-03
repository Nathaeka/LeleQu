import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../data/initialData';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Check,
  X,
  Filter,
  Image as ImageIcon,
} from 'lucide-react';

export const ManageProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, setSelectedProduct } = useApp();
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    grade: 'Konsumsi (8–10 ekor/kg)',
    price_per_kg: 25000,
    image_url: '/public/assets/aistudio/Ikan_lele_segar_5b6a360e.jpg',
    is_available: true,
    min_order: '3 kg',
    characteristics: 'Ukuran seragam, Daging padat & kenyal, Bebas bau lumpur',
  });

  const availableImagePresets = [
    { label: 'Lele Segar Baskom', url: '/public/assets/aistudio/Ikan_lele_segar_5b6a360e.jpg' },
    { label: 'Lele Frozen Vacuum', url: '/public/assets/aistudio/lele_frozen_577f6962.jpg' },
    { label: 'Fillet Lele Boneless', url: '/public/assets/aistudio/lele_fillet_ab2007db.jpg' },
    { label: 'Rolade Lele Siap Masak', url: '/public/assets/aistudio/Rolade_lele_1c433422.jpg' },
    { label: 'Kolam LeleQu Bobotsari', url: '/public/assets/aistudio/kolam_lele_tok_18245844.jpeg' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.grade.toLowerCase().includes(search.toLowerCase());
      const matchGrade =
        gradeFilter === 'all' || p.grade.toLowerCase().includes(gradeFilter.toLowerCase());
      return matchSearch && matchGrade;
    });
  }, [products, search, gradeFilter]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      grade: 'Konsumsi (8–10 ekor/kg)',
      price_per_kg: 25000,
      image_url: '/public/assets/aistudio/Ikan_lele_segar_5b6a360e.jpg',
      is_available: true,
      min_order: '3 kg',
      characteristics: 'Ukuran seragam, Daging padat & kenyal, Bebas bau lumpur',
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      slug: prod.slug,
      description: prod.description,
      grade: prod.grade,
      price_per_kg: prod.price_per_kg,
      image_url: prod.image_url,
      is_available: prod.is_available,
      min_order: prod.min_order || '5 kg',
      characteristics: prod.characteristics ? prod.characteristics.join(', ') : '',
    });
    setIsFormOpen(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const chars = formData.characteristics
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-');

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formData.name,
        slug,
        description: formData.description,
        grade: formData.grade,
        price_per_kg: Number(formData.price_per_kg),
        image_url: formData.image_url,
        is_available: formData.is_available,
        min_order: formData.min_order,
        characteristics: chars,
      });
    } else {
      addProduct({
        name: formData.name,
        slug,
        description: formData.description,
        grade: formData.grade,
        price_per_kg: Number(formData.price_per_kg),
        image_url: formData.image_url,
        is_available: formData.is_available,
        min_order: formData.min_order,
        characteristics: chars,
      });
    }

    setIsFormOpen(false);
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs">
        <div>
          <h1 className="text-xl font-extrabold text-[#202923]">Manajemen Produk Kolam</h1>
          <p className="text-xs text-[#6B786F]">
            Tambah, perbarui, dan kontrol ketersediaan stok ikan lele untuk katalog publik.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#1B6044] hover:bg-[#123F2E] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Produk Baru</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-neutral-200">
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari produk berdasarkan nama atau grade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#F8FAF6] border border-neutral-200 focus:outline-none focus:border-[#1B6044]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-[#6B786F]" />
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-[#F8FAF6] border border-neutral-200 text-[#202923] focus:outline-none focus:border-[#1B6044]"
          >
            <option value="all">Semua Ukuran</option>
            <option value="Konsumsi">Lele Konsumsi</option>
            <option value="Pecel Lele">Lele Pecel Lele</option>
            <option value="Super">Lele Super / Jumbo</option>
            <option value="Frozen">Frozen / Olahan</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAF6] text-[#6B786F] font-semibold border-b border-neutral-100">
              <tr>
                <th className="py-3 px-4">Foto & Nama Produk</th>
                <th className="py-3 px-4">Ukuran / Kategori</th>
                <th className="py-3 px-4">Harga / kg</th>
                <th className="py-3 px-4">Min. Order</th>
                <th className="py-3 px-4">Status Stok</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-neutral-400">
                    Tidak ada produk yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50/50">
                    <td className="py-3 px-4 flex items-center gap-3 font-semibold text-[#202923]">
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="w-10 h-10 rounded-xl object-cover bg-neutral-100 shrink-0"
                      />
                      <div>
                        <span className="block">{p.name}</span>
                        <span className="text-[11px] text-[#6B786F] font-normal line-clamp-1 max-w-xs">
                          {p.description}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#6B786F] font-medium">{p.grade}</td>
                    <td className="py-3 px-4 font-mono font-bold text-[#123F2E]">
                      {formatRupiah(p.price_per_kg)}
                    </td>
                    <td className="py-3 px-4 text-[#6B786F] font-mono">{p.min_order || '-'}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => updateProduct(p.id, { is_available: !p.is_available })}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                          p.is_available
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                        }`}
                        title="Klik untuk ubah status ketersediaan"
                      >
                        {p.is_available ? 'Siap Panen' : 'Pre-Order'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedProduct(p)}
                          className="p-1.5 text-neutral-500 hover:text-[#1B6044] hover:bg-[#E8F3E9] rounded-lg transition-colors"
                          title="Preview Detail"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 text-neutral-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Produk"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(p)}
                          className="p-1.5 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus Produk"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h3 className="text-base font-bold text-[#202923]">
                {editingProduct ? 'Edit Informasi Produk' : 'Tambah Produk Baru ke Katalog'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-medium text-[#6B786F] mb-1">
                  Nama Produk *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ikan Lele Konsumsi (8–10 ekor/kg)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#6B786F] mb-1">
                    Ukuran / Kategori Produk *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Konsumsi (8–10 ekor/kg) atau Pecel Lele (10–12 ekor/kg)"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#6B786F] mb-1">
                    Harga per Kilogram (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="100"
                    placeholder="25000"
                    value={formData.price_per_kg}
                    onChange={(e) => setFormData({ ...formData, price_per_kg: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#6B786F] mb-1">
                    Minimal Pemesanan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 5 kg atau 1.000 ekor"
                    value={formData.min_order}
                    onChange={(e) => setFormData({ ...formData, min_order: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <label className="flex items-center gap-2 text-xs font-medium text-[#202923] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_available}
                      onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                      className="rounded text-[#1B6044]"
                    />
                    <span>Stok Tersedia (Siap Panen)</span>
                  </label>
                </div>
              </div>

              {/* Image Selection */}
              <div>
                <label className="block text-xs font-medium text-[#6B786F] mb-1">
                  Foto Produk (Pilih Preset atau Masukkan URL)
                </label>
                <input
                  type="text"
                  required
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none font-mono"
                />

                <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1">
                  {availableImagePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, image_url: preset.url })}
                      className={`text-[10px] px-2 py-1 rounded-md border shrink-0 transition-colors ${
                        formData.image_url === preset.url
                          ? 'bg-[#123F2E] text-white border-[#123F2E]'
                          : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#6B786F] mb-1">
                  Deskripsi Lengkap Produk *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Jelaskan karakteristik daging, asal kolam, dan saran pengolahan..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#6B786F] mb-1">
                  Karakteristik Keunggulan (pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  placeholder="Bebas bau lumpur, Daging padat, Pemberokan 24 jam"
                  value={formData.characteristics}
                  onChange={(e) => setFormData({ ...formData, characteristics: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1B6044] hover:bg-[#123F2E] text-white text-xs font-bold"
                >
                  {editingProduct ? 'Simpan Perubahan' : 'Tambahkan Produk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Hapus Produk?"
        message={`Apakah Anda yakin ingin menghapus produk "${deleteTarget?.name}"? Produk ini tidak akan lagi tampil di katalog publik.`}
        confirmLabel="Hapus Produk"
        onConfirm={() => {
          if (deleteTarget) {
            deleteProduct(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};
