// =============================================================
// Supabase Edge Function: hard-delete-children
// =============================================================
// SPEC §13: depois de 30 dias do soft delete, apaga
// definitivamente os dados da criança (CASCADE remove progresso,
// attempts, consents, etc.).
//
// Configurar cron diário no Supabase dashboard:
//   `0 3 * * *` (3h da manhã UTC)
// Apontando para esta função.
//
// Authorization: requer x-cron-secret header com SUPABASE_CRON_SECRET.
// =============================================================

// @ts-expect-error: edge runtime — Deno globals só existem em runtime
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// @ts-expect-error: Deno global
declare const Deno: {
  env: { get: (k: string) => string | undefined };
  serve: (handler: (req: Request) => Promise<Response>) => void;
};

const ERASURE_GRACE_PERIOD_DAYS = 30;

Deno.serve(async (req: Request) => {
  // Auth: cron secret
  const secret = Deno.env.get('SUPABASE_CRON_SECRET');
  if (!secret || req.headers.get('x-cron-secret') !== secret) {
    return new Response(JSON.stringify({ error: 'forbidden' }), {
      status: 403,
      headers: { 'content-type': 'application/json' },
    });
  }

  const url = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !serviceKey) {
    return new Response(JSON.stringify({ error: 'misconfigured' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }

  const admin = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const cutoff = new Date(
    Date.now() - ERASURE_GRACE_PERIOD_DAYS * 24 * 60 * 60 * 1000,
  ).toISOString();

  // Encontra crianças com soft delete > 30 dias atrás
  const { data: dueChildren, error: queryErr } = await admin
    .from('children')
    .select('id')
    .not('deleted_at', 'is', null)
    .lt('deleted_at', cutoff);

  if (queryErr) {
    return new Response(
      JSON.stringify({ error: queryErr.message }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    );
  }

  const deleted: string[] = [];
  const failed: { id: string; error: string }[] = [];

  for (const child of dueChildren ?? []) {
    const { error: delErr } = await admin
      .from('children')
      .delete()
      .eq('id', child.id);
    if (delErr) {
      failed.push({ id: child.id, error: delErr.message });
      continue;
    }
    await admin.from('audit_log').insert({
      actor_id: null,
      child_id: child.id,
      action: 'erasure_executed',
      entity_table: 'children',
      entity_id: child.id,
      diff: null,
    });
    deleted.push(child.id);
  }

  return new Response(
    JSON.stringify({
      processed: dueChildren?.length ?? 0,
      deleted: deleted.length,
      failed,
    }),
    { headers: { 'content-type': 'application/json' } },
  );
});
