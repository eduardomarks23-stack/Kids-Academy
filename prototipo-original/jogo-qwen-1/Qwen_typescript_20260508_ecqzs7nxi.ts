import Phaser from 'phaser';
import { MainScene } from './MainScene';

/**
 * Configuração responsiva do Phaser.
 * O modo FIT garante que o jogo se adapte ao container pai mantendo a proporção.
 * activePointers: 3 permite multi-toque (ideal para crianças que usam vários dedos).
 */
export const createGameConfig = (parent: string): Phaser.Types.Core.GameConfig => ({
  type: Phaser.AUTO,
  parent,
  width: 960,
  height: 540, // Proporção 16:9 para combinar com aspect-video do Tailwind
  backgroundColor: '#F0F9FF', // Azul suave, amigável para primeira infância
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: '100%',
    height: '100%',
  },
  physics: {
    default: 'arcade',
    arcade: { debug: false },
  },
  scene: [MainScene],
  input: {
    activePointers: 3, // Multi-touch friendly
  },
  render: {
    antialias: true,
    roundPixels: true,
    pixelArt: false,
  },
});