'use client';

// =============================================================
// SessionPlayer — orquestra a sequência de átomos
// =============================================================
// Monta um adapter por átomo, escuta onComplete/onError, grava
// progress via proxy, avança. Áudio inicial via TTS/Narration.
// =============================================================

import { useEffect, useRef, useState } from 'react';
import { useSessionPlayerStore } from '@/stores/session-player';
import { reportAtomAttempt } from '@/features/sessions/proxy';
import { getAdapter, type GameInstance, GameError } from '@/lib/games';
import type {
  Atom,
  AtomResult,
  PhaserAtomConfig,
  VideoAtomConfig,
  AudioAtomConfig,
  NativeHtmlAtomConfig,
} from '@/types/domain';

interface SessionPlayerProps {
  childId: string;
  onCompleted?: () => void;
}

export function SessionPlayer({ childId, onCompleted }: SessionPlayerProps) {
  const session = useSessionPlayerStore((s) => s.session);
  const currentAtomIndex = useSessionPlayerStore((s) => s.currentAtomIndex);
  const status = useSessionPlayerStore((s) => s.status);
  const advance = useSessionPlayerStore((s) => s.advance);
  const recordAtomResult = useSessionPlayerStore((s) => s.recordAtomResult);
  const fail = useSessionPlayerStore((s) => s.fail);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<GameInstance<AtomResult> | null>(null);
  const atomStartRef = useRef<Date | null>(null);
  const [mountKey, setMountKey] = useState(0);

  const currentAtom: Atom | undefined =
    session?.atoms[currentAtomIndex] ?? undefined;

  // Notifica completion da sessão para o caller
  useEffect(() => {
    if (status === 'completed') onCompleted?.();
  }, [status, onCompleted]);

  // Monta/desmonta adapter quando o átomo muda
  useEffect(() => {
    if (!currentAtom || !containerRef.current) return;
    let cancelled = false;
    atomStartRef.current = new Date();

    const adapter = getAdapter(currentAtom.engine);

    (async () => {
      try {
        // Cast por engine — adapter resolver garante tipo correto
        type AnyAtomConfig =
          | PhaserAtomConfig
          | VideoAtomConfig
          | AudioAtomConfig
          | NativeHtmlAtomConfig;
        const cfg = currentAtom.config as unknown as AnyAtomConfig;
        const inst = (await adapter.mount(
          containerRef.current!,
          cfg as never,
        )) as unknown as GameInstance<AtomResult>;
        if (cancelled) {
          await inst.destroy();
          return;
        }
        instanceRef.current = inst;

        inst.onComplete(async (result) => {
          recordAtomResult(result);
          if (atomStartRef.current) {
            try {
              await reportAtomAttempt({
                childId,
                sessionId: session!.id,
                atomId: currentAtom.id,
                startedAt: atomStartRef.current,
                completedAt: new Date(),
                result,
              });
            } catch (e) {
              console.error('[session-player] failed to report attempt', e);
            }
          }
          await inst.destroy();
          instanceRef.current = null;
          advance();
          setMountKey((k) => k + 1);
        });

        inst.onError((err: GameError) => {
          console.error('[session-player] adapter error', err);
          fail(err.message);
        });
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'erro ao montar átomo';
        fail(msg);
      }
    })();

    return () => {
      cancelled = true;
      void instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, [
    currentAtom,
    session,
    childId,
    advance,
    recordAtomResult,
    fail,
    mountKey,
  ]);

  if (!session) {
    return (
      <div className="flex h-full min-h-dvh w-full items-center justify-center bg-white">
        <p className="text-gray-500">Carregando sessão…</p>
      </div>
    );
  }

  if (status === 'completed') {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-purple-700">
            Sessão concluída
          </h2>
          <p className="mt-2 text-gray-600">
            {session.atoms.length} atividade
            {session.atoms.length === 1 ? '' : 's'} completada
            {session.atoms.length === 1 ? '' : 's'}!
          </p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white">
        <p className="text-red-600">
          Algo deu errado. Vamos tentar de novo em instantes.
        </p>
      </div>
    );
  }

  // Container Phaser sem AnimatePresence: motion wrappers tendem a
  // ter dimensões 0 no primeiro frame (Framer aplica transform inline),
  // o que faz Phaser.Scale.RESIZE inicializar o canvas em 0x0.
  return (
    <div className="relative h-full min-h-dvh w-full bg-white">
      <div
        key={currentAtom?.id ?? 'empty'}
        ref={containerRef}
        className="h-full w-full"
        style={{ minHeight: '100dvh', minWidth: '100%' }}
      />
    </div>
  );
}
