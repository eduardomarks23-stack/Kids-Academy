'use client';

/**
 * TEMPLATE — Jogo simples (React + Framer Motion).
 *
 * Para criar novo jogo simples:
 *   1. Copie esta pasta para src/games/simple/SeuJogo/
 *   2. Renomeie o componente exportado
 *   3. Implemente lógica usando state/effect React
 *   4. Use callbacks.onScore, onComplete, onBehavior conforme necessário
 *   5. Registre em src/games/core/GameRegistry.ts
 *
 * Ver `docs/CREATING_NEW_GAMES.md` para guia completo.
 */

import { useEffect, useRef, useState } from 'react';
import type { GameComponentProps } from '@/games/core/GameRunner';

export default function TemplateGame({ callbacks }: GameComponentProps) {
  const [pontos, setPontos] = useState(0);
  const iniciadoRef = useRef<number>(0);

  useEffect(() => {
    iniciadoRef.current = Date.now();
  }, []);

  function handleAcao() {
    const novoPontos = pontos + 10;
    setPontos(novoPontos);
    callbacks.onScore(novoPontos);
    callbacks.onBehavior({
      type: 'tempo_resposta',
      valor: { ms: 1000 },
    });
  }

  function handleCompletar() {
    const duracao = iniciadoRef.current
      ? Math.floor((Date.now() - iniciadoRef.current) / 1000)
      : 0;
    callbacks.onComplete({
      score: pontos,
      duracaoSegundos: duracao,
      acertos: 1,
      erros: 0,
      conceitosTrabalhados: ['exemplo'],
    });
  }

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-extrabold mb-4">Template de jogo simples</h2>
      <p className="text-gray-600 mb-6">Pontos: {pontos}</p>
      <button
        type="button"
        onClick={handleAcao}
        className="h-12 px-6 rounded-2xl bg-purple-700 text-white font-extrabold mr-3"
      >
        Ação
      </button>
      <button
        type="button"
        onClick={handleCompletar}
        className="h-12 px-6 rounded-2xl bg-emerald-500 text-white font-extrabold"
      >
        Completar
      </button>
    </div>
  );
}
