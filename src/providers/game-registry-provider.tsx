'use client';

// =============================================================
// GameRegistryProvider — boot do scene registry no client
// =============================================================
// Chama bootSceneRegistry() uma única vez ao montar a árvore.
// Idempotente (o próprio boot guarda flag interno).
// =============================================================

import { useEffect, type ReactNode } from 'react';
import { bootSceneRegistry } from '@/games/phaser/scene-registry';

export function GameRegistryProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    bootSceneRegistry();
  }, []);
  return <>{children}</>;
}
