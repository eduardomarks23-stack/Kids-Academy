import type { GameEngine } from './types';

/**
 * GameRegistry — catálogo de jogos disponíveis. Mapeia slug → loader dinâmico.
 *
 * Adicionar novo jogo: importar dinamicamente + registrar aqui.
 * Lazy loading: cada loader retorna Promise; engine só carrega quando jogo é montado.
 */

export interface GameRegistryEntry {
  slug: string;
  title: string;
  engine: GameEngine;
  conceitos: string[];
  /**
   * Loader dinâmico do jogo. Pode retornar:
   *   - React component (jogos simples) — `{ default: React.ComponentType }`
   *   - Classe que implementa KidsAcademyGameWithCallbacks (Phaser/PixiJS)
   */
  loader: () => Promise<{ default: unknown }>;
}

export const GAME_REGISTRY: Record<string, GameRegistryEntry> = {
  'pega-fracoes': {
    slug: 'pega-fracoes',
    title: 'Pega Frações',
    engine: 'react',
    conceitos: ['fracoes', 'matematica-ef-3', 'matematica-ef-4'],
    loader: () => import('@/games/simple/PegaFracoes'),
  },
  'aventura-matematica': {
    slug: 'aventura-matematica',
    title: 'Aventura Matemática',
    engine: 'phaser',
    conceitos: ['aritmetica', 'matematica-ef-3'],
    loader: () => import('@/games/phaser/AventuraMatematica'),
  },
};

export function getGame(slug: string): GameRegistryEntry | null {
  return GAME_REGISTRY[slug] ?? null;
}

export function listGames(): GameRegistryEntry[] {
  return Object.values(GAME_REGISTRY);
}
