'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { getGame, type GameRegistryEntry } from './GameRegistry';
import { BehaviorTracker } from './BehaviorTracker';
import type { GameCallbacks, GameConfig, GameResult } from './types';

interface GameRunnerProps {
  slug: string;
  config: GameConfig;
  onComplete?: (result: GameResult) => void;
  onScoreUpdate?: (score: number) => void;
}

/**
 * GameRunner — componente universal que carrega qualquer jogo via lazy import.
 *
 * Detecta engine pelo registro, importa apenas o necessário (Phaser não carrega
 * em jogos React, e vice-versa). Conecta callbacks para BehaviorTracker.
 */
export function GameRunner({ slug, config, onComplete, onScoreUpdate }: GameRunnerProps) {
  const entry = getGame(slug);
  const [score, setScore] = useState(0);
  const trackerRef = useRef<BehaviorTracker | null>(null);

  useEffect(() => {
    if (!entry) return;
    trackerRef.current = new BehaviorTracker({
      perfilCriancaId: config.perfilCriancaId,
      sessaoId: config.sessaoId,
      jogoId: slug,
    });
    return () => {
      trackerRef.current?.dispose();
      trackerRef.current = null;
    };
  }, [entry, slug, config.perfilCriancaId, config.sessaoId]);

  if (!entry) {
    return <GameError message={`Jogo não encontrado: ${slug}`} />;
  }
  if (entry.engine === 'pixi') {
    return <GameError message="PixiJS engine não implementada ainda" />;
  }

  // Cache module-level garante referência estável por slug — dynamic() só é chamado uma vez.
  const GameComponent = loadGameComponent(entry);

  const callbacks: GameCallbacks = {
    onScore: (points) => {
      setScore(points);
      onScoreUpdate?.(points);
    },
    onComplete: (result) => {
      void trackerRef.current?.flush();
      onComplete?.(result);
    },
    onBehavior: (event) => {
      trackerRef.current?.track(event);
    },
  };

  return (
    <div className="relative">
      {/* eslint-disable-next-line react-hooks/static-components */}
      <GameComponent slug={slug} config={config} callbacks={callbacks} />
      <ScoreOverlay score={score} />
    </div>
  );
}

export interface GameComponentProps {
  slug: string;
  config: GameConfig;
  callbacks: GameCallbacks;
}

/**
 * Cache de componentes dinâmicos. Garante referência estável por slug,
 * satisfazendo react-hooks/static-components do ESLint.
 */
const componentCache = new Map<string, React.ComponentType<GameComponentProps>>();

function loadGameComponent(entry: GameRegistryEntry): React.ComponentType<GameComponentProps> {
  const cached = componentCache.get(entry.slug);
  if (cached) return cached;

  const Component =
    entry.engine === 'react'
      ? dynamic(
          () =>
            entry
              .loader()
              .then((mod) => mod.default as unknown as React.ComponentType<GameComponentProps>),
          { ssr: false, loading: GameLoadingSkeleton },
        )
      : dynamic(() => import('./PhaserHost').then((mod) => mod.PhaserHost), {
          ssr: false,
          loading: GameLoadingSkeleton,
        });

  componentCache.set(entry.slug, Component);
  return Component;
}

function GameLoadingSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
      <div className="h-12 w-12 rounded-full border-4 border-purple-200 border-t-purple-700 animate-spin" />
      <p className="text-sm font-bold text-purple-700">Carregando jogo…</p>
    </div>
  );
}

function GameError({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center px-6">
      <p className="text-2xl font-extrabold text-gray-900">Não foi possível carregar o jogo</p>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}

function ScoreOverlay({ score }: { score: number }) {
  if (score === 0) return null;
  return (
    <div className="fixed top-20 right-4 z-40 px-3 py-1.5 rounded-full bg-emerald-500 text-white text-sm font-extrabold shadow-lg">
      +{score} XP
    </div>
  );
}
