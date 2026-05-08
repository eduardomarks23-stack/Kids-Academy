import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import JogoClient from './jogo-client';

interface JogoPageProps {
  params: Promise<{ id: string }>;
}

export default async function JogoPage({ params }: JogoPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: perfis } = await supabase
    .from('perfis_crianca')
    .select('id')
    .eq('responsavel_id', user.id)
    .eq('ativo', true)
    .limit(1);

  const perfilCriancaId = perfis?.[0]?.id;
  if (!perfilCriancaId) redirect('/onboarding');

  return <JogoClient slug={id} perfilCriancaId={String(perfilCriancaId)} />;
}
