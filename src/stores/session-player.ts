// =============================================================
// session-player store (zustand)
// =============================================================
// Estado do session player na área da criança. Domain logic
// fica no proxy; este store guarda apenas estado client.
// =============================================================

import { create } from 'zustand';
import type {
  AtomResult,
  SessionPlayerStatus,
} from '@/types/domain';
import type { SessionWithAtoms } from '@/features/sessions/types';

interface State {
  sessionId: string | null;
  childId: string | null;
  session: SessionWithAtoms | null;
  currentAtomIndex: number;
  atomResults: AtomResult[];
  startedAt: Date | null;
  status: SessionPlayerStatus;
  errorMessage: string | null;
}

interface Actions {
  startSession: (childId: string, session: SessionWithAtoms) => void;
  recordAtomResult: (result: AtomResult) => void;
  advance: () => void;
  pause: () => void;
  resume: () => void;
  fail: (message: string) => void;
  reset: () => void;
}

const initial: State = {
  sessionId: null,
  childId: null,
  session: null,
  currentAtomIndex: 0,
  atomResults: [],
  startedAt: null,
  status: 'idle',
  errorMessage: null,
};

export const useSessionPlayerStore = create<State & Actions>((set, get) => ({
  ...initial,

  startSession: (childId, session) =>
    set({
      sessionId: session.id,
      childId,
      session,
      currentAtomIndex: 0,
      atomResults: [],
      startedAt: new Date(),
      status: 'playing',
      errorMessage: null,
    }),

  recordAtomResult: (result) =>
    set((s) => ({ atomResults: [...s.atomResults, result] })),

  advance: () => {
    const { session, currentAtomIndex } = get();
    if (!session) return;
    const next = currentAtomIndex + 1;
    if (next >= session.atoms.length) {
      set({ status: 'completed' });
    } else {
      set({ currentAtomIndex: next });
    }
  },

  pause: () => set({ status: 'paused' }),
  resume: () => set({ status: 'playing' }),
  fail: (message) => set({ status: 'error', errorMessage: message }),
  reset: () => set(initial),
}));
