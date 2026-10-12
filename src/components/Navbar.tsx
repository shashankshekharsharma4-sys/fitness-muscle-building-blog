import React, { useState } from 'react';
import { Search, Bookmark, Menu, X, Dumbbell } from 'lucide-react';
import { ArticleCategory } from '../types/article';

interface NavbarProps {
  onSelectCategory: (category: ArticleCategory | 'All') => void;
  onNavigateHome: () => void;
  onOpenCalculators: () => void;
  onOpenSaved: () => void;
  savedCount: number;
  onFocusSearch: () => void;
  activeNav: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectCategory,
  onNavigateHome,
  onOpenCalculators,
  onOpenSaved,
  savedCount,
  onFocusSearch,
  activeNav,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: 3 zones separated by gap-8 */}
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick(onNavigateHome)}
            className="flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-wider text-white whitespace-nowrap shrink-0 font-display hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <Dumbbell className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>IRON &amp; SCIENCE</span>
          </button>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNavClick(onNavigateHome)}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeNav === 'home' || activeNav === 'all'
                  ? 'border-amber-400 text-white font-semibold'
                  : 'border-transparent text-slate-400'
              }`}
            >
              All Guides
            </button>
            <button
              onClick={() => handleNavClick(() => onSelectCategory('Hypertrophy'))}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeNav === 'Hypertrophy'
                  ? 'border-amber-400 text-white font-semibold'
                  : 'border-transparent text-slate-400'
              }`}
            >
              Hypertrophy
            </button>
            <button
              onClick={() => handleNavClick(() => onSelectCategory('Nutrition'))}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeNav === 'Nutrition'
                  ? 'border-amber-400 text-white font-semibold'
                  : 'border-transparent text-slate-400'
              }`}
            >
              Nutrition
            </button>
            <button
              onClick={() => handleNavClick(onOpenCalculators)}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeNav === 'calculators'
                  ? 'border-amber-400 text-white font-semibold'
                  : 'border-transparent text-slate-400'
              }`}
            >
              Calculators
            </button>
            <button
              onClick={() => handleNavClick(onOpenSaved)}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 flex items-center gap-1.5 ${
                activeNav === 'saved'
                  ? 'border-amber-400 text-white font-semibold'
                  : 'border-transparent text-slate-400'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="font-mono-numbers text-xs text-amber-400 ml-0.5">({savedCount})</span>
              )}
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onFocusSearch}
              aria-label="Search articles"
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700/80 rounded-md hover:border-slate-500 hover:text-white transition-all whitespace-nowrap shrink-0"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search Library</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white focus-visible:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile menu accordion */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 py-3 space-y-2">
            <button
              onClick={() => handleNavClick(onNavigateHome)}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded"
            >
              All Guides
            </button>
            <button
              onClick={() => handleNavClick(() => onSelectCategory('Hypertrophy'))}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded"
            >
              Hypertrophy
            </button>
            <button
              onClick={() => handleNavClick(() => onSelectCategory('Nutrition'))}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded"
            >
              Nutrition
            </button>
            <button
              onClick={() => handleNavClick(() => onSelectCategory('Recovery'))}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded"
            >
              Recovery &amp; Sleep
            </button>
            <button
              onClick={() => handleNavClick(() => onSelectCategory('Form & Biomechanics'))}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded"
            >
              Form &amp; Biomechanics
            </button>
            <button
              onClick={() => handleNavClick(onOpenCalculators)}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded"
            >
              TDEE &amp; 1RM Calculators
            </button>
            <button
              onClick={() => handleNavClick(onOpenSaved)}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded flex items-center justify-between"
            >
              <span>Saved Articles</span>
              {savedCount > 0 && <span className="font-mono-numbers text-xs text-amber-400">({savedCount})</span>}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
