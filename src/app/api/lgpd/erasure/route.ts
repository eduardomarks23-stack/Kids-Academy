// =============================================================
// POST /api/lgpd/erasure
// =============================================================
// Soft delete imediato + agendamento de hard delete em 30 dias.
// SPEC seção 13. Apenas owner da família pode acionar.
// =============================================================

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { softDeleteChild } from '@/lib/lgpd/erasure';

const inputSchema = z.object({
  childId: z.string().uuid(),
  reason: z.string().max(500).optional(),
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

  try {
    const receipt = await softDeleteChild({
      childId: parsed.data.childId,
      requestedBy: auth.user.id,
      reason: parsed.data.reason,
    });
    return NextResponse.json(receipt);
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'erro desconhecido';
    return NextResponse.json({ error: msg }, { status: 403 });
  }
}
