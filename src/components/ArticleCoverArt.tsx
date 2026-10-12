import React from 'react';

interface ArticleCoverArtProps {
  category: string;
  pattern: 'barbell' | 'dna' | 'timer' | 'graph' | 'plate' | 'molecule';
  accentColor: string;
  className?: string;
  aspectRatio?: '16:9' | '4:3' | 'full';
}

export const ArticleCoverArt: React.FC<ArticleCoverArtProps> = ({
  category,
  pattern,
  accentColor,
  className = '',
  aspectRatio = '4:3',
}) => {
  // Theme color mapping for dark athletic aesthetic
  const getColors = () => {
    switch (accentColor) {
      case 'amber':
        return {
          glow: 'rgba(245, 158, 11, 0.15)',
          stroke: '#f59e0b',
          fill: '#b45309',
          gradient1: '#1e1b18',
          gradient2: '#0f172a',
        };
      case 'emerald':
        return {
          glow: 'rgba(16, 185, 129, 0.15)',
          stroke: '#10b981',
          fill: '#047857',
          gradient1: '#131e1c',
          gradient2: '#0f172a',
        };
      case 'sky':
        return {
          glow: 'rgba(14, 165, 233, 0.15)',
          stroke: '#0ea5e9',
          fill: '#0369a1',
          gradient1: '#121e29',
          gradient2: '#0f172a',
        };
      case 'violet':
        return {
          glow: 'rgba(139, 92, 246, 0.15)',
          stroke: '#8b5cf6',
          fill: '#6d28d9',
          gradient1: '#1b1429',
          gradient2: '#0f172a',
        };
      case 'rose':
        return {
          glow: 'rgba(244, 63, 94, 0.15)',
          stroke: '#f43f5e',
          fill: '#be123c',
          gradient1: '#26141c',
          gradient2: '#0f172a',
        };
      case 'cyan':
      default:
        return {
          glow: 'rgba(6, 182, 212, 0.15)',
          stroke: '#06b6d4',
          fill: '#0e7490',
          gradient1: '#122228',
          gradient2: '#0f172a',
        };
    }
  };

  const colors = getColors();

  const aspectClass =
    aspectRatio === '16:9'
      ? 'aspect-video'
      : aspectRatio === '4:3'
      ? 'aspect-[4/3]'
      : 'h-full w-full';

  return (
    <div
      className={`relative overflow-hidden bg-slate-900 border border-slate-800/80 ${aspectClass} ${className} flex items-center justify-center select-none`}
      style={{
        background: `radial-gradient(circle at 60% 40%, ${colors.glow} 0%, transparent 65%), linear-gradient(135deg, ${colors.gradient1} 0%, #030712 100%)`,
      }}
    >
      {/* Background isometric grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`grid-${category}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="0.5"
              strokeDasharray="2 4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${category})`} />
      </svg>

      {/* Centerpiece Vector Illustration */}
      <div className="relative z-10 w-3/4 max-w-[280px] flex flex-col items-center justify-center p-4">
        {pattern === 'barbell' && (
          <svg viewBox="0 0 200 100" className="w-full h-auto drop-shadow-md">
            {/* Barbell shaft */}
            <rect x="20" y="47" width="160" height="6" rx="2" fill="#cbd5e1" />
            <rect x="75" y="46" width="50" height="8" rx="1" fill="#94a3b8" />
            {/* Inner collars */}
            <rect x="52" y="40" width="6" height="20" rx="1" fill="#64748b" />
            <rect x="142" y="40" width="6" height="20" rx="1" fill="#64748b" />
            {/* 45 lb Olympic Plates Left */}
            <rect x="36" y="24" width="12" height="52" rx="3" fill="#1e293b" stroke={colors.stroke} strokeWidth="1.5" />
            <rect x="22" y="28" width="10" height="44" rx="2" fill="#334155" stroke="#475569" strokeWidth="1" />
            {/* 45 lb Olympic Plates Right */}
            <rect x="152" y="24" width="12" height="52" rx="3" fill="#1e293b" stroke={colors.stroke} strokeWidth="1.5" />
            <rect x="168" y="28" width="10" height="44" rx="2" fill="#334155" stroke="#475569" strokeWidth="1" />
            {/* Load vector dynamic arcs */}
            <path d="M 60 78 Q 100 88 140 78" fill="none" stroke={colors.stroke} strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="100" cy="83" r="3" fill={colors.stroke} />
          </svg>
        )}

        {pattern === 'molecule' && (
          <svg viewBox="0 0 200 100" className="w-full h-auto drop-shadow-md">
            {/* Amino acid / nitrogen ring bond representation */}
            <circle cx="60" cy="50" r="16" fill="#1e293b" stroke={colors.stroke} strokeWidth="1.5" />
            <text x="60" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontFamily="monospace">NH2</text>
            <line x1="76" y1="50" x2="105" y2="50" stroke="#64748b" strokeWidth="2" />
            
            <circle cx="120" cy="50" r="15" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="120" y="54" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="monospace">CH</text>
            
            <line x1="120" y1="35" x2="120" y2="20" stroke="#64748b" strokeWidth="2" />
            <circle cx="120" cy="18" r="8" fill={colors.fill} stroke={colors.stroke} strokeWidth="1" />
            
            <line x1="135" y1="50" x2="160" y2="50" stroke="#64748b" strokeWidth="2" />
            <circle cx="170" cy="50" r="14" fill="#1e293b" stroke={colors.stroke} strokeWidth="1.5" />
            <text x="170" y="54" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">COOH</text>

            <path d="M 40 80 L 160 80" stroke={colors.stroke} strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
          </svg>
        )}

        {pattern === 'graph' && (
          <svg viewBox="0 0 200 100" className="w-full h-auto drop-shadow-md">
            {/* Axis */}
            <line x1="30" y1="80" x2="175" y2="80" stroke="#475569" strokeWidth="1.5" />
            <line x1="30" y1="15" x2="30" y2="80" stroke="#475569" strokeWidth="1.5" />
            {/* Hypertrophy stimulus curve */}
            <path
              d="M 30 75 Q 70 65 100 30 T 170 20"
              fill="none"
              stroke={colors.stroke}
              strokeWidth="2.5"
            />
            {/* Fatigue curve */}
            <path
              d="M 30 75 Q 90 70 130 50 T 170 35"
              fill="none"
              stroke="#64748b"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            {/* Optimal zone highlight */}
            <rect x="85" y="20" width="40" height="60" fill={colors.glow} rx="2" />
            <circle cx="100" cy="30" r="4" fill={colors.stroke} />
            <text x="105" y="75" fill="#94a3b8" fontSize="8" fontFamily="monospace">MAV ZONE</text>
          </svg>
        )}

        {pattern === 'timer' && (
          <svg viewBox="0 0 200 100" className="w-full h-auto drop-shadow-md">
            {/* Circadian clock & recovery loop */}
            <circle cx="100" cy="50" r="34" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            <circle cx="100" cy="50" r="34" fill="none" stroke={colors.stroke} strokeWidth="2.5" strokeDasharray="140 220" strokeLinecap="round" />
            {/* Clock hands */}
            <line x1="100" y1="50" x2="100" y2="28" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" />
            <line x1="100" y1="50" x2="116" y2="50" stroke={colors.stroke} strokeWidth="2" strokeLinecap="round" />
            <circle cx="100" cy="50" r="3" fill="#ffffff" />
            {/* Nocturnal pulse wave */}
            <path d="M 30 50 Q 45 42 60 50 T 75 50" fill="none" stroke="#475569" strokeWidth="1.5" />
            <path d="M 125 50 Q 140 58 155 50 T 170 50" fill="none" stroke={colors.stroke} strokeWidth="1.5" />
          </svg>
        )}

        {pattern === 'plate' && (
          <svg viewBox="0 0 200 100" className="w-full h-auto drop-shadow-md">
            {/* Olympic bumper plate circular face */}
            <circle cx="100" cy="50" r="38" fill="#1e293b" stroke={colors.stroke} strokeWidth="2" />
            <circle cx="100" cy="50" r="30" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 3" />
            <circle cx="100" cy="50" r="14" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="100" cy="50" r="6" fill="#020617" />
            {/* Metric engravings */}
            <text x="100" y="32" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold" letterSpacing="1">20 KG</text>
            <text x="100" y="74" textAnchor="middle" fill="#94a3b8" fontSize="7" letterSpacing="1">IRON &amp; SCI</text>
          </svg>
        )}

        {pattern === 'dna' && (
          <svg viewBox="0 0 200 100" className="w-full h-auto drop-shadow-md">
            <path d="M 40 30 Q 70 70 100 30 T 160 30" fill="none" stroke={colors.stroke} strokeWidth="2" />
            <path d="M 40 70 Q 70 30 100 70 T 160 70" fill="none" stroke="#64748b" strokeWidth="2" />
            <line x1="55" y1="42" x2="55" y2="58" stroke="#94a3b8" strokeWidth="1" />
            <line x1="85" y1="42" x2="85" y2="58" stroke="#94a3b8" strokeWidth="1" />
            <line x1="115" y1="42" x2="115" y2="58" stroke="#94a3b8" strokeWidth="1" />
            <line x1="145" y1="42" x2="145" y2="58" stroke="#94a3b8" strokeWidth="1" />
          </svg>
        )}
      </div>

      {/* Subtle bottom gradient tint */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
    </div>
  );
};
