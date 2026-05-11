'use server';

// =============================================================
// Server actions de children — usadas pelos forms do painel
// =============================================================

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { setActiveChild, clearActiveChild } from '@/lib/active-child';
import { POLICY_VERSION } from '@/lib/lgpd/consent';

const createChildSchema = z.object({
  displayName: z.string().min(1).max(40),
  birthYear: z.coerce.number().int().min(2010).max(2030),
  handPreference: z.enum(['left', 'right']).optional().nullable(),
  consentBasic: z.literal('on').or(z.literal('true')).or(z.boolean()),
  consentImprovement: z
    .literal('on')
    .or(z.literal('true'))
    .or(z.boolean())
    .optional(),
  consentCommunications: z
    .literal('on')
    .or(z.literal('true'))
    .or(z.boolean())
    .optional(),
});

export async function createChildAction(
  _prevState: unknown,
  formData: FormData,
): Promise<{ error?: string; ok?: boolean }> {
  const parsed = createChildSchema.safeParse({
    displayName: formData.get('displayName'),
    birthYear: formData.get('birthYear'),
    handPreference: formData.get('handPreference') || undefined,
    consentBasic: formData.get('consentBasic'),
    consentImprovement: formData.get('consentImprovement') || undefined,
    consentCommunications: formData.get('consentCommunications') || undefined,
  });

  if (!parsed.success) {
    return { error: 'Dados inválidos. Verifique os campos.' };
  }
  const input = parsed.data;
  if (!input.consentBasic) {
    return {
      error:
        'O consentimento para uso básico é obrigatório para criar o perfil.',
    };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'unauthorized' };

  // Resolve ou cria família do owner
  const { data: family } = await supabase
    .from('families')
    .select('id')
    .eq('owner_id', user.id)
    .maybeSingle();

  let familyId = family?.id as string | undefined;
  if (!familyId) {
    const { data: created, error } = await supabase
      .from('families')
      .insert({ owner_id: user.id })
      .select('id')
      .single();
    if (error || !created) {
      return { error: 'Não foi possível criar a família.' };
    }
    familyId = created.id as string;
  }

  // Cria criança
  const { data: created, error: childErr } = await supabase
    .from('children')
    .insert({
      family_id: familyId,
      display_name: input.displayName,
      birth_year: input.birthYear,
      hand_preference: input.handPreference ?? null,
    })
    .select('id')
    .single();
  if (childErr || !created) {
    return {
      error: childErr?.message ?? 'Não foi possível criar a criança.',
    };
  }
  const childId = created.id as string;

  // Registra consentimento LGPD
  const scope = {
    basic_usage: true,
    product_improvement: Boolean(input.consentImprovement),
    communications: Boolean(input.consentCommunications),
  };
  const { error: consentErr } = await supabase.from('consents').insert({
    child_id: childId,
    granted_by: user.id,
    scope: scope as never,
    policy_version: POLICY_VERSION,
  });
  if (consentErr) {
    return {
      error: `Criança criada mas consentimento falhou: ${consentErr.message}`,
    };
  }

  revalidatePath('/children');
  redirect(`/children/${childId}`);
}

export async function activateChildAction(formData: FormData): Promise<void> {
  const childId = String(formData.get('childId') ?? '');
  if (!childId) return;
  await setActiveChild(childId);
  redirect('/inicio');
}

export async function deactivateChildAction(): Promise<void> {
  await clearActiveChild();
  redirect('/children');
}
