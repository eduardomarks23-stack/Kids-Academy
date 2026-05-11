// =============================================================
// (child) layout — área da criança, sem navegação parental
// =============================================================
// Bloqueia gestos óbvios que poderiam tirar a criança do app.
// PIN parental para sair (a definir — spec seção 18 item 5).
// =============================================================

import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export default async function ChildLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Mesmo que a criança não autentique, exige que o parent esteja logado
  // e tenha um perfil ativo. Fluxo de "ativar perfil" é responsabilidade
  // do home/dashboard do parent.
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div className="min-h-dvh bg-white text-gray-900">
      {/* TODO: bloqueio de gestos via Capacitor App.addListener('backButton', ...)
              + iOS Guided Access / Android Screen Pinning opcional. */}
      {children}
    </div>
  );
}
