'use client';

// =============================================================
// SessionRunner — client wrapper que orquestra fetch+player
// =============================================================

import { useEffect, useState } from 'react';
import { fetchSessionWithAtoms, SessionPlayer } from '@/features/sessions';
import { useSessionPlayerStore } from '@/stores/session-player';

interface Props {
  sessionId: string;
  childId: string;
}

export function SessionRunner({ sessionId, childId }: Props) {
  const startSession = useSessionPlayerStore((s) => s.startSession);
  const reset = useSessionPlayerStore((s) => s.reset);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const session = await fetchSessionWithAtoms(sessionId);
        if (!cancelled) startSession(childId, session);
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'erro ao carregar sessão';
        if (!cancelled) setLoadError(msg);
      }
    })();
    return () => {
      cancelled = true;
      reset();
    };
  }, [sessionId, childId, startSession, reset]);

  if (loadError) {
    return (
      <div className="flex h-dvh items-center justify-center bg-white">
        <p className="text-red-600">{loadError}</p>
      </div>
    );
  }

  return (
    <div className="h-dvh w-full bg-white">
      <SessionPlayer childId={childId} />
    </div>
  );
}
