import Phaser from 'phaser';
import { MainScene } from './MainScene';

/**
 * Configuração responsiva do Phaser — Encaixe das Formas Mágicas v2.
 *
 * RESIZE mode: o canvas preenche o container e a Scene se adapta ao
 * tamanho disponível (mobile portrait, mobile landscape, desktop).
 * Posições/tamanhos são computados a partir de `this.scale.width/height`
 * em MainScene.
 *
 * activePointers: 3 → multi-touch (crianças usam vários dedos).
 */
export const createGameConfig = (parent: HTMLElement): Phaser.Types.Core.GameConfig => ({
  type: Phaser.AUTO,
  parent,
  // Tamanho base — sobrescrito pelo modo RESIZE assim que o container mede
  width: 800,
  height: 600,
  backgroundColor: '#FAF7FF',
  scale: {
    mode: Phaser.Scale.RESIZE,
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
    activePointers: 3,
  },
  render: {
    antialias: true,
    roundPixels: false, // gradients ficam mais suaves
    pixelArt: false,
  },
});
