'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { KidsIcon } from './icons';

interface BottomNavItem {
  id: string;
  label: string;
  href: string;
  Icon: (props: { size?: number; className?: string }) => React.ReactElement;
}

const ITEMS: BottomNavItem[] = [
  { id: 'home', label: 'Início', href: '/home', Icon: KidsIcon.Home },
  { id: 'arena', label: 'Arena', href: '/arena', Icon: KidsIcon.Bolt },
  { id: 'perfil', label: 'Perfil', href: '/perfil', Icon: KidsIcon.User },
];

/**
 * Rotas onde a BottomNav fica oculta (precisam viewport completo).
 */
const HIDE_ON_PREFIXES = ['/jogo/', '/aula/', '/quiz/'];

export function BottomNav() {
  const pathname = usePathname();
  if (HIDE_ON_PREFIXES.some((p) => pathname.startsWith(p))) return null;
  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-gray-100">
      <div className="max-w-2xl mx-auto grid grid-cols-3">
        {ITEMS.map((item) => {
          const Icon = item.Icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.id}
              href={item.href}
              className="py-2.5 flex flex-col items-center gap-1"
            >
              <Icon size={22} className={active ? 'text-purple-700' : 'text-gray-400'} />
              <span
                className={`text-[11px] font-bold ${active ? 'text-purple-700' : 'text-gray-400'}`}
              >
                {item.label}
              </span>
              <span
                className="block w-6 h-1 rounded-full"
                style={{ background: active ? '#6B46C1' : 'transparent' }}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
