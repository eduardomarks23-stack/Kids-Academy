import type Phaser from 'phaser';
import type { GameCallbacks, GameConfig } from '@/games/core/types';

/**
 * BaseScene — utilidades compartilhadas para cenas Phaser do Kids Academy.
 *
 * Como usar: cenas concretas estendem esta classe e ganham acesso a:
 *   - this.kidsConfig (GameConfig passado pelo GameRunner)
 *   - this.callbacks (GameCallbacks: onScore, onComplete, onBehavior)
 *   - this.trackBehavior(...) helper
 */

export interface KidsSceneInit {
  config: GameConfig;
  callbacks: GameCallbacks;
}

export abstract class BaseScene {
  protected kidsConfig!: GameConfig;
  protected callbacks!: GameCallbacks;

  init(data: KidsSceneInit): void {
    this.kidsConfig = data.config;
    this.callbacks = data.callbacks;
  }

  /** Helper para reportar eventos comportamentais. */
  trackBehavior(
    type: Parameters<GameCallbacks['onBehavior']>[0]['type'],
    valor: Record<string, unknown>,
    questaoId?: string,
  ): void {
    this.callbacks.onBehavior({ type, valor, questaoId });
  }

  /** Tem que ser implementado pelo TypeScript usando mixin com Phaser.Scene. */
  abstract preload?: () => void;
  abstract create?: () => void;
  abstract update?: (time: number, delta: number) => void;
}

/**
 * Cores padrão Kids Academy para uso em cenas Phaser.
 */
export const KIDS_COLORS = {
  primary: 0x6b46c1,
  secondary: 0xfcd34d,
  success: 0x10b981,
  warning: 0xf87171,
  info: 0x3b82f6,
  white: 0xffffff,
  gray100: 0xf3f4f6,
  gray400: 0x9ca3af,
  gray700: 0x374151,
} as const;

/**
 * Helper: cria um botão simples Phaser com hover state.
 */
export function createButton(
  scene: Phaser.Scene,
  x: number,
  y: number,
  label: string,
  onClick: () => void,
): Phaser.GameObjects.Container {
  const bg = scene.add.rectangle(0, 0, 200, 56, KIDS_COLORS.primary);
  bg.setStrokeStyle(3, KIDS_COLORS.primary);
  const text = scene.add.text(0, 0, label, {
    fontFamily: 'Nunito',
    fontSize: '20px',
    fontStyle: '900',
    color: '#FFFFFF',
  });
  text.setOrigin(0.5);

  const container = scene.add.container(x, y, [bg, text]);
  container.setSize(200, 56);
  container.setInteractive({ useHandCursor: true });

  container.on('pointerover', () => {
    bg.setFillStyle(0x7b52d6);
  });
  container.on('pointerout', () => {
    bg.setFillStyle(KIDS_COLORS.primary);
  });
  container.on('pointerdown', () => {
    bg.setScale(0.97);
  });
  container.on('pointerup', () => {
    bg.setScale(1);
    onClick();
  });

  return container;
}
