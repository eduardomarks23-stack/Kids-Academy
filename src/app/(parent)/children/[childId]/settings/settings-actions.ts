'use server';

// =============================================================
// Settings actions — server actions seguras
// =============================================================
// Salva settings parentais e hash de PIN (bcrypt) com validação
// de ownership da criança.
// =============================================================

import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';

async function assertChildOwnership(childId: string): Promise<void> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Não autenticado');

  const { data } = await supabase
    .from('children')
    .select('id, family_id, families!inner(owner_id)')
    .eq('id', childId)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!data || (data as any)?.families?.owner_id !== user.id) {
    throw new Error('Acesso negado');
  }
}

export async function saveSettingsAction(formData: FormData): Promise<void> {
  const childId = String(formData.get('childId') ?? '');
  await assertChildOwnership(childId);

  const dailyMinutesLimit = Number(formData.get('dailyMinutesLimit') ?? 30);
  const preferredVoice = String(formData.get('preferredVoice') ?? 'voice_lola');
  const audioEnabled = formData.get('audioEnabled') === 'true';

  const admin = createAdminSupabaseClient();
  const { error } = await admin
    .from('parent_settings')
    .upsert(
      {
        child_id: childId,
        daily_minutes_limit: dailyMinutesLimit,
        preferred_voice: preferredVoice,
        audio_enabled: audioEnabled,
      },
      { onConflict: 'child_id' },
    );

  if (error) throw new Error(`Falha ao salvar: ${error.message}`);
  revalidatePath(`/children/${childId}/settings`);
}

export async function savePinAction(formData: FormData): Promise<void> {
  const childId = String(formData.get('childId') ?? '');
  const pin = String(formData.get('pin') ?? '');
  if (!/^\d{4}$/.test(pin)) throw new Error('PIN inválido');
  await assertChildOwnership(childId);

  const hash = await bcrypt.hash(pin, 10);
  const admin = createAdminSupabaseClient();
  const { error } = await admin
    .from('parent_settings')
    .upsert(
      {
        child_id: childId,
        parental_pin_hash: hash,
        parental_pin_set_at: new Date().toISOString(),
      },
      { onConflict: 'child_id' },
    );
  if (error) throw new Error(`Falha ao salvar PIN: ${error.message}`);
  revalidatePath(`/children/${childId}/settings`);
}
