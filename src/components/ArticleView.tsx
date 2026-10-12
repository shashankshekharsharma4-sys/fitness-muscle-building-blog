import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Check,
  Clock,
  BookOpen,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Layers,
  Calendar,
} from 'lucide-react';
import { Article } from '../types/article';
import { ArticleCoverArt } from './ArticleCoverArt';
import { ArticleCard } from './ArticleCard';

interface ArticleViewProps {
  article: Article;
  allArticles: Article[];
  onBack: () => void;
  onReadRelated: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: boolean;
  onSelectTag: (tag: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  allArticles,
  onBack,
  onReadRelated,
  onToggleBookmark,
  isBookmarked,
  onSelectTag,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [article.id]);

  // Track reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const progress = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    const url = `${window.location.origin}/#article/${article.slug}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Find related articles (same category or shared tags)
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .sort((a, b) => {
      const aMatches = a.category === article.category ? 2 : 0;
      const bMatches = b.category === article.category ? 2 : 0;
      return bMatches - aMatches;
    })
    .slice(0, 3);

  return (
    <div className="relative pb-20">
      
      {/* Reading Progress Bar (Fixed Top) */}
      <div
        className="fixed top-16 left-0 right-0 h-1 bg-slate-900 z-50 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-amber-400 transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        
        {/* Navigation Toolbar & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Guides</span>
          </button>

          {/* Quick Toolbar */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            {/* Font size toggle */}
            <button
              onClick={() => setLargeText(!largeText)}
              title="Toggle reading font size"
              className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
            >
              Text: <span className="font-bold">{largeText ? '18px' : '16px'}</span>
            </button>

            {/* Share link button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded border transition-colors ${
                isBookmarked
                  ? 'bg-amber-400/10 border-amber-400/40 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>
          </div>

        </div>

        {/* Article Header */}
        <header className="pt-8 pb-6">
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-medium mb-4">
            <span className="text-amber-400 font-bold tracking-wide uppercase">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-500" />
              {article.publishDate}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-numbers flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              {article.readTimeMinutes} min read
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display uppercase leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {article.title}
          </h1>

          <p className="mt-4 text-base sm:text-xl text-slate-300 leading-relaxed font-light">
            {article.subtitle}
          </p>

          {/* Author Block */}
          <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-amber-400">
                {article.author.avatarInitials}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{article.author.name}</p>
                <p className="text-xs text-slate-400">{article.author.role} · <span className="text-amber-400/90">{article.author.credentials}</span></p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-xs text-slate-500 font-mono-numbers">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Peer-Reviewed Synthesis</span>
            </div>
          </div>
        </header>

        {/* Hero Artwork Graphic */}
        <div className="my-6 rounded-xl overflow-hidden border border-slate-800">
          <ArticleCoverArt
            category={article.category}
            pattern={article.visualTheme.pattern}
            accentColor={article.visualTheme.accentColor}
            aspectRatio="16:9"
            className="w-full max-h-[360px]"
          />
        </div>

        {/* Executive Summary / Key Takeaways Box (Clean styled container without thick left accent border) */}
        <section className="my-8 p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-bold mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Executive Takeaways &amp; Core Principles</span>
          </div>
          <ul className="space-y-2.5">
            {article.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-200 leading-relaxed">
                <span className="font-mono-numbers text-xs text-amber-400 font-bold mt-0.5 shrink-0">
                  0{idx + 1}.
                </span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Article Body Sections */}
        <div className={`space-y-10 text-slate-200 ${largeText ? 'text-lg leading-relaxed' : 'text-base leading-relaxed'}`}>
          {article.sections.map((section, sIdx) => (
            <article key={sIdx} className="space-y-4">
              
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight pt-4 border-t border-slate-800/80">
                {section.heading}
              </h2>

              {section.content.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-slate-300 leading-relaxed max-w-prose">
                  {paragraph}
                </p>
              ))}

              {/* Optional Formatted Data Table */}
              {section.table && (
                <div className="my-6 overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/60 p-1">
                  {section.table.caption && (
                    <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                      {section.table.caption}
                    </div>
                  )}
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900 text-slate-300">
                        {section.table.headers.map((hdr, hIdx) => (
                          <th key={hIdx} className="px-4 py-3 font-semibold">
                            {hdr}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono-numbers">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-800/40 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-4 py-3 text-slate-200">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Optional Callout Box (Science / Protocol / Tip) */}
              {section.callout && (
                <div className="my-6 p-5 rounded-lg bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{section.callout.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {section.callout.text}
                  </p>
                </div>
              )}

            </article>
          ))}
        </div>

        {/* Tags Section */}
        <div className="mt-12 pt-6 border-t border-slate-800">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3">Topic Tags</p>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onSelectTag(tag)}
                className="text-xs px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded hover:text-white transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* References / Bibliography */}
        {article.references.length > 0 && (
          <section className="mt-10 p-6 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3">
              Scientific Literature &amp; Studies Cited
            </h3>
            <ol className="space-y-2 list-decimal list-inside text-xs text-slate-400 font-mono-numbers leading-relaxed">
              {article.references.map((ref, idx) => (
                <li key={idx} className="text-slate-400 hover:text-slate-300 transition-colors">
                  <span>{ref}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Reader Feedback Widget */}
        <div className="mt-10 p-5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-center sm:text-left">
            <p className="font-semibold text-white">Was this evidence-based guide helpful?</p>
            <p className="text-slate-400">Your feedback helps our exercise physiologists refine future protocols.</p>
          </div>
          
          <div className="flex items-center gap-2">
            {feedback === null ? (
              <>
                <button
                  onClick={() => setFeedback('yes')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-300 border border-slate-700 text-slate-200 transition-colors font-medium"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Yes, insightful</span>
                </button>
                <button
                  onClick={() => setFeedback('no')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-slate-800 hover:bg-rose-500/20 hover:text-rose-300 border border-slate-700 text-slate-200 transition-colors font-medium"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>Needs clarity</span>
                </button>
              </>
            ) : (
              <span className="text-amber-400 font-medium flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                Thank you for your feedback!
              </span>
            )}
          </div>
        </div>

        {/* Related Articles Strip */}
        <section className="mt-16 pt-10 border-t border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Keep Reading</p>
              <h3 className="text-xl font-bold text-white font-display">Related Evidence-Based Guides</h3>
            </div>
            <button
              onClick={onBack}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Browse all 10 guides &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedArticles.map((rel) => (
              <ArticleCard
                key={rel.id}
                article={rel}
                onRead={onReadRelated}
                onToggleBookmark={onToggleBookmark}
                isBookmarked={false}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
