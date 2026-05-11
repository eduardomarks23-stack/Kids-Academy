// =============================================================
// DragToSnapScene — drag de item para slot/par correspondente
// =============================================================
// Cobre: encaixe formas (Eixo 3 S6-S9), juntar rimas (Eixo 1 S4-S5),
// juntar iguais (Eixo 2 S6).
//
// Config:
//   pairs: Array<{ left: string, right: string }>
//   title?: string
// =============================================================

import Phaser from 'phaser';
import {
  addTitle,
  defaultBackground,
  emitAtomComplete,
  makeLabelTexture,
  playTracks,
  vibrate,
  CURIOSOS_PALETTE,
  HIT_AREA_MIN_PX,
  SNAP_RADIUS_PX,
} from './shared';
import type { TtsTrack } from '@/lib/audio/tts-placeholder';

interface SceneParams {
  pairs: Array<{ left: string; right: string }>;
  title?: string;
  audioTracks?: TtsTrack[];
}

interface Slot {
  x: number;
  y: number;
  rightLabel: string;
  filled: boolean;
}

export default class DragToSnapScene extends Phaser.Scene {
  private params!: SceneParams;
  private startTime = 0;
  private snapped = 0;
  private slots: Slot[] = [];

  constructor() {
    super({ key: 'drag-to-snap' });
  }

  create(): void {
    defaultBackground(this);
    this.params = (this.registry.get('atomParams') as SceneParams) ?? {
      pairs: [{ left: '⚪', right: '⚪' }],
    };
    this.startTime = performance.now();
    addTitle(this, this.params.title ?? 'Arrasta pra juntar');
    playTracks(this.params.audioTracks);

    const { width, height } = this.scale;
    const pairs = this.params.pairs;

    // Lado direito: slots fixos (silhuetas) com leve opacidade
    const slotX = width * 0.75;
    const spacing = Math.min((height - 180) / (pairs.length + 1), 160);
    const slotStartY = 150 + spacing;

    pairs.forEach((pair, idx) => {
      const y = slotStartY + idx * spacing;
      const tex = makeLabelTexture(this, `slot-${idx}`, {
        label: pair.right,
        width: 160,
        height: 160,
        bgColor: '#F3F4F6',
        textColor: '#9CA3AF',
        fontSize: 56,
      });
      const slot = this.add.image(slotX, y, tex);
      slot.setAlpha(0.5);
      this.slots.push({ x: slotX, y, rightLabel: pair.right, filled: false });
      this.add
        .text(slotX, y + 100, pair.right, {
          fontFamily: 'Nunito, system-ui, sans-serif',
          fontSize: '14px',
          color: '#9CA3AF',
        })
        .setOrigin(0.5);
    });

    // Lado esquerdo: items arrastáveis
    const itemX = width * 0.25;
    pairs.forEach((pair, idx) => {
      const y = slotStartY + idx * spacing;
      const tex = makeLabelTexture(this, `item-${idx}`, {
        label: pair.left,
        width: 160,
        height: 160,
        bgColor: CURIOSOS_PALETTE.yellow,
        textColor: CURIOSOS_PALETTE.text,
        fontSize: 56,
      });
      const item = this.add.image(itemX, y, tex).setInteractive({ draggable: true, useHandCursor: true });
      item.setSize(Math.max(160, HIT_AREA_MIN_PX), Math.max(160, HIT_AREA_MIN_PX));
      this.add
        .text(itemX, y + 100, pair.left, {
          fontFamily: 'Nunito, system-ui, sans-serif',
          fontSize: '14px',
          color: CURIOSOS_PALETTE.text,
        })
        .setOrigin(0.5);

      // Garantir que tweens não atrapalhem o drag (lição aprendida)
      const homeX = itemX;
      const homeY = y;
      item.setData('home', { x: homeX, y: homeY });
      item.setData('pairRight', pair.right);

      item.on('dragstart', () => {
        this.tweens.killTweensOf(item);
      });
      item.on('drag', (_: Phaser.Input.Pointer, dragX: number, dragY: number) => {
        item.x = dragX;
        item.y = dragY;
      });
      item.on('dragend', () => {
        // Procura slot mais próximo dentro do raio
        let snapped: Slot | null = null;
        for (const slot of this.slots) {
          if (slot.filled) continue;
          const dist = Phaser.Math.Distance.Between(item.x, item.y, slot.x, slot.y);
          if (dist <= SNAP_RADIUS_PX && slot.rightLabel === pair.right) {
            snapped = slot;
            break;
          }
        }
        if (snapped) {
          snapped.filled = true;
          this.snapped++;
          item.disableInteractive();
          this.tweens.add({
            targets: item,
            x: snapped.x,
            y: snapped.y,
            duration: 200,
            ease: 'Cubic.easeOut',
          });
          void vibrate();
          if (this.snapped === this.params.pairs.length) {
            this.time.delayedCall(600, () => this.finish());
          }
        } else {
          // Volta saltitando
          this.tweens.add({
            targets: item,
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
      success: this.snapped >= this.params.pairs.length,
      durationMs: performance.now() - this.startTime,
      attempts: this.snapped,
      raw: { snapped: this.snapped, total: this.params.pairs.length },
    });
  }
}
