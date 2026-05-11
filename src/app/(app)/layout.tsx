import { redirect } from 'next/navigation';
import { type ReactNode } from 'react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { AppShell } from '@/components/kids/app-shell';
import { getPerfilAtivoId } from '@/lib/perfil-ativo';

/**
 * Layout da área da criança (rotas /(app)/*).
 *
 * Garante:
 *   1. Usuário autenticado (já validado por proxy.ts)
 *   2. Existe um perfil de criança ativo selecionado (cookie ou fallback)
 *
 * Sem nenhum perfil ativo → redireciona para /onboarding.
 */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const perfilAtivoId = await getPerfilAtivoId(supabase, user.id);

  if (!perfilAtivoId) {
    redirect('/onboarding');
  }

  return <AppShell>{children}</AppShell>;
}
