import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { ArticleCategory } from '../types/article';
import { CATEGORIES } from '../data/articles';

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ArticleCategory | 'All';
  onCategoryChange: (category: ArticleCategory | 'All') => void;
  selectedTag: string | null;
  onTagChange: (tag: string | null) => void;
  sortBy: 'latest' | 'readTime-asc' | 'readTime-desc';
  onSortChange: (sort: 'latest' | 'readTime-asc' | 'readTime-desc') => void;
  resultCount: number;
  totalCount: number;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedTag,
  onTagChange,
  sortBy,
  onSortChange,
  resultCount,
  totalCount,
}) => {
  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || selectedTag !== null;

  const handleReset = () => {
    onSearchChange('');
    onCategoryChange('All');
    onTagChange(null);
  };

  return (
    <div className="space-y-4">
      {/* Top Search Input & Sort Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Live Search Field */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            id="article-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search mechanics, protein, squats, deload..."
            className="w-full pl-10 pr-9 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort and Counter */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 rounded-md px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-amber-400"
            >
              <option value="latest">Latest Published</option>
              <option value="readTime-asc">Shortest Read</option>
              <option value="readTime-desc">Longest Read</option>
            </select>
          </div>

          <div className="font-mono-numbers text-slate-400">
            Showing <strong className="text-white">{resultCount}</strong> of {totalCount}
          </div>
        </div>

      </div>

      {/* Interactive Category Segmented Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => onCategoryChange('All')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
            selectedCategory === 'All'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
          }`}
        >
          All Topics ({totalCount})
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            {cat}
          </button>
        ))}

        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="ml-auto px-2.5 py-1 text-xs text-rose-400 hover:text-rose-300 underline underline-offset-2 whitespace-nowrap"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Active tag banner if a tag is active */}
      {selectedTag && (
        <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
          <span>Filtering by tag:</span>
          <span className="font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 flex items-center gap-1">
            #{selectedTag}
            <button onClick={() => onTagChange(null)} className="hover:text-white ml-1">
              <X className="w-3 h-3" />
            </button>
          </span>
        </div>
      )}
    </div>
  );
};
