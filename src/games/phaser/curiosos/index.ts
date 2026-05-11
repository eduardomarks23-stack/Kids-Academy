// =============================================================
// Curiosos — Scene Registry
// =============================================================
// Registra todas as cenas do Mundo dos Curiosos no scene
// registry do PhaserAdapter. Imports dinâmicos garantem que
// Phaser não infle bundle inicial.
// =============================================================

import { registerScene } from '@/lib/games/phaser-adapter';

export function registerCuriososScenes(): void {
  registerScene('tap-to-target', () => import('./scenes/tap-to-target'));
  registerScene('free-tap', () => import('./scenes/free-tap'));
  registerScene('drag-to-snap', () => import('./scenes/drag-to-snap'));
  registerScene('sort-to-bucket', () => import('./scenes/sort-to-bucket'));
  registerScene('binary-choice', () => import('./scenes/binary-choice'));
  registerScene('count-objects', () => import('./scenes/count-objects'));
  registerScene('color-match', () => import('./scenes/color-match'));
  registerScene('character-editor', () => import('./scenes/character-editor'));
  registerScene('breathing', () => import('./scenes/breathing'));
  registerScene('emotion-match', () => import('./scenes/emotion-match'));
  registerScene('celebrate', () => import('./scenes/celebrate'));
  registerScene('listen-screen', () => import('./scenes/listen-screen'));
}
