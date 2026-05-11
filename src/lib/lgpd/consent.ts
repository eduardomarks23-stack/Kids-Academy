// =============================================================
// LGPD — gerenciamento de consentimento
// =============================================================
// Spec seções 13 e 18. Versão atual da política é constante;
// quando atualizar a política, incrementar POLICY_VERSION e
// solicitar novo consentimento (UI deve detectar mismatch).
// =============================================================

import type { ConsentScope } from '@/types/domain';

export const POLICY_VERSION = '1.0'; // bump a cada revisão jurídica

export const DEFAULT_CONSENT_SCOPE: ConsentScope = {
  basic_usage: true, // obrigatório
  product_improvement: false,
  communications: false,
};

export interface GrantConsentInput {
  childId: string;
  grantedBy: string;
  scope: ConsentScope;
  ipAddress?: string | null;
  userAgent?: string | null;
}

/** Valida que o consentimento mínimo (basic_usage) está marcado. */
export function isValidScope(scope: ConsentScope): boolean {
  return scope.basic_usage === true;
}

/** Detecta se um registro de consentimento está obsoleto vs. versão atual. */
export function isConsentStale(
  consentPolicyVersion: string,
  currentVersion: string = POLICY_VERSION,
): boolean {
  return consentPolicyVersion !== currentVersion;
}
