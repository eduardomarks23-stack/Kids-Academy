// =============================================================
// ColorMatchScene — tocar em todos os elementos da cor alvo
// =============================================================
// Cobre: o mundo vermelho/azul/amarelo/verde (Eixo 3 S1-S4).
// Gera cenário procedural com objetos coloridos; criança deve
// tocar nos que combinam com targetColor.
//
// Config:
//   targetColor: 'red' | 'blue' | 'yellow' | 'green' | etc
//   minTaps?: number (default 4)
//   title?: string
// =============================================================

import Phaser from 'phaser';
import {
  addTitle,
  defaultBackground,
  emitAtomComplete,
  makeLabelTexture,
  playTracks,
  stopAudioOnShutdown,
  vibrate,
  CURIOSOS_PALETTE,
} from './shared';
import type { TtsTrack } from '@/lib/audio/tts-placeholder';

interface SceneParams {
  targetColor: string;
  minTaps?: number;
  title?: string;
  audioTracks?: TtsTrack[];
}

const COLOR_HEX: Record<string, string> = {
  red: '#EF4444',
  blue: '#60A5FA',
  yellow: '#FCD34D',
  green: '#34D399',
  orange: '#FB923C',
  purple: '#A78BFA',
  pink: '#F472B6',
};

const ICONS_BY_COLOR: Record<string, string[]> = {
  red: ['🍎', '🍓', '🍅', '❤️', '🌹'],
  blue: ['🐟', '🎈', '💧', '🌊', '🫐'],
  yellow: ['☀️', '🌼', '🍌', '⭐', '🐤'],
  green: ['🍃', '🐸', '🥦', '🌵', '🍀'],
};

export default class ColorMatchScene extends Phaser.Scene {
  private params!: SceneParams;
  private startTime = 0;
  private correctTaps = 0;
  private wrongTaps = 0;

  constructor() {
    super({ key: 'color-match' });
  }

  create(): void {
    defaultBackground(this);
    this.params = (this.registry.get('atomParams') as SceneParams) ?? {
      targetColor: 'red',
    };
    this.startTime = performance.now();
    addTitle(this, this.params.title ?? `Toca em tudo ${this.params.targetColor}`);
    playTracks(this.params.audioTracks);
    stopAudioOnShutdown(this);

    const { width, height } = this.scale;
    const target = this.params.targetColor;
    const others = Object.keys(COLOR_HEX).filter((c) => c !== target);

    // Spawn 8 objetos: 5 da cor alvo + 3 distratores
    const positions: Array<{ x: number; y: number; color: string }> = [];
    for (let i = 0; i < 5; i++) {
      positions.push({
        x: 80 + Math.random() * (width - 160),
        y: 150 + Math.random() * (height - 250),
        color: target,
      });
    }
    for (let i = 0; i < 3; i++) {
      const c = others[Math.floor(Math.random() * others.length)];
      positions.push({
        x: 80 + Math.random() * (width - 160),
        y: 150 + Math.random() * (height - 250),
        color: c,
      });
    }
    // Embaralha
    Phaser.Utils.Array.Shuffle(positions);

    positions.forEach((pos, idx) => {
      const icons = ICONS_BY_COLOR[pos.color] ?? ICONS_BY_COLOR.red;
      const icon = icons[Math.floor(Math.random() * icons.length)];
      const tex = makeLabelTexture(this, `obj-${idx}`, {
        label: icon,
        width: 120,
        height: 120,
        bgColor: COLOR_HEX[pos.color] ?? CURIOSOS_PALETTE.yellow,
        textColor: '#FFFFFF',
        fontSize: 56,
      });
      const sprite = this.add.image(pos.x, pos.y, tex).setInteractive({ useHandCursor: true });
      sprite.setData('counted', false);

      sprite.on('pointerdown', () => {
        if (sprite.getData('counted')) return;
        void vibrate();
        if (pos.color === target) {
          sprite.setData('counted', true);
          this.correctTaps++;
          this.tweens.add({
            targets: sprite,
            scale: 1.3,
            duration: 200,
            yoyo: true,
            onComplete: () => {
              this.tweens.add({ targets: sprite, alpha: 0.4, duration: 200 });
            },
          });
          if (this.correctTaps >= (this.params.minTaps ?? 4)) {
            this.time.delayedCall(800, () => this.finish());
          }
        } else {
          this.wrongTaps++;
          this.tweens.add({ targets: sprite, x: pos.x - 5, duration: 60, yoyo: true, repeat: 2 });
        }
      });
    });
  }

  private finish(): void {
    emitAtomComplete(this, {
      success: this.correctTaps >= (this.params.minTaps ?? 4),
      durationMs: performance.now() - this.startTime,
      attempts: this.correctTaps + this.wrongTaps,
      raw: { correctTaps: this.correctTaps, wrongTaps: this.wrongTaps },
    });
  }
}
