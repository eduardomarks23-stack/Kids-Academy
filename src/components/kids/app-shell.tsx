'use client';

import { usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { BottomNav } from './bottom-nav';

const FULLSCREEN_PREFIXES = ['/jogo/', '/aula/', '/quiz/'];

/**
 * Wrapper client-side da área (app). Aplica padding-bottom para BottomNav
 * em rotas com scroll, e modo fullscreen (sem padding/nav) em rotas de jogo.
 *
 * GUARDRAILS §3: a área da criança nunca deve renderizar dark mode. Removemos
 * a classe `.dark` do <html> caso algum componente shadcn ou preferência do
 * sistema operacional a tenha ativado.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const fullscreen = FULLSCREEN_PREFIXES.some((p) => pathname.startsWith(p));

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  if (fullscreen) {
    return <div className="flex flex-col flex-1 bg-white">{children}</div>;
  }

  return (
    <div className="flex flex-col flex-1 bg-white">
      <main className="flex-1 pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
