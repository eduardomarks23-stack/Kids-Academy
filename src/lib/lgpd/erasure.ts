// =============================================================
// LGPD — erasure flow (Art. 18)
// =============================================================
// Soft delete imediato + agendamento de hard delete em 30 dias.
// O hard delete propriamente dito é uma cron job (a configurar
// no Supabase Edge Functions ou GitHub Actions agendado).
//
// IMPORTANTE: a recuperação reversa ANTES dos 30 dias é
// possível setando deleted_at = null (cliente do parent).
// =============================================================

import { createAdminSupabaseClient } from '@/lib/supabase/admin';

export const ERASURE_GRACE_PERIOD_DAYS = 30;

export interface ErasureRequest {
  childId: string;
  requestedBy: string; // auth.users.id do parent
  reason?: string;
}

export interface ErasureReceipt {
  childId: string;
  softDeletedAt: string; // ISO
  hardDeleteScheduledFor: string; // ISO
}

/**
 * Marca uma criança como deletada (soft) e agenda hard delete.
 * Verifica que requestedBy é owner da família da criança.
 */
export async function softDeleteChild(
  req: ErasureRequest,
): Promise<ErasureReceipt> {
  const admin = createAdminSupabaseClient();

  // Verificação manual de ownership (service role bypassa RLS)
  const { data: child, error: childErr } = await admin
    .from('children')
    .select('id, family_id, families!inner(owner_id)')
    .eq('id', req.childId)
    .single();

  if (childErr || !child) {
    throw new Error(`Criança não encontrada: ${req.childId}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ownerId = (child as any).families?.owner_id;
  if (ownerId !== req.requestedBy) {
    throw new Error(
      'Acesso negado: requester não é owner da família da criança',
    );
  }

  const now = new Date();
  const hardDeleteAt = new Date(
    now.getTime() + ERASURE_GRACE_PERIOD_DAYS * 24 * 60 * 60 * 1000,
  );

  const { error: updErr } = await admin
    .from('children')
    .update({ deleted_at: now.toISOString() })
    .eq('id', req.childId);

  if (updErr) throw updErr;

  // Audit explícito: além do trigger, registra a ação de erasure
  await admin.from('audit_log').insert({
    actor_id: req.requestedBy,
    child_id: req.childId,
    action: 'erasure_requested',
    entity_table: 'children',
    entity_id: req.childId,
    diff: { reason: req.reason ?? null, hard_delete_at: hardDeleteAt.toISOString() },
  });

  return {
    childId: req.childId,
    softDeletedAt: now.toISOString(),
    hardDeleteScheduledFor: hardDeleteAt.toISOString(),
  };
}

/**
 * Hard delete (executado pela cron job após 30 dias).
 * CASCADE remove session_progress, atom_attempts, consents, etc.
 */
export async function hardDeleteChild(childId: string): Promise<void> {
  const admin = createAdminSupabaseClient();
  const { error } = await admin.from('children').delete().eq('id', childId);
  if (error) throw error;

  await admin.from('audit_log').insert({
    actor_id: null,
    child_id: childId,
    action: 'erasure_executed',
    entity_table: 'children',
    entity_id: childId,
    diff: null,
  });
}
