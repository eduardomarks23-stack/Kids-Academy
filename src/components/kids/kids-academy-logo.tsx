type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

interface KidsAcademyLogoProps {
  size?: LogoSize;
  className?: string;
}

const SIZES: Record<LogoSize, string> = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-4xl',
  xl: 'text-5xl',
};

export function KidsAcademyLogo({ size = 'lg', className = '' }: KidsAcademyLogoProps) {
  return (
    <div className={`font-extrabold tracking-tight ${SIZES[size]} ${className}`}>
      <span style={{ color: '#6B46C1' }}>Kids</span>
      <span style={{ color: '#FCD34D' }}>Academy</span>
    </div>
  );
}
