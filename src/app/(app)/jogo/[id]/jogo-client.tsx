'use client';

import { useRouter } from 'next/navigation';
import { GameRunner } from '@/games/core/GameRunner';
import { KidsIcon } from '@/components/kids/icons';
import type { GameResult } from '@/games/core/types';

interface JogoClientProps {
  slug: string;
  perfilCriancaId: string;
}

export default function JogoClient({ slug, perfilCriancaId }: JogoClientProps) {
  const router = useRouter();

  function handleComplete(result: GameResult) {
    console.info('[jogo] completed', result);
    // TODO Fase 5: persistir progresso_aluno no Supabase
    // NOTE: end screen do próprio jogo cuida do "Jogar novamente";
    // não redirecionamos automaticamente para /home.
    void result;
  }

  return (
    <div className="flex flex-col bg-white" style={{ height: '100dvh' }}>
      <header className="flex-shrink-0 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-2 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Voltar"
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <KidsIcon.ArrowLeft size={20} />
          </button>
          <h1 className="text-base font-extrabold text-gray-900">Jogo</h1>
        </div>
      </header>

      <main className="flex-1 min-h-0 flex flex-col">
        <GameRunner
          slug={slug}
          config={{ perfilCriancaId, locale: 'pt-BR' }}
          onComplete={handleComplete}
        />
      </main>
    </div>
  );
}
