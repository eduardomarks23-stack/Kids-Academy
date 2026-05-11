'use client';

import { type ReactNode, useEffect } from 'react';
import { AuthProvider } from './auth-provider';
import { QueryProvider } from './query-provider';
import { bootSceneRegistry } from '@/games/phaser/scene-registry';

/**
 * Composição de providers root. Importado por src/app/layout.tsx.
 *
 * SceneRegistry é bootado aqui (client-side, idempotente) para que
 * o PhaserAdapter resolva cenas por nome quando os átomos são montados.
 */
export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    bootSceneRegistry();
  }, []);
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}
