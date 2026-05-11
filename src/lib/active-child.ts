// =============================================================
// Active child — qual criança está usando o app agora
// =============================================================
// Persistido em cookie HttpOnly (server-only set/read). UI do
// pai ativa o perfil de uma criança antes de passar o tablet.
// Modo criança lê esse cookie para saber whose telemetry write.
//
// Não usar localStorage (LGPD §13: localStorage proibido para
// dados de criança).
// =============================================================

import { cookies } from 'next/headers';
import { createServerSupabaseClient } from '@/lib/supabase/server';

const COOKIE_NAME = 'nka_active_child';
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8h

export async function setActiveChild(childId: string): Promise<void> {
  // Server action context — verifica ownership antes de setar
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('unauthorized');

  const { data: child } = await supabase
    .from('children')
    .select('id, family_id, families!inner(owner_id)')
    .eq('id', childId)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ownerId = (child as any)?.families?.owner_id;
  if (!child || ownerId !== user.id) {
    throw new Error('forbidden');
  }

  const store = await cookies();
  store.set(COOKIE_NAME, childId, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

export async function clearActiveChild(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getActiveChildId(): Promise<string | null> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value ?? null;
}

/** Retorna ID validado contra ownership; lança se não houver criança ativa. */
export async function requireActiveChild(): Promise<string> {
  const id = await getActiveChildId();
  if (!id) throw new Error('no_active_child');

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('unauthorized');

  const { data: child } = await supabase
    .from('children')
    .select('id, family_id, families!inner(owner_id)')
    .eq('id', id)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!child || (child as any)?.families?.owner_id !== user.id) {
    await clearActiveChild();
    throw new Error('invalid_active_child');
  }
  return id;
}
