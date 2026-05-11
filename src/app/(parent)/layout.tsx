// =============================================================
// (parent) layout — área do responsável, autenticado
// =============================================================
// proxy.ts já garante autenticação. Aqui só renderizamos shell.
// =============================================================

import type { ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export default async function ParentLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div className="min-h-dvh bg-white text-gray-900">
      <header className="border-b border-gray-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-medium">Nexus Kids Academy</h1>
          <nav className="flex gap-6 text-sm">
            <Link href="/dashboard" className="text-gray-700 hover:text-purple-700">
              Dashboard
            </Link>
            <Link href="/children" className="text-gray-700 hover:text-purple-700">
              Filhos
            </Link>
            <Link href="/billing" className="text-gray-700 hover:text-purple-700">
              Assinatura
            </Link>
            <Link href="/settings" className="text-gray-700 hover:text-purple-700">
              Configurações
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
