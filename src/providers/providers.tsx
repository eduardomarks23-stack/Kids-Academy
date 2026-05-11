'use client';

import { type ReactNode } from 'react';
import { AuthProvider } from './auth-provider';
import { QueryProvider } from './query-provider';
import { bootSceneRegistry } from '@/games/phaser/scene-registry';

// Boot do scene registry no carregamento do módulo (client only).
// Idempotente (o próprio boot guarda flag). Garante que adapters
// resolvem cenas antes de qualquer mount, sem race com useEffect.
if (typeof window !== 'undefined') {
  bootSceneRegistry();
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}
