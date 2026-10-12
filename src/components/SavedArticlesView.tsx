import React from 'react';
import { ArrowLeft, Bookmark, Trash2, BookOpen } from 'lucide-react';
import { Article } from '../types/article';
import { ArticleCard } from './ArticleCard';

interface SavedArticlesViewProps {
  savedArticles: Article[];
  onBack: () => void;
  onReadArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const SavedArticlesView: React.FC<SavedArticlesViewProps> = ({
  savedArticles,
  onBack,
  onReadArticle,
  onToggleBookmark,
  onClearAll,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header and Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to All Guides</span>
        </button>

        {savedArticles.length > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Saved List</span>
          </button>
        )}
      </div>

      <div className="my-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">
          <Bookmark className="w-4 h-4 fill-current" />
          <span>Your Personal Reading List</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white font-display uppercase tracking-tight">
          Saved Evidence-Based Articles
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Articles bookmarked on your device for offline reference and gym programming.
        </p>
      </div>

      {savedArticles.length === 0 ? (
        <div className="text-center py-16 px-4 bg-slate-900/60 border border-slate-800 rounded-xl my-6">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-white">No articles saved yet</h2>
          <p className="mt-1 text-sm text-slate-400 max-w-sm mx-auto">
            Click the bookmark icon on any guide or article to save it here for quick access.
          </p>
          <button
            onClick={onBack}
            className="mt-6 px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors"
          >
            Explore 10 Evidence-Based Guides
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onRead={onReadArticle}
              onToggleBookmark={onToggleBookmark}
              isBookmarked={true}
            />
          ))}
        </div>
      )}

    </div>
  );
};
