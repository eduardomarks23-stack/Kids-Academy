// =============================================================
// /session/[sessionId] — session player
// =============================================================
// Renderiza o SessionPlayer client component que monta os
// átomos via Game Adapter. Server component carrega session+atoms
// e injeta como prop inicial.
// =============================================================

import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getActiveChildId } from '@/lib/active-child';
import { SessionRunner } from './session-runner';

interface PageProps {
  params: Promise<{ sessionId: string }>;
}

export default async function SessionPage({ params }: PageProps) {
  const { sessionId } = await params;
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const childId = await getActiveChildId();
  if (!childId) redirect('/children');

  // Validar ownership do childId no cookie
  const { data: child } = await supabase
    .from('children')
    .select('id, family_id, families!inner(owner_id)')
    .eq('id', childId)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!child || (child as any)?.families?.owner_id !== user.id) {
    redirect('/children');
  }

  return <SessionRunner sessionId={sessionId} childId={childId} />;
}
