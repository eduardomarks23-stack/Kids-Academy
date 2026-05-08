'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { DogBerg } from '@/components/kids/dog-berg';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // TODO Fase 5: enviar para Sentry
    console.error('App error:', error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center justify-center bg-white p-8">
      <div className="text-center max-w-md">
        <DogBerg size={160} expression="curious" />
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900">Algo deu errado</h1>
        <p className="mt-2 text-gray-600">
          Tivemos um probleminha. Tente novamente ou volte para o início.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <button
            type="button"
            onClick={reset}
            className="h-12 px-6 rounded-2xl bg-purple-700 text-white font-extrabold"
          >
            Tentar novamente
          </button>
          <Link
            href="/"
            className="h-12 px-6 rounded-2xl bg-gray-100 text-gray-700 font-extrabold flex items-center"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}
