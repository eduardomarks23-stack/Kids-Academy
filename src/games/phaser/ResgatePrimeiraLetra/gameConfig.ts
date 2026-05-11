import Phaser from 'phaser';
import { MainScene } from './MainScene';

/**
 * Configuração responsiva do Phaser para Resgate da Primeira Letra.
 *
 * RESIZE mode adapta ao container; posições são computadas em MainScene
 * via this.scale.width/height. Multi-touch para crianças.
 */
export const createGameConfig = (parent: HTMLElement): Phaser.Types.Core.GameConfig => ({
  type: Phaser.AUTO,
  parent,
  width: 800,
  height: 600,
  backgroundColor: '#EFF6FF',
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: '100%',
    height: '100%',
  },
  physics: {
    default: 'arcade',
    arcade: { gravity: { x: 0, y: 0 }, debug: false },
  },
  scene: [MainScene],
  input: {
    activePointers: 3,
  },
  render: {
    antialias: true,
    roundPixels: false,
    pixelArt: false,
  },
});
