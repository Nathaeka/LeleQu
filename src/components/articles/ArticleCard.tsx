import React from 'react';
import { Article } from '../../data/initialData';
import { ArrowRight, User } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelect }) => {
  return (
    <article
      onClick={() => onSelect(article)}
      className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md hover:border-[#78B98B]/60 transition-all duration-200 flex flex-col cursor-pointer"
    >
      <div className="relative aspect-16/10 overflow-hidden bg-neutral-100">
        <img
          src={article.thumbnail}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              '/public/assets/aistudio/kolam_lele_8e878a5c.jpeg';
          }}
        />
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-xs font-semibold text-[#123F2E] shadow-xs">
          {article.category}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Zero-pill metadata with separators */}
          <div className="flex items-center gap-2 text-xs text-[#6B786F]">
            <span>{article.published_at}</span>
            <span aria-hidden="true">·</span>
            <span>{article.read_time}</span>
          </div>

          <h3 className="text-base font-bold text-[#202923] group-hover:text-[#1B6044] transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>

          <p className="text-xs text-[#6B786F] line-clamp-3 leading-relaxed">
            {article.content}
          </p>
        </div>

        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#6B786F]">
            <User className="w-3.5 h-3.5 text-[#1B6044]" />
            <span className="truncate max-w-[140px]">{article.author}</span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B6044] group-hover:translate-x-0.5 transition-transform">
            <span>Baca</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
