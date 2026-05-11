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
  /**
   * Marca o jogo como "em breve" — placeholder ainda em desenvolvimento.
   * Filtrado por listGames() por padrão e tratado como tela de "em breve"
   * pelo GameRunner. Permite registrar slug+loader sem expor placeholder
   * para usuários finais.
   */
  comingSoon?: boolean;
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
    comingSoon: true,
  },
  'encaixe-formas': {
    slug: 'encaixe-formas',
    title: 'Encaixe das Formas Mágicas',
    engine: 'phaser',
    conceitos: ['formas-geometricas', 'coordenacao-motora', 'discriminacao-visual'],
    loader: () => import('@/games/phaser/EncaixeFormas'),
  },
  'resgate-primeira-letra': {
    slug: 'resgate-primeira-letra',
    title: 'Resgate da Primeira Letra',
    engine: 'phaser',
    conceitos: [
      'leitura',
      'alfabetizacao',
      'consciencia-fonologica',
      'reconhecimento-letras',
    ],
    loader: () => import('@/games/phaser/ResgatePrimeiraLetra'),
  },
};

export function getGame(slug: string): GameRegistryEntry | null {
  return GAME_REGISTRY[slug] ?? null;
}

/**
 * Lista jogos disponíveis. Por padrão filtra os marcados como `comingSoon`
 * para não expor placeholders. Use `{ includeComingSoon: true }` em telas
 * internas/admin que precisem ver tudo.
 */
export function listGames(options?: { includeComingSoon?: boolean }): GameRegistryEntry[] {
  const all = Object.values(GAME_REGISTRY);
  if (options?.includeComingSoon) return all;
  return all.filter((g) => !g.comingSoon);
}
