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
    setTimeout(() => router.push('/home'), 2500);
  }

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
          <h1 className="text-lg font-extrabold text-gray-900">Jogo</h1>
        </div>
      </header>

      <GameRunner
        slug={slug}
        config={{ perfilCriancaId, locale: 'pt-BR' }}
        onComplete={handleComplete}
      />
    </div>
  );
}
