import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ARTICLES, CATEGORIES } from './data/articles';
import { Article, ArticleCategory } from './types/article';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SearchFilterBar } from './components/SearchFilterBar';
import { ArticleCard } from './components/ArticleCard';
import { ArticleView } from './components/ArticleView';
import { FitnessCalculators } from './components/FitnessCalculators';
import { SavedArticlesView } from './components/SavedArticlesView';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & view state
  const [currentView, setCurrentView] = useState<'home' | 'article' | 'saved' | 'calculators'>('home');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  // Search & Filtering state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | 'All'>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'readTime-asc' | 'readTime-desc'>('latest');

  // Bookmarking in localStorage
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('iron_science_saved_articles');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Synchronize saved articles with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('iron_science_saved_articles', JSON.stringify(savedArticleIds));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [savedArticleIds]);

  // Handle URL hash changes for robust direct link support and browser history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#article/')) {
        const slug = hash.replace('#article/', '');
        const found = ARTICLES.find((a) => a.slug === slug);
        if (found) {
          setActiveArticle(found);
          setCurrentView('article');
          document.title = `${found.title} — Iron & Science`;
          return;
        }
      } else if (hash === '#saved') {
        setCurrentView('saved');
        document.title = 'Saved Articles — Iron & Science';
        return;
      } else if (hash === '#calculators') {
        setCurrentView('calculators');
        document.title = 'Fitness Calculators — Iron & Science';
        return;
      }

      // Default home
      setCurrentView('home');
      setActiveArticle(null);
      document.title = 'Iron & Science — Evidence-Based Fitness & Hypertrophy Journal';
    };

    // Run on initial load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Toggle bookmark handler
  const handleToggleBookmark = (articleId: string) => {
    setSavedArticleIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  // Clear all bookmarks
  const handleClearAllBookmarks = () => {
    setSavedArticleIds([]);
  };

  // Open an article in dedicated view
  const handleReadArticle = (article: Article) => {
    setActiveArticle(article);
    setCurrentView('article');
    window.location.hash = `#article/${article.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate back to home/all articles
  const handleNavigateHome = () => {
    setCurrentView('home');
    setActiveArticle(null);
    setSelectedCategory('All');
    setSelectedTag(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open saved list
  const handleOpenSaved = () => {
    setCurrentView('saved');
    window.location.hash = '#saved';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open calculators
  const handleOpenCalculators = () => {
    setCurrentView('calculators');
    window.location.hash = '#calculators';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Category selection
  const handleSelectCategory = (category: ArticleCategory | 'All') => {
    setSelectedCategory(category);
    setSelectedTag(null);
    if (currentView !== 'home') {
      setCurrentView('home');
      window.location.hash = '';
    }
    // Scroll to articles grid
    const el = document.getElementById('articles-feed');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Tag selection
  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
    setSelectedCategory('All');
    if (currentView !== 'home') {
      setCurrentView('home');
      window.location.hash = '';
    }
    const el = document.getElementById('articles-feed');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Focus search input
  const handleFocusSearch = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      window.location.hash = '';
    }
    setTimeout(() => {
      const input = document.getElementById('article-search-input');
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Filtered and sorted articles
  const filteredArticles = useMemo(() => {
    let result = [...ARTICLES];

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter((a) => a.category === selectedCategory);
    }

    // Filter by Tag
    if (selectedTag) {
      result = result.filter((a) => a.tags.includes(selectedTag));
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.summary.toLowerCase().includes(q) ||
          a.sections.some((s) =>
            s.heading.toLowerCase().includes(q) ||
            s.content.some((c) => c.toLowerCase().includes(q))
          )
      );
    }

    // Sort
    if (sortBy === 'readTime-asc') {
      result.sort((a, b) => a.readTimeMinutes - b.readTimeMinutes);
    } else if (sortBy === 'readTime-desc') {
      result.sort((a, b) => b.readTimeMinutes - a.readTimeMinutes);
    }
    // Default 'latest' preserves array order (chronological release)

    return result;
  }, [selectedCategory, selectedTag, searchQuery, sortBy]);

  // Saved articles array
  const savedArticlesList = useMemo(() => {
    return ARTICLES.filter((a) => savedArticleIds.includes(a.id));
  }, [savedArticleIds]);

  // Lead article for the Hero section
  const leadArticle = ARTICLES[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-slate-950 font-sans">
      
      {/* Top Navigation Bar */}
      <Navbar
        onSelectCategory={handleSelectCategory}
        onNavigateHome={handleNavigateHome}
        onOpenCalculators={handleOpenCalculators}
        onOpenSaved={handleOpenSaved}
        savedCount={savedArticleIds.length}
        onFocusSearch={handleFocusSearch}
        activeNav={
          currentView === 'saved'
            ? 'saved'
            : currentView === 'calculators'
            ? 'calculators'
            : selectedCategory !== 'All'
            ? selectedCategory
            : 'home'
        }
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: Dedicated Single Article Page */}
        {currentView === 'article' && activeArticle && (
          <ArticleView
            article={activeArticle}
            allArticles={ARTICLES}
            onBack={handleNavigateHome}
            onReadRelated={handleReadArticle}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={savedArticleIds.includes(activeArticle.id)}
            onSelectTag={handleSelectTag}
          />
        )}

        {/* VIEW 2: Saved Articles Reading List */}
        {currentView === 'saved' && (
          <SavedArticlesView
            savedArticles={savedArticlesList}
            onBack={handleNavigateHome}
            onReadArticle={handleReadArticle}
            onToggleBookmark={handleToggleBookmark}
            onClearAll={handleClearAllBookmarks}
          />
        )}

        {/* VIEW 3: Dedicated Calculators View */}
        {currentView === 'calculators' && (
          <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
              <button
                onClick={handleNavigateHome}
                className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                &larr; Back to All Articles
              </button>
            </div>
            <FitnessCalculators />
          </div>
        )}

        {/* VIEW 4: Default Homepage with Hero, Search, Category Tabs, Grid and Tools */}
        {currentView === 'home' && (
          <>
            {/* Hero Section with Lead Spotlight */}
            <HeroSection
              leadArticle={leadArticle}
              onReadArticle={handleReadArticle}
              onToggleBookmark={handleToggleBookmark}
              isBookmarked={savedArticleIds.includes(leadArticle.id)}
            />

            {/* Articles Feed & Directory */}
            <section id="articles-feed" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Section Header & Subtitle */}
              <div className="mb-8">
                <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
                  The Full Research Library
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-display uppercase tracking-tight">
                  Evidence-Based Articles &amp; Protocols
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Explore 10 comprehensive guides covering every dimension of natural muscle building and athletic performance.
                </p>
              </div>

              {/* Search & Category Filter Controls */}
              <div className="mb-8">
                <SearchFilterBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  selectedTag={selectedTag}
                  onTagChange={setSelectedTag}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  resultCount={filteredArticles.length}
                  totalCount={ARTICLES.length}
                />
              </div>

              {/* Article Cards Grid */}
              {filteredArticles.length === 0 ? (
                <div className="text-center py-16 px-4 bg-slate-900/40 border border-slate-800 rounded-xl my-6">
                  <p className="text-base font-semibold text-white">No articles matched your criteria</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Try clearing your search query or choosing another category filter.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedTag(null);
                    }}
                    className="mt-4 px-4 py-2 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onRead={handleReadArticle}
                      onToggleBookmark={handleToggleBookmark}
                      isBookmarked={savedArticleIds.includes(article.id)}
                    />
                  ))}
                </div>
              )}

            </section>

            {/* Embedded Fitness Tools & Calculators on Homepage */}
            <FitnessCalculators />
          </>
        )}

      </main>

      {/* Global Responsive Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenCalculators={handleOpenCalculators}
        onNavigateHome={handleNavigateHome}
      />

    </div>
  );
}
