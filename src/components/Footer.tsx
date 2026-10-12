import React, { useState } from 'react';
import { Dumbbell, ArrowRight, Check, ShieldCheck, Mail } from 'lucide-react';
import { ArticleCategory } from '../types/article';
import { CATEGORIES } from '../data/articles';

interface FooterProps {
  onSelectCategory: (category: ArticleCategory | 'All') => void;
  onOpenCalculators: () => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenCalculators,
  onNavigateHome,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      
      {/* Newsletter Dispatch Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-1.5 mb-1.5">
                <Mail className="w-3.5 h-3.5" />
                Sunday Research Dispatch
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-tight">
                Peer-Reviewed Hypertrophy Delivered Weekly
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-400">
                Join 14,000+ lifters receiving a single, high-signal breakdown of newly published exercise science every Sunday morning. No spam.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 text-xs sm:text-sm">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>You're subscribed! The next dispatch arrives this Sunday.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 min-w-[260px]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0 shadow-sm"
                  >
                    <span>Subscribe Free</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 text-lg font-bold text-white font-display tracking-wider hover:text-amber-400 transition-colors"
            >
              <Dumbbell className="w-5 h-5 text-amber-400" />
              <span>IRON &amp; SCIENCE</span>
            </button>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An evidence-based publication translating exercise physiology, sports biomechanics, and clinical nutrition into actionable resistance training protocols.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero sponsored supplement affiliate claims. 100% independent.</span>
            </div>
          </div>

          {/* Directory: Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">
              Article Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onSelectCategory(cat)}
                    className="text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Directory: Tools & Calculators */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">
              Athletic Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenCalculators}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  TDEE &amp; Macro Planner
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCalculators}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  One-Rep Max Estimator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Training Splits')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  PPL &amp; Upper/Lower Splits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Form & Biomechanics')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Kinematic Form Checklists
                </button>
              </li>
            </ul>
          </div>

          {/* Editorial & Evidence Standard */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">
              Editorial Rigor
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Open Science Citations</li>
              <li>Pre-Publication Peer Review</li>
              <li>Conflict of Interest Policy</li>
              <li>Human Authorship Standards</li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 text-[11px] text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="max-w-2xl leading-relaxed text-center md:text-left">
            Disclaimer: The materials provided on Iron &amp; Science are for educational and informational purposes only and do not constitute formal medical or physical therapy advice. Consult a licensed healthcare provider before undertaking intensive resistance training or nutritional alterations.
          </p>
          <div className="shrink-0 font-mono-numbers">
            &copy; {new Date().getFullYear()} Iron &amp; Science Journal. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
