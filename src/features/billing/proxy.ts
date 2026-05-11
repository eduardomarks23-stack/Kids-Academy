// =============================================================
// features/billing/proxy.ts
// =============================================================
// Browser-side: status atual da assinatura. Compras só via SDK
// nativo do RevenueCat (Capacitor) ou web (Stripe via RC).
//
// Server-side de upsert/deactivate vive em src/lib/revenuecat/.
// =============================================================

import { createBrowserSupabaseClient } from '@/lib/supabase/client';

export interface BillingStatus {
  active: boolean;
  productSlug: string | null;
  expiresAt: Date | null;
  source: string | null;
}

export async function fetchBillingStatus(
  familyId: string,
): Promise<BillingStatus> {
  const supabase = createBrowserSupabaseClient();
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from('entitlements')
    .select('product_slug, expires_at, source')
    .eq('family_id', familyId)
    .eq('active', true)
    .or(`expires_at.is.null,expires_at.gt.${nowIso}`)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  if (!data) {
    return { active: false, productSlug: null, expiresAt: null, source: null };
  }
  return {
    active: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    productSlug: (data as any).product_slug,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expiresAt: (data as any).expires_at ? new Date((data as any).expires_at) : null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    source: (data as any).source,
  };
}
