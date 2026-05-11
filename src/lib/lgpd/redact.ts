// =============================================================
// LGPD — redaction utilities
// =============================================================
// SPEC seção 13: logs não persistem PII de criança.
// Chamar redact() em qualquer payload antes de enviar para
// console, Sentry, PostHog, etc.
// =============================================================

const PII_KEYS = new Set([
  'display_name',
  'displayName',
  'email',
  'phone',
  'telefone',
  'cpf',
  'cpf_hash',
  'nome',
  'name',
  'birth_year',
  'birthYear',
  'data_nascimento',
  'ip_address',
  'ipAddress',
  'user_agent',
  'userAgent',
]);

const REDACTED = '[REDACTED]';

export function redact<T>(value: T): T {
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) {
    return value.map((v) => redact(v)) as unknown as T;
  }
  if (typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = PII_KEYS.has(k) ? REDACTED : redact(v);
    }
    return out as T;
  }
  return value;
}
