import type { ReactNode } from 'react';

interface SpeechBubbleProps {
  children: ReactNode;
  side?: 'left' | 'right';
  className?: string;
}

export function SpeechBubble({ children, side = 'right', className = '' }: SpeechBubbleProps) {
  return (
    <div
      className={`relative bg-white border-2 border-purple-200 rounded-3xl px-5 py-4 shadow-[0_8px_24px_-12px_rgba(107,70,193,0.25)] ${className}`}
    >
      {children}
      {side === 'left' && (
        <span className="absolute -left-3 top-8 w-0 h-0 border-y-[10px] border-y-transparent border-r-[14px] border-r-white" />
      )}
      {side === 'right' && (
        <span className="absolute -right-3 top-8 w-0 h-0 border-y-[10px] border-y-transparent border-l-[14px] border-l-white" />
      )}
    </div>
  );
}
