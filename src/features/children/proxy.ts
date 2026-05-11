// =============================================================
// features/children/proxy.ts
// =============================================================
// CRUD de perfis de criança + lookup ativo. Consumido pelo
// painel do pai e pelo store active-child.
// =============================================================

import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import type { Child, HandPreference } from '@/types/domain';

interface ChildRow {
  id: string;
  family_id: string;
  display_name: string;
  birth_year: number;
  avatar_seed: string | null;
  active_world_id: string | null;
  preferred_voice: string | null;
  hand_preference: string | null;
  onboarding_completed_at: string | null;
}

function mapChild(row: ChildRow): Child {
  return {
    id: row.id,
    familyId: row.family_id,
    displayName: row.display_name,
    birthYear: row.birth_year,
    avatarSeed: row.avatar_seed,
    activeWorldId: row.active_world_id,
    preferredVoice: row.preferred_voice,
    handPreference: (row.hand_preference as HandPreference) ?? null,
    onboardingCompletedAt: row.onboarding_completed_at
      ? new Date(row.onboarding_completed_at)
      : null,
  };
}

export interface CreateChildInput {
  familyId: string;
  displayName: string;
  birthYear: number;
  avatarSeed?: string | null;
  activeWorldId?: string | null;
  preferredVoice?: string | null;
  handPreference?: HandPreference;
}

export async function listChildren(familyId: string): Promise<Child[]> {
  const supabase = createBrowserSupabaseClient();
  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('family_id', familyId)
    .is('deleted_at', null)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []).map((r) => mapChild(r as unknown as ChildRow));
}

export async function createChild(input: CreateChildInput): Promise<Child> {
  const supabase = createBrowserSupabaseClient();
  const { data, error } = await supabase
    .from('children')
    .insert({
      family_id: input.familyId,
      display_name: input.displayName,
      birth_year: input.birthYear,
      avatar_seed: input.avatarSeed ?? null,
      active_world_id: input.activeWorldId ?? null,
      preferred_voice: input.preferredVoice ?? null,
      hand_preference: input.handPreference ?? null,
    })
    .select()
    .single();
  if (error || !data) throw error ?? new Error('insert returned no row');
  return mapChild(data as unknown as ChildRow);
}

export async function updateChild(
  id: string,
  patch: Partial<CreateChildInput>,
): Promise<Child> {
  const supabase = createBrowserSupabaseClient();
  const { data, error } = await supabase
    .from('children')
    .update({
      display_name: patch.displayName,
      birth_year: patch.birthYear,
      avatar_seed: patch.avatarSeed,
      active_world_id: patch.activeWorldId,
      preferred_voice: patch.preferredVoice,
      hand_preference: patch.handPreference,
    })
    .eq('id', id)
    .select()
    .single();
  if (error || !data) throw error ?? new Error('update returned no row');
  return mapChild(data as unknown as ChildRow);
}
