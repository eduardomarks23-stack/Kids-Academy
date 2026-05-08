import type { CSSProperties } from 'react';

type Expression = 'happy' | 'curious';

interface DogBergProps {
  size?: number;
  expression?: Expression;
  className?: string;
  ariaLabel?: string;
}

/**
 * Mascote DogBerg — SVG paramétrico extraído do protótipo.
 * Variantes:
 *   - small: 80-100px (Home)
 *   - medium: 120-150px (MENTOR)
 *   - large: 200-250px (Onboarding)
 */
export function DogBerg({
  size = 200,
  expression = 'happy',
  className = '',
  ariaLabel = 'Mascote Kids Academy',
}: DogBergProps) {
  const tailStyle: CSSProperties = {
    transformOrigin: '180px 150px',
    animation: 'wagTail 1.6s ease-in-out infinite',
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      className={className}
      aria-label={ariaLabel}
      role="img"
    >
      <g style={tailStyle}>
        <path d="M180 150 Q210 130 200 110 Q198 105 192 108 Q198 124 178 140 Z" fill="#C9A36A" />
      </g>

      <ellipse cx="78" cy="200" rx="22" ry="14" fill="#C9A36A" />
      <ellipse cx="78" cy="200" rx="22" ry="14" fill="#A57E4A" opacity="0.25" />

      <ellipse cx="120" cy="170" rx="62" ry="44" fill="#E6BE82" />
      <ellipse cx="120" cy="185" rx="40" ry="22" fill="#F8E2BE" />

      <rect x="92" y="190" width="22" height="36" rx="11" fill="#E6BE82" />
      <rect x="128" y="190" width="22" height="36" rx="11" fill="#E6BE82" />
      <ellipse cx="103" cy="226" rx="14" ry="6" fill="#3D2A1A" />
      <ellipse cx="139" cy="226" rx="14" ry="6" fill="#3D2A1A" />

      <ellipse cx="120" cy="105" rx="64" ry="58" fill="#E6BE82" />

      <path d="M62 80 Q40 100 56 140 Q70 158 86 144 Q78 110 80 80 Z" fill="#8B5E34" />
      <path d="M70 92 Q60 110 70 132 Q78 142 84 134 Q78 116 80 96 Z" fill="#A57045" />

      <path d="M178 80 Q200 100 184 140 Q170 158 154 144 Q162 110 160 80 Z" fill="#8B5E34" />
      <path d="M170 92 Q180 110 170 132 Q162 142 156 134 Q162 116 160 96 Z" fill="#A57045" />

      <ellipse cx="148" cy="80" rx="18" ry="14" fill="#8B5E34" opacity="0.55" />

      {expression === 'happy' ? (
        <>
          <path
            d="M92 105 q10 -10 20 0"
            stroke="#2A1A0E"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M128 105 q10 -10 20 0"
            stroke="#2A1A0E"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <circle cx="102" cy="108" r="9" fill="#2A1A0E" />
          <circle cx="138" cy="108" r="9" fill="#2A1A0E" />
          <circle cx="105" cy="105" r="3" fill="#FFFFFF" />
          <circle cx="141" cy="105" r="3" fill="#FFFFFF" />
        </>
      )}

      <circle cx="92" cy="128" r="8" fill="#F8AFA1" opacity="0.7" />
      <circle cx="148" cy="128" r="8" fill="#F8AFA1" opacity="0.7" />

      <ellipse cx="120" cy="132" rx="22" ry="16" fill="#F8E2BE" />
      <ellipse cx="120" cy="124" rx="8" ry="6" fill="#2A1A0E" />
      <path
        d="M120 134 Q120 142 112 144"
        stroke="#2A1A0E"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M120 134 Q120 142 128 144"
        stroke="#2A1A0E"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M116 144 q4 6 8 0 q-2 4 -4 4 q-2 0 -4 -4 z" fill="#F87171" />

      <style>{`
        @keyframes wagTail {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(14deg); }
        }
      `}</style>
    </svg>
  );
}
