'use client';

import { type ReactNode } from 'react';
import { AuthProvider } from './auth-provider';
import { QueryProvider } from './query-provider';
import { GameRegistryProvider } from './game-registry-provider';

/**
 * Composição de providers root. Importado por src/app/layout.tsx.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <GameRegistryProvider>{children}</GameRegistryProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
