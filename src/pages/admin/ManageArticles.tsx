import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Article } from '../../data/initialData';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  FileText,
  Filter,
  CheckCircle,
} from 'lucide-react';

export const ManageArticles: React.FC = () => {
  const { articles, addArticle, updateArticle, deleteArticle } = useApp();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Article | null>(null);

  // Form fields
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Teknik Budidaya',
    thumbnail: '/public/assets/aistudio/kolam_lele_8e878a5c.jpeg',
    author: 'Tim LeleQu',
    read_time: '5 menit baca',
    content: '',
    status: 'published' as 'published' | 'draft',
    published_at: '02 November 2026',
  });

  const availableImagePresets = [
    { label: 'Infografis Pakan Lele', url: '/public/assets/aistudio/image_60f36d86.png' },
    { label: 'Kolam LeleQu Terpal', url: '/public/assets/aistudio/kolam_lele_8e878a5c.jpeg' },
    { label: 'Kolam Bundar Air', url: '/public/assets/aistudio/kolam_lele_tok_18245844.jpeg' },
    { label: 'Ikan Lele Segar', url: '/public/assets/aistudio/Ikan_lele_segar_5b6a360e.jpg' },
    { label: 'Lele Frozen Bersih', url: '/public/assets/aistudio/lele_frozen_577f6962.jpg' },
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchSearch =
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.author.toLowerCase().includes(search.toLowerCase()) ||
        a.content.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        categoryFilter === 'all' || a.category.toLowerCase().includes(categoryFilter.toLowerCase());
      return matchSearch && matchCategory;
    });
  }, [articles, search, categoryFilter]);

  const handleOpenAdd = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Teknik Budidaya',
      thumbnail: '/public/assets/aistudio/kolam_lele_8e878a5c.jpeg',
      author: 'Tim LeleQu',
      read_time: '5 menit baca',
      content: '',
      status: 'published',
      published_at: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (art: Article) => {
    setEditingArticle(art);
    setFormData({
      title: art.title,
      slug: art.slug,
      category: art.category,
      thumbnail: art.thumbnail,
      author: art.author,
      read_time: art.read_time,
      content: art.content,
      status: art.status,
      published_at: art.published_at,
    });
    setIsFormOpen(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    if (editingArticle) {
      updateArticle(editingArticle.id, {
        title: formData.title,
        slug,
        category: formData.category,
        thumbnail: formData.thumbnail,
        author: formData.author,
        read_time: formData.read_time,
        content: formData.content,
        status: formData.status,
      });
    } else {
      addArticle({
        title: formData.title,
        slug,
        category: formData.category,
        thumbnail: formData.thumbnail,
        author: formData.author,
        read_time: formData.read_time,
        content: formData.content,
        status: formData.status,
        published_at: formData.published_at,
      });
    }

    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs">
        <div>
          <h1 className="text-xl font-extrabold text-[#202923]">Manajemen Artikel & Edukasi</h1>
          <p className="text-xs text-[#6B786F]">
            Tulis, sunting, dan atur publikasi artikel budidaya bioflok untuk website publik.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#1B6044] hover:bg-[#123F2E] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Artikel Baru</span>
        </button>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-neutral-200">
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari artikel berdasarkan judul, kata kunci, atau penulis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#F8FAF6] border border-neutral-200 focus:outline-none focus:border-[#1B6044]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-[#6B786F]" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-[#F8FAF6] border border-neutral-200 text-[#202923] focus:outline-none focus:border-[#1B6044]"
          >
            <option value="all">Semua Kategori</option>
            <option value="Teknik">Teknik Budidaya</option>
            <option value="Kualitas">Kualitas Air</option>
            <option value="Pakan">Pakan & Nutrisi</option>
            <option value="Panen">Panen & Distribusi</option>
          </select>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAF6] text-[#6B786F] font-semibold border-b border-neutral-100">
              <tr>
                <th className="py-3 px-4">Thumbnail & Judul Artikel</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Penulis</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Tanggal Rilis</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-neutral-400">
                    Tidak ada artikel yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-neutral-50/50">
                    <td className="py-3 px-4 flex items-center gap-3 font-semibold text-[#202923]">
                      <img
                        src={art.thumbnail}
                        alt={art.title}
                        className="w-12 h-9 rounded-lg object-cover bg-neutral-100 shrink-0"
                      />
                      <div className="max-w-sm">
                        <span className="block truncate">{art.title}</span>
                        <span className="text-[10px] text-[#6B786F] font-normal font-mono block">
                          /{art.slug}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#6B786F]">{art.category}</td>
                    <td className="py-3 px-4 text-[#6B786F]">{art.author}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() =>
                          updateArticle(art.id, {
                            status: art.status === 'published' ? 'draft' : 'published',
                          })
                        }
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                          art.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                        title="Klik untuk ubah status publikasi"
                      >
                        {art.status === 'published' ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-[#6B786F] font-mono whitespace-nowrap">
                      {art.published_at}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(art)}
                          className="p-1.5 text-neutral-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Sunting Artikel"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(art)}
                          className="p-1.5 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus Artikel"
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

      {/* Add / Edit Article Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h3 className="text-base font-bold text-[#202923]">
                {editingArticle ? 'Sunting Artikel Edukasi' : 'Tulis Artikel Edukasi Baru'}
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
                  Judul Artikel *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Teknik Pemberian Pakan Bioflok Yang Tepat"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#6B786F] mb-1">
                    Kategori *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none"
                  >
                    <option value="Teknik Budidaya">Teknik Budidaya</option>
                    <option value="Kualitas Air">Kualitas Air</option>
                    <option value="Pakan & Nutrisi">Pakan & Nutrisi</option>
                    <option value="Panen & Distribusi">Panen & Distribusi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#6B786F] mb-1">
                    Nama Penulis *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#6B786F] mb-1">
                    Status Publikasi
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none font-semibold"
                  >
                    <option value="published">Published (Tayang)</option>
                    <option value="draft">Draft (Disimpan Saja)</option>
                  </select>
                </div>
              </div>

              {/* Thumbnail selector */}
              <div>
                <label className="block text-xs font-medium text-[#6B786F] mb-1">
                  Gambar Thumbnail
                </label>
                <input
                  type="text"
                  required
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none font-mono"
                />

                <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1">
                  {availableImagePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, thumbnail: preset.url })}
                      className={`text-[10px] px-2 py-1 rounded-md border shrink-0 transition-colors ${
                        formData.thumbnail === preset.url
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
                  Isi Konten Artikel *
                </label>
                <textarea
                  rows={8}
                  required
                  placeholder="Tuliskan materi edukasi, poin-poin parameter air, atau panduan teknis secara komprehensif..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none leading-relaxed"
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
                  {editingArticle ? 'Simpan Perubahan' : 'Terbitkan Artikel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Hapus Artikel?"
        message={`Apakah Anda yakin ingin menghapus artikel "${deleteTarget?.title}"?`}
        confirmLabel="Hapus Artikel"
        onConfirm={() => {
          if (deleteTarget) {
            deleteArticle(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};
