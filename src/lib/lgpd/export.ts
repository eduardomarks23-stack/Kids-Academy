// =============================================================
// LGPD — data export (Art. 18)
// =============================================================
// Retorna JSON com tudo sobre uma criança: perfil, consentimentos,
// progresso, attempts, audit. Apenas o owner da família pode
// solicitar.
// =============================================================

import { createAdminSupabaseClient } from '@/lib/supabase/admin';

export interface ExportRequest {
  childId: string;
  requestedBy: string;
}

export interface ChildExport {
  exportedAt: string;
  policyVersion: string;
  child: unknown;
  consents: unknown[];
  sessionProgress: unknown[];
  atomAttempts: unknown[];
  repetitionQueue: unknown[];
  auditTrail: unknown[];
}

export async function exportChildData(
  req: ExportRequest,
): Promise<ChildExport> {
  const admin = createAdminSupabaseClient();

  // Ownership check
  const { data: child, error: childErr } = await admin
    .from('children')
    .select('*, families!inner(owner_id)')
    .eq('id', req.childId)
    .single();

  if (childErr || !child) {
    throw new Error(`Criança não encontrada: ${req.childId}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((child as any).families?.owner_id !== req.requestedBy) {
    throw new Error('Acesso negado');
  }

  const [consents, progress, attempts, queue, audit] = await Promise.all([
    admin.from('consents').select('*').eq('child_id', req.childId),
    admin.from('session_progress').select('*').eq('child_id', req.childId),
    admin.from('atom_attempts').select('*').eq('child_id', req.childId),
    admin.from('repetition_queue').select('*').eq('child_id', req.childId),
    admin
      .from('audit_log')
      .select('*')
      .eq('child_id', req.childId)
      .order('occurred_at', { ascending: false }),
  ]);

  // Audit do próprio export
  await admin.from('audit_log').insert({
    actor_id: req.requestedBy,
    child_id: req.childId,
    action: 'export',
    entity_table: 'children',
    entity_id: req.childId,
    diff: null,
  });

  return {
    exportedAt: new Date().toISOString(),
    policyVersion: '1.0',
    child,
    consents: consents.data ?? [],
    sessionProgress: progress.data ?? [],
    atomAttempts: attempts.data ?? [],
    repetitionQueue: queue.data ?? [],
    auditTrail: audit.data ?? [],
  };
}
