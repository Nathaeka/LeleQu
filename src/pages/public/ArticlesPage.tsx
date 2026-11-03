import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArticleCard } from '../../components/articles/ArticleCard';
import { Article } from '../../data/initialData';
import { Search, Filter, BookOpen, Clock, User, ArrowLeft, Share2, Check } from 'lucide-react';

export const ArticlesPage: React.FC = () => {
  const { articles } = useApp();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [copied, setCopied] = useState(false);

  // Check URL query for slug
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const slug = params.get('slug');
    if (slug) {
      const found = articles.find((a) => a.slug === slug);
      if (found) {
        setActiveArticle(found);
        window.scrollTo(0, 0);
      }
    }
  }, [location.search, articles]);

  const categories = [
    { label: 'Semua Kategori', value: 'all' },
    { label: 'Teknik Budidaya', value: 'Teknik' },
    { label: 'Kualitas Air', value: 'Kualitas' },
    { label: 'Pakan & Nutrisi', value: 'Pakan' },
    { label: 'Panen & Distribusi', value: 'Panen' },
  ];

  const publishedArticles = useMemo(() => {
    return articles.filter((a) => a.status === 'published');
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return publishedArticles.filter((art) => {
      const matchSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'all' ||
        art.category.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchSearch && matchCategory;
    });
  }, [publishedArticles, searchQuery, selectedCategory]);

  const featuredArticle = publishedArticles[0];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // If viewing an active article
  if (activeArticle) {
    const related = publishedArticles
      .filter((a) => a.id !== activeArticle.id)
      .slice(0, 3);

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <button
          onClick={() => setActiveArticle(null)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#1B6044] hover:text-[#123F2E] transition-colors p-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Artikel</span>
        </button>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-md bg-[#E8F3E9] text-xs font-bold text-[#123F2E]">
            {activeArticle.category}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#202923] leading-tight">
            {activeArticle.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-neutral-200 text-xs text-[#6B786F]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium text-[#202923]">
                <User className="w-4 h-4 text-[#1B6044]" />
                {activeArticle.author}
              </span>
              <span>·</span>
              <span>{activeArticle.published_at}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeArticle.read_time}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-xs font-medium text-neutral-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tautan Disalin!' : 'Bagikan'}</span>
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-16/9 rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm">
          <img
            src={activeArticle.thumbnail}
            alt={activeArticle.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                '/public/assets/aistudio/kolam_lele_8e878a5c.jpeg';
            }}
          />
        </div>

        {/* Content Body */}
        <div className="prose max-w-none text-[#202923] text-sm sm:text-base leading-relaxed space-y-6 whitespace-pre-line">
          {activeArticle.content}
        </div>

        {/* Author Bio Box */}
        <div className="p-6 rounded-2xl bg-[#F8FAF6] border border-neutral-200 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#1B6044] text-white flex items-center justify-center font-bold text-lg shrink-0">
            {activeArticle.author.charAt(0)}
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#202923]">{activeArticle.author}</h4>
            <p className="text-xs text-[#6B786F] leading-relaxed">
              Praktisi & pemerhati budidaya perikanan air tawar di LeleQu. Berkomitmen
              membagikan wawasan empiris berbasis sains untuk memajukan peternak lele nusantara.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="space-y-6 pt-10 border-t border-neutral-200">
            <h3 className="text-lg font-bold text-[#202923]">Artikel Terkait Lainnya</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((art) => (
                <ArticleCard
                  key={art.id}
                  article={art}
                  onSelect={(item) => {
                    setActiveArticle(item);
                    window.scrollTo(0, 0);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* 1. HERO HEADER */}
      <section className="relative py-16 bg-[#123F2E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#78B98B] border border-white/15">
            Pusat Edukasi LeleQu
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Wawasan & Panduan Budidaya Ikan Lele
          </h1>
          <p className="text-sm sm:text-base text-neutral-200 max-w-2xl mx-auto leading-relaxed">
            Kumpulan artikel edukasi seputar pengelolaan kolam, kualitas air, nutrisi pakan, dan standar panen
            yang disusun langsung oleh Tim LeleQu.
          </p>
        </div>
      </section>

      {/* 2. FEATURED SPOTLIGHT ARTICLE (IF NO SEARCH) */}
      {!searchQuery && selectedCategory === 'all' && featuredArticle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            onClick={() => setActiveArticle(featuredArticle)}
            className="group cursor-pointer bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            <div className="lg:col-span-7 aspect-16/10 lg:aspect-auto relative bg-neutral-100 overflow-hidden">
              <img
                src={featuredArticle.thumbnail}
                alt={featuredArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-lg text-xs font-bold text-[#123F2E] shadow-xs">
                Artikel Pilihan Redaksi
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-medium text-[#6B786F]">
                  <span>{featuredArticle.category}</span>
                  <span>·</span>
                  <span>{featuredArticle.published_at}</span>
                  <span>·</span>
                  <span>{featuredArticle.read_time}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[#202923] group-hover:text-[#1B6044] transition-colors leading-snug">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#6B786F] line-clamp-4 leading-relaxed">
                  {featuredArticle.content}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#202923] font-medium">
                  <User className="w-4 h-4 text-[#1B6044]" />
                  <span>{featuredArticle.author}</span>
                </div>
                <span className="text-xs font-bold text-[#1B6044] group-hover:underline">
                  Baca Selengkapnya →
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. TOOLBAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full flex-1">
              <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari artikel, pengelolaan kolam, kualitas air, pakan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#F8FAF6] border border-neutral-200 text-sm text-[#202923] placeholder:text-[#6B786F] focus:outline-none focus:border-[#1B6044]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-xs font-bold text-[#6B786F] shrink-0 sm:hidden">Kategori:</span>
              {categories.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setSelectedCategory(c.value)}
                  className={`px-3.5 py-2 text-xs rounded-xl font-medium whitespace-nowrap transition-colors shrink-0 ${
                    selectedCategory === c.value
                      ? 'bg-[#1B6044] text-white font-semibold'
                      : 'bg-[#F8FAF6] text-[#6B786F] hover:bg-neutral-100 hover:text-[#202923] border border-neutral-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. ARTICLES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#202923]">Belum Ada Artikel</h3>
            <p className="text-xs text-[#6B786F]">
              Tidak ditemukan artikel yang sesuai dengan kriteria filter Anda.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 text-xs font-semibold bg-[#1B6044] text-white rounded-xl"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <ArticleCard
                key={art.id}
                article={art}
                onSelect={(item) => {
                  setActiveArticle(item);
                  window.scrollTo(0, 0);
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
