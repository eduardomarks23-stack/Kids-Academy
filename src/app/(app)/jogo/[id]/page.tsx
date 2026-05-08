'use client';

import { useRouter } from 'next/navigation';
import { use } from 'react';
import { KidsIcon } from '@/components/kids/icons';

/**
 * Placeholder Fase 3 — Game Adapter Pattern + jogo Pega Frações implementação
 * completa virá na Fase 4 (multi-engine).
 */
export default function JogoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  return (
    <div className="min-h-full bg-white">
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-5 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <KidsIcon.ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-extrabold text-gray-900">Jogo: {id}</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 pt-12 pb-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-purple-100 text-purple-700 mb-6">
          <KidsIcon.Bolt size={40} />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Jogo em construção</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          A arquitetura multi-engine de jogos (React + Phaser + PixiJS) está sendo construída
          na Fase 4. Em breve você poderá jogar Pega Frações aqui.
        </p>
        <button
          type="button"
          onClick={() => router.back()}
          className="mt-8 h-14 px-8 rounded-2xl bg-purple-700 text-white font-extrabold"
        >
          Voltar
        </button>
      </main>
    </div>
  );
}
