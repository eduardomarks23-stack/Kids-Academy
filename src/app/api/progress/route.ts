// =============================================================
// POST /api/progress
// =============================================================
// Grava resultado de um átomo (atom_attempts) e atualiza
// session_progress. Server-side com validação custom de
// child_id ativo na sessão.
// =============================================================

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';

const inputSchema = z.object({
  childId: z.string().uuid(),
  sessionId: z.string().uuid(),
  atomId: z.string().uuid(),
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime(),
  success: z.boolean(),
  difficultyLevel: z.number().int().min(1).max(3),
  result: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(req: Request) {
  const supabase = await createServerSupabaseClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }
  const parsed = inputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'invalid_input', details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const input = parsed.data;

  // Validar que o parent autenticado é dono da criança
  const { data: child } = await supabase
    .from('children')
    .select('id, family_id, families!inner(owner_id)')
    .eq('id', input.childId)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!child || (child as any).families?.owner_id !== auth.user.id) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  const admin = createAdminSupabaseClient();

  // Upsert session_progress
  const { data: progress, error: progressErr } = await admin
    .from('session_progress')
    .upsert(
      {
        child_id: input.childId,
        session_id: input.sessionId,
        started_at: input.startedAt,
      },
      { onConflict: 'child_id,session_id', ignoreDuplicates: false },
    )
    .select()
    .single();

  if (progressErr) {
    return NextResponse.json(
      { error: 'progress_upsert_failed', message: progressErr.message },
      { status: 500 },
    );
  }

  // Insere atom_attempt
  const { error: attemptErr } = await admin.from('atom_attempts').insert({
    child_id: input.childId,
    atom_id: input.atomId,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session_progress_id: (progress as any).id,
    started_at: input.startedAt,
    completed_at: input.completedAt,
    success: input.success,
    difficulty_level: input.difficultyLevel,
    result: (input.result ?? null) as never,
  });

  if (attemptErr) {
    return NextResponse.json(
      { error: 'attempt_insert_failed', message: attemptErr.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
