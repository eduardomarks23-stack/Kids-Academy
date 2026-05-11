// =============================================================
// EmotionMatchScene — identificar carinhas correspondentes
// =============================================================
// Cobre: acha a carinha feliz/triste/brava (Eixo 4 S1-S3),
// reconhecer emoção no outro (S5).
//
// Config:
//   targetEmotion: 'feliz' | 'triste' | 'bravo' | 'neutro'
//   faces: Array<{ emotion, icon }>
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
} from './shared';
import type { TtsTrack } from '@/lib/audio/tts-placeholder';

interface SceneParams {
  targetEmotion: string;
  faces: Array<{ emotion: string; icon: string }>;
  title?: string;
  audioTracks?: TtsTrack[];
}

export default class EmotionMatchScene extends Phaser.Scene {
  private params!: SceneParams;
  private startTime = 0;
  private correctTaps = 0;
  private wrongTaps = 0;

  constructor() {
    super({ key: 'emotion-match' });
  }

  create(): void {
    defaultBackground(this);
    this.params = (this.registry.get('atomParams') as SceneParams) ?? {
      targetEmotion: 'feliz',
      faces: [],
    };
    this.startTime = performance.now();
    addTitle(this, this.params.title ?? `Toca nas carinhas ${this.params.targetEmotion}s`);
    playTracks(this.params.audioTracks);
    stopAudioOnShutdown(this);

    const { width } = this.scale;
    const cols = 2;
    const cellW = Math.min(width / (cols + 0.5), 200);
    const cellH = 200;
    const startX = width / 2 - (cellW * (cols - 1)) / 2;
    const startY = 200;

    this.params.faces.forEach((face, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const x = startX + col * cellW;
      const y = startY + row * cellH;
      const isTarget = face.emotion === this.params.targetEmotion;
      const tex = makeLabelTexture(this, `face-${idx}`, {
        label: face.icon,
        width: 160,
        height: 160,
        bgColor: '#FEF3C7',
        textColor: '#FFFFFF',
        fontSize: 96,
        rounded: 80,
      });
      const sprite = this.add.image(x, y, tex).setInteractive({ useHandCursor: true });
      sprite.setData('counted', false);

      sprite.on('pointerdown', () => {
        if (sprite.getData('counted')) return;
        void vibrate();
        if (isTarget) {
          sprite.setData('counted', true);
          this.correctTaps++;
          this.tweens.add({
            targets: sprite,
            scale: 1.25,
            duration: 200,
            yoyo: true,
          });
          const totalTargets = this.params.faces.filter((f) => f.emotion === this.params.targetEmotion).length;
          if (this.correctTaps >= Math.ceil(totalTargets * 0.75)) {
            this.time.delayedCall(800, () => this.finish());
          }
        } else {
          this.wrongTaps++;
          this.tweens.add({ targets: sprite, x: x - 5, duration: 60, yoyo: true, repeat: 2 });
        }
      });
    });
  }

  private finish(): void {
    emitAtomComplete(this, {
      success: this.correctTaps >= 2,
      durationMs: performance.now() - this.startTime,
      attempts: this.correctTaps + this.wrongTaps,
      raw: { correctTaps: this.correctTaps, wrongTaps: this.wrongTaps },
    });
  }
}
