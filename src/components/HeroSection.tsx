import React from 'react';
import { ArrowRight, Bookmark, Check } from 'lucide-react';
import { Article } from '../types/article';
import { ArticleCoverArt } from './ArticleCoverArt';

interface HeroSectionProps {
  leadArticle: Article;
  onReadArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  leadArticle,
  onReadArticle,
  onToggleBookmark,
  isBookmarked,
}) => {
  return (
    <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Eyebrow & Headline Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3">
            Evidence-Based Resistance Training &amp; Nutrition Journal
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display uppercase leading-none"
            style={{ textWrap: 'balance' }}
          >
            The Science of Hypertrophy, Strength &amp; Biomechanics
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Ten peer-reviewed, masterclass articles dissecting progressive overload, protein kinetics, recovery endocrinology, and joint leverages. Zero fitness industry myths.
          </p>
        </div>

        {/* Focal Anchor: Editorial Lead Story Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-slate-900/90 border border-slate-800 rounded-xl p-5 sm:p-7 items-stretch shadow-2xl">
          
          {/* Visual Artwork Column */}
          <div className="lg:col-span-5 rounded-lg overflow-hidden border border-slate-800 flex items-stretch">
            <ArticleCoverArt
              category={leadArticle.category}
              pattern={leadArticle.visualTheme.pattern}
              accentColor={leadArticle.visualTheme.accentColor}
              aspectRatio="full"
              className="min-h-[220px] lg:min-h-full w-full"
            />
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              {/* Unboxed Metadata Discipline */}
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-2.5">
                <span className="text-amber-400 font-semibold">{leadArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{leadArticle.publishDate}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-numbers">{leadArticle.readTimeMinutes} min read</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">Lead Masterclass</span>
              </div>

              <h2
                onClick={() => onReadArticle(leadArticle)}
                className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight hover:text-amber-300 transition-colors cursor-pointer"
                style={{ textWrap: 'balance' }}
              >
                {leadArticle.title}
              </h2>

              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed line-clamp-3">
                {leadArticle.subtitle}
              </p>

              {/* Lead Takeaway highlights */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-1.5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Key Takeaways:</p>
                {leadArticle.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-amber-400 font-bold shrink-0">―</span>
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Author Byline & CTAs */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-amber-400">
                  {leadArticle.author.avatarInitials}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{leadArticle.author.name}</p>
                  <p className="text-[11px] text-slate-400">{leadArticle.author.credentials}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => onToggleBookmark(leadArticle.id)}
                  aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
                  className={`p-2.5 rounded-lg border text-xs font-medium transition-all ${
                    isBookmarked
                      ? 'bg-amber-400/10 border-amber-400/40 text-amber-300'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:border-slate-600'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={() => onReadArticle(leadArticle)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-md active:scale-[0.98]"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Quantitative Rigor Strip */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 py-4 px-5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs">
          <div>
            <span className="block font-mono-numbers text-lg sm:text-xl font-bold text-white">10</span>
            <span className="text-slate-400">In-Depth Guides</span>
          </div>
          <div>
            <span className="block font-mono-numbers text-lg sm:text-xl font-bold text-amber-400">100%</span>
            <span className="text-slate-400">Evidence-Based</span>
          </div>
          <div>
            <span className="block font-mono-numbers text-lg sm:text-xl font-bold text-white">25+</span>
            <span className="text-slate-400">Peer-Reviewed Papers</span>
          </div>
          <div>
            <span className="block font-mono-numbers text-lg sm:text-xl font-bold text-amber-400">0</span>
            <span className="text-slate-400">Bro-Science Myths</span>
          </div>
        </div>

      </div>
    </section>
  );
};
