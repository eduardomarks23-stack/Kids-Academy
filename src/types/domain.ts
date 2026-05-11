// =============================================================
// Tipos de domínio — Nexus Kids Academy (spec v1)
// =============================================================
// SPEC seção 8. Tipos canônicos que atravessam features e
// engines. Tipos do Supabase ficam em src/types/database.types.ts
// (gerados por `supabase gen types`).
// =============================================================

export type AtomType =
  // Mundo dos Exploradores (5-6 anos) e Inventores (7-8 anos)
  | 'presentation'
  | 'recognition'
  | 'discrimination'
  | 'guided_production'
  | 'free_production'
  | 'application'
  // Mundo dos Curiosos (3-4 anos) — 4 tiers simplificados
  | 'listen'
  | 'imitate'
  | 'play'
  | 'celebrate';

export type GameEngine = 'phaser' | 'video' | 'audio' | 'native_html';

export type HandPreference = 'left' | 'right' | null;

// -------------------------------------------------------------
// AtomConfig — discriminated union por engine
// -------------------------------------------------------------

export interface PhaserAtomConfig {
  scene: string; // nome da cena registrada no scene registry
  assets: Array<{
    key: string;
    url: string;
    type: 'image' | 'audio' | 'spritesheet' | 'json';
    // para spritesheet
    frameConfig?: { frameWidth: number; frameHeight: number };
  }>;
  params: Record<string, unknown>;
}

export interface VideoAtomConfig {
  streamId: string; // Cloudflare Stream UID
  poster?: string;
  captions?: string; // URL VTT
}

export interface AudioAtomConfig {
  url: string;
  transcript?: string;
}

export interface NativeHtmlAtomConfig {
  componentKey: string; // chave do component registry
  props: Record<string, unknown>;
}

export type AtomConfig =
  | ({ engine: 'phaser' } & PhaserAtomConfig)
  | ({ engine: 'video' } & VideoAtomConfig)
  | ({ engine: 'audio' } & AudioAtomConfig)
  | ({ engine: 'native_html' } & NativeHtmlAtomConfig);

// -------------------------------------------------------------
// Success / Result
// -------------------------------------------------------------

export interface SuccessCriteria {
  minAccuracy?: number; // 0..1
  maxAttempts?: number;
  minDurationSeconds?: number; // ex.: vídeos exigem tempo mínimo assistido
}

export type DifficultyLevel = 1 | 2 | 3;

export interface AtomResult {
  success: boolean;
  durationMs: number;
  attempts: number;
  difficultyLevel: DifficultyLevel;
  conceptsScored: Array<{ conceptId: string; score: number }>;
  raw?: Record<string, unknown>;
}

// -------------------------------------------------------------
// Domain entities (subconjunto canônico para o app)
// -------------------------------------------------------------

export interface World {
  id: string;
  slug: string;
  displayName: string;
  ageMin: number;
  ageMax: number;
  description: string | null;
  themeColor: string | null;
  hitAreaMinPx: number;
  sessionDurationMinSeconds: number;
  sessionDurationMaxSeconds: number;
  active: boolean;
}

export interface Axis {
  id: string;
  worldId: string;
  slug: string;
  displayName: string;
  subtitle: string | null;
  iconName: string | null;
  displayOrder: number;
  active: boolean;
}

export interface Chapter {
  id: string;
  axisId: string;
  displayName: string;
  description: string | null;
  displayOrder: number;
  estimatedWeeks: number | null;
  active: boolean;
}

export interface SessionEntity {
  id: string;
  chapterId: string;
  displayName: string;
  learningObjective: string;
  displayOrder: number;
  estimatedDurationSeconds: number;
  active: boolean;
}

export interface Atom {
  id: string;
  sessionId: string;
  atomType: AtomType;
  engine: GameEngine;
  config: AtomConfig;
  displayOrder: number;
  estimatedDurationSeconds: number;
  successCriteria: SuccessCriteria;
  active: boolean;
}

export interface Child {
  id: string;
  familyId: string;
  displayName: string;
  birthYear: number;
  avatarSeed: string | null;
  activeWorldId: string | null;
  preferredVoice: string | null;
  handPreference: HandPreference;
  onboardingCompletedAt: Date | null;
}

export interface Family {
  id: string;
  ownerId: string;
  displayName: string | null;
  countryCode: string;
  locale: string;
}

// -------------------------------------------------------------
// Session player state (zustand)
// -------------------------------------------------------------

export type SessionPlayerStatus =
  | 'idle'
  | 'loading'
  | 'playing'
  | 'paused'
  | 'completed'
  | 'error';

export interface SessionState {
  sessionId: string | null;
  childId: string | null;
  currentAtomIndex: number;
  atomResults: AtomResult[];
  startedAt: Date | null;
  status: SessionPlayerStatus;
  errorMessage: string | null;
}

// -------------------------------------------------------------
// LGPD
// -------------------------------------------------------------

export interface ConsentScope {
  basic_usage: boolean; // necessário para o app funcionar
  product_improvement: boolean; // analytics agregada anônima
  communications: boolean; // emails de novidades
}

export interface ConsentRecord {
  id: string;
  childId: string;
  grantedBy: string;
  grantedAt: Date;
  revokedAt: Date | null;
  scope: ConsentScope;
  policyVersion: string;
}

// -------------------------------------------------------------
// Entitlements
// -------------------------------------------------------------

export type EntitlementSource =
  | 'revenuecat'
  | 'drive-founder-grant'
  | 'manual-admin';

export interface Entitlement {
  id: string;
  familyId: string;
  productSlug: string;
  source: EntitlementSource;
  active: boolean;
  expiresAt: Date | null;
}
