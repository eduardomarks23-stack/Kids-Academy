// =============================================================
// Game Adapter Pattern — interface neutra de engine
// =============================================================
// SPEC seção 10. Componentes React montam jogos via adapter,
// nunca acessam Phaser/Pixi diretamente. Permite swap de engine
// e facilita testes/mocking.
// =============================================================

import type { GameEngine } from '@/types/domain';

export class GameError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'GameError';
  }
}

export interface GameAdapter<TConfig, TResult> {
  readonly engine: GameEngine;
  mount(
    container: HTMLElement,
    config: TConfig,
  ): Promise<GameInstance<TResult>>;
}

export interface GameInstance<TResult> {
  pause(): void;
  resume(): void;
  destroy(): Promise<void>;
  onComplete(cb: (result: TResult) => void): void;
  onError(cb: (error: GameError) => void): void;
  onProgress?(cb: (progress: number) => void): void;
}
