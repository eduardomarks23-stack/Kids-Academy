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
  { id: 'trophy', label: 'Conquistas', href: '/conquistas', Icon: KidsIcon.Trophy },
  { id: 'rank', label: 'Ranking', href: '/ranking', Icon: KidsIcon.Rank },
  { id: 'shop', label: 'Loja', href: '/loja', Icon: KidsIcon.Shop },
  { id: 'parent', label: 'Pais', href: '/pais/dashboard', Icon: KidsIcon.Parent },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-gray-100">
      <div className="max-w-2xl mx-auto grid grid-cols-5">
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
