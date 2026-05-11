// =============================================================
// POST /api/revenuecat/webhook
// =============================================================
// RevenueCat envia eventos de assinatura. Validamos o header
// Authorization (configurado no dashboard) e sincronizamos a
// tabela entitlements. SPEC seção 13.
// =============================================================

import { NextResponse } from 'next/server';
import {
  verifyWebhookAuth,
  handleRevenueCatEvent,
  type RevenueCatEvent,
} from '@/lib/revenuecat/webhook';

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!verifyWebhookAuth(authHeader)) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  let payload: RevenueCatEvent;
  try {
    payload = (await req.json()) as RevenueCatEvent;
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  try {
    await handleRevenueCatEvent(payload);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(
      '[revenuecat] webhook handling failed',
      e instanceof Error ? e.message : e,
    );
    // 5xx para RevenueCat tentar novamente.
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
