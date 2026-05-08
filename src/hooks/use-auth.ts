'use client';

import { useContext } from 'react';
import { AuthContext } from '@/providers/auth-provider';

/**
 * Hook de acesso ao estado de autenticação.
 * Deve ser usado dentro de AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  }
  return context;
}
