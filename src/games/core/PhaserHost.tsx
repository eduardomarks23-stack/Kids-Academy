'use client';

import { useEffect, useRef } from 'react';
import { getGame } from './GameRegistry';
import type { GameComponentProps } from './GameRunner';
import type { KidsAcademyGameWithCallbacks } from './types';

/**
 * PhaserHost — wrapper React para jogos Phaser.
 *
 * Phaser cria sua própria <canvas>; este componente gerencia o ciclo
 * de vida (mount/unmount) e conecta callbacks ao game lifecycle.
 *
 * Phaser só é importado quando este componente é renderizado (lazy via
 * dynamic() no GameRunner) — bundle inicial fica < 300KB.
 */
export function PhaserHost({ slug, config, callbacks }: GameComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<KidsAcademyGameWithCallbacks | null>(null);

  useEffect(() => {
    const entry = getGame(slug);
    if (!entry || entry.engine !== 'phaser') return;
    if (!containerRef.current) return;

    let cancelled = false;

    void (async () => {
      const mod = await entry.loader();
      if (cancelled || !containerRef.current) return;

      const GameClass = mod.default as new () => KidsAcademyGameWithCallbacks;
      const instance = new GameClass();
      instance.setCallbacks(callbacks);
      await instance.mount(containerRef.current, config);
      gameRef.current = instance;
    })();

    return () => {
      cancelled = true;
      gameRef.current?.unmount();
      gameRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return <div ref={containerRef} className="w-full min-h-[60vh] flex items-center justify-center" />;
}
