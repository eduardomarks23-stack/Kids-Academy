// =============================================================
// POST /api/lgpd/export
// =============================================================
// Retorna JSON com todos os dados de uma criança. Apenas o
// owner da família pode solicitar. SPEC seção 13.
// =============================================================

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { exportChildData } from '@/lib/lgpd/export';

const inputSchema = z.object({
  childId: z.string().uuid(),
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
    const payload = await exportChildData({
      childId: parsed.data.childId,
      requestedBy: auth.user.id,
    });
    return NextResponse.json(payload, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': `attachment; filename="nexus-kids-export-${parsed.data.childId}.json"`,
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'erro desconhecido';
    return NextResponse.json({ error: msg }, { status: 403 });
  }
}
