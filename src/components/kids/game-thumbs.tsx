/**
 * Ilustrações SVG por jogo. Cada thumb é desenhada à mão para refletir
 * visualmente o conceito — pizza p/ frações, formas geométricas p/ encaixe,
 * letra com brilhos p/ alfabetização.
 *
 * Tamanho default 120px, escala via prop. Sem dependências externas.
 */

interface ThumbProps {
  size?: number;
  className?: string;
}

const PegaFracoesThumb = ({ size = 120, className }: ThumbProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="pf-pizza" cx="0.5" cy="0.45" r="0.6">
        <stop offset="0%" stopColor="#FED7AA" />
        <stop offset="100%" stopColor="#FB923C" />
      </radialGradient>
    </defs>
    <circle cx="60" cy="60" r="48" fill="url(#pf-pizza)" stroke="#C2410C" strokeWidth="3" />
    <path
      d="M60 60 L108 60 A48 48 0 0 1 60 108 Z"
      fill="#EA580C"
      stroke="#C2410C"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <line x1="60" y1="12" x2="60" y2="108" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="12" y1="60" x2="108" y2="60" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="38" cy="40" r="5" fill="#DC2626" />
    <circle cx="80" cy="38" r="4" fill="#DC2626" />
    <circle cx="40" cy="80" r="4" fill="#DC2626" />
    <circle cx="35" cy="62" r="3" fill="#16A34A" />
    <circle cx="62" cy="38" r="3" fill="#16A34A" />
    <circle cx="92" cy="80" r="4" fill="#FCD34D" />
    <circle cx="78" cy="92" r="3" fill="#FCD34D" />
  </svg>
);

const EncaixeFormasThumb = ({ size = 120, className }: ThumbProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="ef-board" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FCD9B6" />
        <stop offset="100%" stopColor="#D6A77A" />
      </linearGradient>
    </defs>
    <circle cx="28" cy="34" r="14" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2.5" />
    <rect
      x="48"
      y="20"
      width="28"
      height="28"
      rx="4"
      fill="#FCD34D"
      stroke="#B45309"
      strokeWidth="2.5"
    />
    <polygon
      points="92,16 104,42 80,42"
      fill="#EC4899"
      stroke="#9D174D"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <rect
      x="6"
      y="62"
      width="108"
      height="44"
      rx="8"
      fill="url(#ef-board)"
      stroke="#92400E"
      strokeWidth="2.5"
    />
    <circle cx="28" cy="84" r="11" fill="#FFF7ED" stroke="#92400E" strokeWidth="2" />
    <rect
      x="48"
      y="72"
      width="24"
      height="24"
      rx="3"
      fill="#FFF7ED"
      stroke="#92400E"
      strokeWidth="2"
    />
    <polygon
      points="92,70 102,94 82,94"
      fill="#FFF7ED"
      stroke="#92400E"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const ResgatePrimeiraLetraThumb = ({ size = 120, className }: ThumbProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="rpl-bubble" cx="0.5" cy="0.5" r="0.55">
        <stop offset="0%" stopColor="#FFF1F2" />
        <stop offset="100%" stopColor="#FBCFE8" />
      </radialGradient>
    </defs>
    <circle cx="60" cy="60" r="46" fill="url(#rpl-bubble)" stroke="#BE185D" strokeWidth="3" />
    <text
      x="60"
      y="78"
      textAnchor="middle"
      fontSize="56"
      fontWeight="900"
      fill="#DB2777"
      fontFamily="Nunito, system-ui, sans-serif"
      stroke="#831843"
      strokeWidth="1.2"
      paintOrder="stroke"
    >
      A
    </text>
    <g fill="#FCD34D" stroke="#B45309" strokeWidth="1.2">
      <path d="M22 22 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3z" />
      <path d="M98 30 l2 4 4 2 -4 2 -2 4 -2 -4 -4 -2 4 -2z" />
      <path d="M96 92 l2.4 5 5 2.4 -5 2.4 -2.4 5 -2.4 -5 -5 -2.4 5 -2.4z" />
    </g>
    <circle cx="28" cy="92" r="3" fill="#A855F7" />
    <circle cx="44" cy="22" r="2.5" fill="#A855F7" />
  </svg>
);

const FallbackThumb = ({ size = 120, className }: ThumbProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    className={className}
    aria-hidden="true"
  >
    <circle cx="60" cy="60" r="48" fill="#EDE9FE" stroke="#6B46C1" strokeWidth="3" />
    <path
      d="M60 30 l8 22 22 0 -18 14 7 22 -19 -14 -19 14 7 -22 -18 -14 22 0z"
      fill="#FCD34D"
      stroke="#92400E"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const THUMBS: Record<string, (props: ThumbProps) => React.ReactElement> = {
  'pega-fracoes': PegaFracoesThumb,
  'encaixe-formas': EncaixeFormasThumb,
  'resgate-primeira-letra': ResgatePrimeiraLetraThumb,
};

export function GameThumb({
  slug,
  size = 120,
  className,
}: {
  slug: string;
  size?: number;
  className?: string;
}) {
  const Thumb = THUMBS[slug] ?? FallbackThumb;
  return <Thumb size={size} className={className} />;
}

export interface GameTheme {
  subtitle: string;
  accent: string;
  gradient: string;
  soft: string;
}

const FALLBACK_THEME: GameTheme = {
  subtitle: 'Toque pra começar a aventura!',
  accent: '#6B46C1',
  gradient: 'linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)',
  soft: '#F5F3FF',
};

const THEMES: Record<string, GameTheme> = {
  'pega-fracoes': {
    subtitle: 'Aprenda frações pegando pizzas!',
    accent: '#EA580C',
    gradient: 'linear-gradient(135deg, #FED7AA 0%, #FB923C 100%)',
    soft: '#FFF7ED',
  },
  'encaixe-formas': {
    subtitle: 'Encaixe cada forma no lugar certo',
    accent: '#1D4ED8',
    gradient: 'linear-gradient(135deg, #BFDBFE 0%, #60A5FA 100%)',
    soft: '#EFF6FF',
  },
  'resgate-primeira-letra': {
    subtitle: 'Descubra a primeira letra da palavra',
    accent: '#BE185D',
    gradient: 'linear-gradient(135deg, #FBCFE8 0%, #F472B6 100%)',
    soft: '#FDF2F8',
  },
};

export function getGameTheme(slug: string): GameTheme {
  return THEMES[slug] ?? FALLBACK_THEME;
}
