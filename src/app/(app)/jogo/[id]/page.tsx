import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getPerfilAtivoId } from '@/lib/perfil-ativo';
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

  const perfilCriancaId = await getPerfilAtivoId(supabase, user.id);
  if (!perfilCriancaId) redirect('/onboarding');

  return <JogoClient slug={id} perfilCriancaId={perfilCriancaId} />;
}
