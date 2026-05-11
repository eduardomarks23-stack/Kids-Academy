// =============================================================
// features/sessions/proxy.ts
// =============================================================
// Facade centralizando: Supabase (fetch session+atoms), API
// /api/progress (gravar attempt) e GameAdapter (montar engine).
// Components consomem este proxy, não os SDKs diretamente.
// =============================================================

import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import type {
  Atom,
  AtomConfig,
  AtomResult,
  AtomType,
  GameEngine,
  SessionEntity,
  SuccessCriteria,
} from '@/types/domain';
import type { SessionWithAtoms } from './types';

// -------------------------------------------------------------
// Fetch
// -------------------------------------------------------------

interface AtomRow {
  id: string;
  session_id: string;
  atom_type: string;
  engine: string;
  config: Record<string, unknown>;
  display_order: number;
  estimated_duration_seconds: number;
  success_criteria: Record<string, unknown>;
  active: boolean;
}

interface SessionRow {
  id: string;
  chapter_id: string;
  display_name: string;
  learning_objective: string;
  display_order: number;
  estimated_duration_seconds: number;
  active: boolean;
}

function mapAtom(row: AtomRow): Atom {
  return {
    id: row.id,
    sessionId: row.session_id,
    atomType: row.atom_type as AtomType,
    engine: row.engine as GameEngine,
    config: row.config as unknown as AtomConfig,
    displayOrder: row.display_order,
    estimatedDurationSeconds: row.estimated_duration_seconds,
    successCriteria: row.success_criteria as SuccessCriteria,
    active: row.active,
  };
}

function mapSession(row: SessionRow, atoms: AtomRow[]): SessionWithAtoms {
  const session: SessionEntity = {
    id: row.id,
    chapterId: row.chapter_id,
    displayName: row.display_name,
    learningObjective: row.learning_objective,
    displayOrder: row.display_order,
    estimatedDurationSeconds: row.estimated_duration_seconds,
    active: row.active,
  };
  return {
    ...session,
    atoms: atoms
      .filter((a) => a.active)
      .sort((a, b) => a.display_order - b.display_order)
      .map(mapAtom),
  };
}

export async function fetchSessionWithAtoms(
  sessionId: string,
): Promise<SessionWithAtoms> {
  const supabase = createBrowserSupabaseClient();
  const [{ data: session, error: e1 }, { data: atoms, error: e2 }] =
    await Promise.all([
      supabase.from('sessions').select('*').eq('id', sessionId).single(),
      supabase.from('atoms').select('*').eq('session_id', sessionId),
    ]);
  if (e1 || !session) {
    throw new Error(`Sessão ${sessionId} não encontrada`);
  }
  if (e2) throw e2;
  return mapSession(session as unknown as SessionRow, (atoms ?? []) as unknown as AtomRow[]);
}

// -------------------------------------------------------------
// Progress write (vai pelo route handler com validação)
// -------------------------------------------------------------

export interface ReportAttemptInput {
  childId: string;
  sessionId: string;
  atomId: string;
  startedAt: Date;
  completedAt: Date;
  result: AtomResult;
}

export async function reportAtomAttempt(
  input: ReportAttemptInput,
): Promise<void> {
  const res = await fetch('/api/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      childId: input.childId,
      sessionId: input.sessionId,
      atomId: input.atomId,
      startedAt: input.startedAt.toISOString(),
      completedAt: input.completedAt.toISOString(),
      success: input.result.success,
      difficultyLevel: input.result.difficultyLevel,
      result: {
        durationMs: input.result.durationMs,
        attempts: input.result.attempts,
        conceptsScored: input.result.conceptsScored,
        raw: input.result.raw,
      },
    }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(`Falha ao gravar progresso: ${JSON.stringify(body)}`);
  }
}
