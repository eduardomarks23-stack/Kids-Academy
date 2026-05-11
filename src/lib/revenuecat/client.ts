// =============================================================
// RevenueCat — client config
// =============================================================
// SDK web (browser) e Capacitor (mobile) usam o mesmo public
// SDK key. Operações server-side (webhook validation, REST API)
// usam REVENUECAT_SECRET_KEY.
// =============================================================

export const REVENUECAT_PUBLIC_SDK_KEY =
  process.env.NEXT_PUBLIC_REVENUECAT_SDK_KEY ?? '';

export function getRevenueCatSecret(): string {
  const key = process.env.REVENUECAT_SECRET_KEY;
  if (!key) throw new Error('REVENUECAT_SECRET_KEY ausente');
  return key;
}

export function getRevenueCatWebhookSecret(): string {
  const key = process.env.REVENUECAT_WEBHOOK_AUTH_HEADER;
  if (!key) {
    throw new Error(
      'REVENUECAT_WEBHOOK_AUTH_HEADER ausente. Configurar token estático em RevenueCat dashboard.',
    );
  }
  return key;
}

/** Produtos canônicos do Nexus Kids Academy. */
export const PRODUCT_SLUGS = {
  monthly: 'kids-monthly',
  annual: 'kids-annual',
  driveFounderGrant: 'kids-drive-founder',
} as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[keyof typeof PRODUCT_SLUGS];
