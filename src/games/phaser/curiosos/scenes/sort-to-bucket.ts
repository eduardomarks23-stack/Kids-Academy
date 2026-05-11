// =============================================================
// SortToBucketScene — drag para "cestinhas" categóricas
// =============================================================
// Cobre: cesta do MUITO/POUCO (Eixo 2 S3), cesta do A/E/I/O/U
// (Eixo 1 S6-S10), cesta GRANDE/PEQUENO (Eixo 2 S4), etc.
//
// Config:
//   items: Array<{ word: string, startsWith: string }>
//   buckets: Array<{ label: string, accept: string }>
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
  SNAP_RADIUS_PX,
} from './shared';
import type { TtsTrack } from '@/lib/audio/tts-placeholder';

interface SceneParams {
  items: Array<{ word: string; startsWith: string }>;
  buckets: Array<{ label: string; accept: string }>;
  title?: string;
  audioTracks?: TtsTrack[];
}

export default class SortToBucketScene extends Phaser.Scene {
  private params!: SceneParams;
  private startTime = 0;
  private placed = 0;
  private bucketAreas: Array<{ x: number; y: number; accept: string }> = [];

  constructor() {
    super({ key: 'sort-to-bucket' });
  }

  create(): void {
    defaultBackground(this);
    this.params = (this.registry.get('atomParams') as SceneParams) ?? {
      items: [],
      buckets: [],
    };
    this.startTime = performance.now();
    addTitle(this, this.params.title ?? 'Coloca na cesta certa');
    playTracks(this.params.audioTracks);
    stopAudioOnShutdown(this);

    const { width, height } = this.scale;

    // Buckets na parte inferior
    const bucketY = height - 140;
    const bucketSpacing = width / (this.params.buckets.length + 1);
    this.params.buckets.forEach((bucket, idx) => {
      const x = bucketSpacing * (idx + 1);
      const tex = makeLabelTexture(this, `bucket-${idx}`, {
        label: '🧺',
        width: 160,
        height: 160,
        bgColor: idx === 0 ? CURIOSOS_PALETTE.green : CURIOSOS_PALETTE.pink,
        textColor: '#FFFFFF',
        fontSize: 56,
      });
      this.add.image(x, bucketY, tex);
      this.add
        .text(x, bucketY + 100, bucket.label, {
          fontFamily: 'Nunito, system-ui, sans-serif',
          fontSize: '18px',
          color: CURIOSOS_PALETTE.text,
          fontStyle: '500',
        })
        .setOrigin(0.5);
      this.bucketAreas.push({ x, y: bucketY, accept: bucket.accept });
    });

    // Itens na parte superior em grid
    const itemY = 180;
    const cols = Math.min(this.params.items.length, 4);
    const cellW = Math.min(width / (cols + 0.5), 180);
    const startX = width / 2 - (cellW * (cols - 1)) / 2;

    this.params.items.forEach((item, idx) => {
      const x = startX + idx * cellW;
      const tex = makeLabelTexture(this, `item-${idx}`, {
        label: item.word,
        width: 140,
        height: 100,
        bgColor: CURIOSOS_PALETTE.yellow,
        textColor: CURIOSOS_PALETTE.text,
        fontSize: 22,
      });
      const sprite = this.add.image(x, itemY, tex).setInteractive({ draggable: true, useHandCursor: true });
      const homeX = x;
      const homeY = itemY;
      sprite.setData('startsWith', item.startsWith);

      sprite.on('dragstart', () => this.tweens.killTweensOf(sprite));
      sprite.on('drag', (_: Phaser.Input.Pointer, dragX: number, dragY: number) => {
        sprite.x = dragX;
        sprite.y = dragY;
      });
      sprite.on('dragend', () => {
        let matched: { x: number; y: number; accept: string } | null = null;
        for (const bucket of this.bucketAreas) {
          const dist = Phaser.Math.Distance.Between(sprite.x, sprite.y, bucket.x, bucket.y);
          if (dist <= SNAP_RADIUS_PX) {
            matched = bucket;
            break;
          }
        }
        if (matched && matched.accept === item.startsWith) {
          sprite.disableInteractive();
          this.tweens.add({
            targets: sprite,
            x: matched.x + (Math.random() * 30 - 15),
            y: matched.y + (Math.random() * 30 - 15),
            scale: 0.5,
            duration: 300,
            onComplete: () => {
              this.placed++;
              void vibrate();
              if (this.placed === this.params.items.length) {
                this.time.delayedCall(600, () => this.finish());
              }
            },
          });
        } else {
          this.tweens.add({
            targets: sprite,
            x: homeX,
            y: homeY,
            duration: 300,
            ease: 'Back.easeOut',
          });
        }
      });
    });
  }

  private finish(): void {
    emitAtomComplete(this, {
      success: this.placed >= this.params.items.length,
      durationMs: performance.now() - this.startTime,
      attempts: this.placed,
      raw: { placed: this.placed },
    });
  }
}
