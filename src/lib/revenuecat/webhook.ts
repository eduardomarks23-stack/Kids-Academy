// =============================================================
// RevenueCat webhook — handler shared between route handler
// and edge function. SPEC seção 13: webhook valida assinatura.
// =============================================================
// Eventos relevantes (https://www.revenuecat.com/docs/webhooks):
//   INITIAL_PURCHASE, RENEWAL, CANCELLATION, EXPIRATION,
//   PRODUCT_CHANGE, NON_RENEWING_PURCHASE, BILLING_ISSUE,
//   SUBSCRIBER_ALIAS, TRANSFER
// =============================================================

import {
  upsertEntitlement,
  deactivateEntitlements,
} from './entitlements';
import { getRevenueCatWebhookSecret } from './client';

export type RevenueCatEventType =
  | 'INITIAL_PURCHASE'
  | 'RENEWAL'
  | 'CANCELLATION'
  | 'EXPIRATION'
  | 'PRODUCT_CHANGE'
  | 'NON_RENEWING_PURCHASE'
  | 'BILLING_ISSUE'
  | 'SUBSCRIBER_ALIAS'
  | 'TRANSFER'
  | 'UNCANCELLATION'
  | 'TEST';

export interface RevenueCatEvent {
  api_version: string;
  event: {
    type: RevenueCatEventType;
    id: string;
    app_user_id: string; // mapeado para family_id no app
    product_id: string;
    period_type: 'NORMAL' | 'TRIAL' | 'INTRO';
    purchased_at_ms: number;
    expiration_at_ms: number | null;
    environment: 'SANDBOX' | 'PRODUCTION';
    entitlement_ids?: string[];
    entitlement_id?: string;
    [key: string]: unknown;
  };
}

/** Valida o header Authorization configurado no RevenueCat dashboard. */
export function verifyWebhookAuth(headerValue: string | null): boolean {
  if (!headerValue) return false;
  const expected = getRevenueCatWebhookSecret();
  // Comparação simples: RevenueCat envia o header completo configurado.
  // Para constant-time comparison, usar crypto.timingSafeEqual em produção.
  return headerValue === expected;
}

/**
 * app_user_id no RevenueCat = families.id (configurar no SDK
 * client antes de purchase: Purchases.logIn(familyId)).
 */
export async function handleRevenueCatEvent(
  payload: RevenueCatEvent,
): Promise<void> {
  const ev = payload.event;
  const familyId = ev.app_user_id;
  const productSlug = ev.product_id;
  const expiresAt = ev.expiration_at_ms ? new Date(ev.expiration_at_ms) : null;

  switch (ev.type) {
    case 'INITIAL_PURCHASE':
    case 'RENEWAL':
    case 'UNCANCELLATION':
    case 'PRODUCT_CHANGE':
    case 'NON_RENEWING_PURCHASE': {
      await upsertEntitlement({
        familyId,
        productSlug,
        source: 'revenuecat',
        active: true,
        expiresAt,
        metadata: ev,
      });
      return;
    }
    case 'CANCELLATION':
    case 'EXPIRATION':
    case 'BILLING_ISSUE': {
      await deactivateEntitlements(familyId, productSlug);
      return;
    }
    case 'SUBSCRIBER_ALIAS':
    case 'TRANSFER':
    case 'TEST': {
      // No-op: registrar apenas (audit já é feito pelo route handler)
      return;
    }
    default:
      // Evento desconhecido — registrar no log do route handler
      return;
  }
}
