/**
 * Icon set inline SVG do protótipo Kids Academy.
 * Mantido separado de lucide-react para preservar identidade visual original.
 */

interface IconProps {
  size?: number;
  fill?: string;
  className?: string;
}

const baseProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const KidsIcon = {
  Bell: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10 21a2 2 0 0 0 4 0" />
    </svg>
  ),
  Home: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </svg>
  ),
  Trophy: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M17 6h3v2a3 3 0 0 1-3 3M7 6H4v2a3 3 0 0 0 3 3" />
    </svg>
  ),
  Rank: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...baseProps}>
      <rect x="4" y="13" width="4" height="8" rx="1" />
      <rect x="10" y="8" width="4" height="13" rx="1" />
      <rect x="16" y="4" width="4" height="17" rx="1" />
    </svg>
  ),
  Shop: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M3 7h18l-2 12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L3 7z" />
      <path d="M8 7V5a4 4 0 0 1 8 0v2" />
    </svg>
  ),
  Parent: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...baseProps}>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M15 21v-1.5a3.5 3.5 0 0 1 3.5-3.5h.5a2.5 2.5 0 0 1 2.5 2.5V21" />
    </svg>
  ),
  ArrowLeft: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...baseProps} strokeWidth={2.4}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  ),
  Lock: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...baseProps}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  ),
  Star: ({ size = 24, fill = 'currentColor', className }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill={fill}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M12 3l2.9 6 6.6.9-4.8 4.6 1.2 6.6L12 18.1 6.1 21.1l1.2-6.6L2.5 9.9 9.1 9z" />
    </svg>
  ),
  Check: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...baseProps} strokeWidth={3}>
      <path d="M5 12l5 5L20 7" />
    </svg>
  ),
  Play: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M7 5l12 7-12 7z" />
    </svg>
  ),
  Pause: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  ),
  Book: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M4 4h7a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H4z" />
      <path d="M20 4h-7a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Calc: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...baseProps}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <rect x="8" y="6" width="8" height="3" rx="0.5" />
      <circle cx="9" cy="13" r="0.5" fill="currentColor" />
      <circle cx="12" cy="13" r="0.5" fill="currentColor" />
      <circle cx="15" cy="13" r="0.5" fill="currentColor" />
      <circle cx="9" cy="17" r="0.5" fill="currentColor" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
      <circle cx="15" cy="17" r="0.5" fill="currentColor" />
    </svg>
  ),
  Lupa: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...baseProps}>
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l5 5" />
    </svg>
  ),
  Scroll: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M5 5h11a3 3 0 0 1 3 3v9a2 2 0 0 0 2 2H8a3 3 0 0 1-3-3z" />
      <path d="M9 9h6M9 13h6" />
    </svg>
  ),
  Globe: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...baseProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
  Speak: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M8 10h8M8 13h5" />
    </svg>
  ),
  Clock: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...baseProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  Bolt: ({ size = 24, fill = 'currentColor', className }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill={fill}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
    </svg>
  ),
  Sparkle: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
    </svg>
  ),
  User: ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...baseProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
    </svg>
  ),
};
