import React from 'react';
import { Bookmark, ArrowUpRight, Clock } from 'lucide-react';
import { Article } from '../types/article';
import { ArticleCoverArt } from './ArticleCoverArt';

interface ArticleCardProps {
  article: Article;
  onRead: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onRead,
  onToggleBookmark,
  isBookmarked,
}) => {
  return (
    <article className="group flex flex-col bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl overflow-hidden transition-all duration-200">
      
      {/* Artwork Thumbnail Header */}
      <div
        onClick={() => onRead(article)}
        className="cursor-pointer overflow-hidden border-b border-slate-800/80"
      >
        <ArticleCoverArt
          category={article.category}
          pattern={article.visualTheme.pattern}
          accentColor={article.visualTheme.accentColor}
          aspectRatio="4:3"
          className="transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      {/* Card Content Area */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Zero-Pill Unboxed Metadata with Typographic Separators */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-2.5">
            <span className="text-amber-400 font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishDate}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-numbers flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              {article.readTimeMinutes} min
            </span>
          </div>

          {/* Article Title */}
          <h3
            onClick={() => onRead(article)}
            className="text-lg font-bold text-white font-display tracking-tight group-hover:text-amber-300 transition-colors cursor-pointer leading-snug line-clamp-2"
            style={{ textWrap: 'balance' }}
          >
            {article.title}
          </h3>

          {/* Subtitle / Excerpt */}
          <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
            {article.subtitle}
          </p>
        </div>

        {/* Card Footer: Author & Bookmark Button */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-200">
              {article.author.avatarInitials}
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-slate-300 truncate max-w-[130px] sm:max-w-[150px]">
                {article.author.name}
              </p>
              <p className="text-[10px] text-slate-500 truncate max-w-[130px] sm:max-w-[150px]">
                {article.author.credentials}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onToggleBookmark(article.id)}
              aria-label={isBookmarked ? 'Remove from saved' : 'Save article'}
              className={`p-2 rounded-lg border text-xs transition-colors ${
                isBookmarked
                  ? 'bg-amber-400/10 border-amber-400/40 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => onRead(article)}
              aria-label={`Read ${article.title}`}
              className="p-2 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-200 transition-colors"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </article>
  );
};
