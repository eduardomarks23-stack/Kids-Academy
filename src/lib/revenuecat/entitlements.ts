// =============================================================
// Entitlements — controle de acesso a recursos pagos
// =============================================================
// Sincronizado via webhook RevenueCat. Lookup feito server-side
// para decidir paywall, limites de uso, etc.
// =============================================================

import { createAdminSupabaseClient } from '@/lib/supabase/admin';
import type { ProductSlug } from './client';

export interface EntitlementCheck {
  active: boolean;
  expiresAt: Date | null;
  productSlug: string | null;
  source: string | null;
}

export async function getActiveEntitlement(
  familyId: string,
): Promise<EntitlementCheck> {
  const admin = createAdminSupabaseClient();
  const now = new Date().toISOString();

  const { data, error } = await admin
    .from('entitlements')
    .select('*')
    .eq('family_id', familyId)
    .eq('active', true)
    .or(`expires_at.is.null,expires_at.gt.${now}`)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) {
    return { active: false, expiresAt: null, productSlug: null, source: null };
  }
  return {
    active: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expiresAt: (data as any).expires_at ? new Date((data as any).expires_at) : null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    productSlug: (data as any).product_slug,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    source: (data as any).source,
  };
}

export interface UpsertEntitlementInput {
  familyId: string;
  productSlug: ProductSlug | string;
  source: string;
  active: boolean;
  expiresAt: Date | null;
  metadata?: Record<string, unknown>;
}

export async function upsertEntitlement(
  input: UpsertEntitlementInput,
): Promise<void> {
  const admin = createAdminSupabaseClient();
  const { error } = await admin.from('entitlements').insert({
    family_id: input.familyId,
    product_slug: input.productSlug,
    source: input.source,
    active: input.active,
    expires_at: input.expiresAt?.toISOString() ?? null,
    metadata: (input.metadata ?? null) as never,
  });
  if (error) throw error;
}

/** Desativa todas as entitlements ativas de uma família (cancelamento/expiração). */
export async function deactivateEntitlements(
  familyId: string,
  productSlug?: string,
): Promise<void> {
  const admin = createAdminSupabaseClient();
  let query = admin
    .from('entitlements')
    .update({ active: false })
    .eq('family_id', familyId)
    .eq('active', true);
  if (productSlug) {
    query = query.eq('product_slug', productSlug);
  }
  const { error } = await query;
  if (error) throw error;
}
