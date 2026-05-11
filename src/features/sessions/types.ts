// =============================================================
// features/sessions — tipos da feature
// =============================================================

import type {
  SessionEntity,
  Atom,
  AtomResult,
  SessionPlayerStatus,
} from '@/types/domain';

export interface SessionWithAtoms extends SessionEntity {
  atoms: Atom[];
}

export interface SessionPlayerStore {
  sessionId: string | null;
  childId: string | null;
  currentAtomIndex: number;
  atomResults: AtomResult[];
  startedAt: Date | null;
  status: SessionPlayerStatus;
  errorMessage: string | null;

  startSession: (childId: string, session: SessionWithAtoms) => void;
  recordAtomResult: (result: AtomResult) => void;
  advance: () => void;
  pause: () => void;
  resume: () => void;
  fail: (message: string) => void;
  reset: () => void;
}
