/**
 * Configuração de internacionalização (next-intl).
 *
 * Status atual: pt-BR único locale ativo. EN/ES preparados (placeholders
 * em public/locales/) para mercados futuros.
 */

export const LOCALES = ['pt-BR', 'en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'pt-BR';
