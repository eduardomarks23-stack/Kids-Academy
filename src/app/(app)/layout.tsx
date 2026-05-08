import { redirect } from 'next/navigation';
import { type ReactNode } from 'react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { BottomNav } from '@/components/kids/bottom-nav';

/**
 * Layout da área da criança (rotas /(app)/*).
 *
 * Garante:
 *   1. Usuário autenticado (já validado por proxy.ts)
 *   2. Existe pelo menos um perfil de criança ativo para o responsável
 *
 * Sem perfil de criança → redireciona para /onboarding.
 */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: perfis } = await supabase
    .from('perfis_crianca')
    .select('id')
    .eq('responsavel_id', user.id)
    .eq('ativo', true)
    .limit(1);

  if (!perfis || perfis.length === 0) {
    redirect('/onboarding');
  }

  return (
    <div className="flex flex-col flex-1 bg-white">
      <main className="flex-1 pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
