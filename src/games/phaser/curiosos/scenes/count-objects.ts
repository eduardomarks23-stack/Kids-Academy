// =============================================================
// CountObjectsScene — toque sequencial para contar objetos
// =============================================================
// Cobre: contar patinhos (Eixo 2 S1), dedinhos (S2), até cinco (S7),
// conta o que aparece (S7, S10).
//
// Config:
//   totalCount: number — quantos objetos por rodada
//   itemKey: string — chave do item ('patinho', 'estrela', etc.)
//   rounds?: number (default 1)
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
import { getTtsPlaceholder, type TtsTrack } from '@/lib/audio/tts-placeholder';

interface SceneParams {
  totalCount: number;
  itemKey: string;
  rounds?: number;
  title?: string;
  audioTracks?: TtsTrack[];
}

const ITEM_ICONS: Record<string, string[]> = {
  patinho: ['🦆'],
  pintinho: ['🐥'],
  dedinho: ['👆', '☝️', '👉', '👈', '👇'],
  estrela: ['⭐'],
  mistos: ['🍎', '⭐', '🎈', '🌸', '🐝', '🍓', '🚗'],
};

const NUMBER_WORDS = ['', 'UM', 'DOIS', 'TRÊS', 'QUATRO', 'CINCO', 'SEIS', 'SETE', 'OITO', 'NOVE', 'DEZ'];

export default class CountObjectsScene extends Phaser.Scene {
  private params!: SceneParams;
  private startTime = 0;
  private currentRound = 0;
  private tappedCount = 0;
  private totalRounds = 1;

  constructor() {
    super({ key: 'count-objects' });
  }

  create(): void {
    defaultBackground(this);
    this.params = (this.registry.get('atomParams') as SceneParams) ?? {
      totalCount: 3,
      itemKey: 'patinho',
    };
    this.totalRounds = this.params.rounds ?? 1;
    this.startTime = performance.now();
    addTitle(this, this.params.title ?? 'Conta!');
    playTracks(this.params.audioTracks);
    stopAudioOnShutdown(this);
    this.startRound();
  }

  private startRound(): void {
    if (this.currentRound >= this.totalRounds) {
      this.finish();
      return;
    }
    this.tappedCount = 0;

    // Limpa elementos da rodada anterior
    this.children.list
      .filter((c) => c.getData('roundEl') === true)
      .forEach((c) => c.destroy());

    const icons = ITEM_ICONS[this.params.itemKey] ?? ITEM_ICONS.mistos;
    const icon = icons[Math.floor(Math.random() * icons.length)];

    const { width, height } = this.scale;
    const total = this.params.totalCount;
    const cols = Math.min(total, 5);
    const cellW = Math.min(width / (cols + 0.5), 150);
    const cellH = 140;
    const startX = width / 2 - (cellW * (cols - 1)) / 2;
    const startY = height * 0.35;

    for (let i = 0; i < total; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * cellW;
      const y = startY + row * cellH;
      const tex = makeLabelTexture(this, `item-${i}`, {
        label: icon,
        width: 120,
        height: 120,
        bgColor: CURIOSOS_PALETTE.yellow,
        textColor: CURIOSOS_PALETTE.text,
        fontSize: 56,
      });
      const sprite = this.add.image(x, y, tex).setInteractive({ useHandCursor: true });
      sprite.setData('roundEl', true);
      sprite.setData('counted', false);

      sprite.on('pointerdown', () => {
        if (sprite.getData('counted')) return;
        sprite.setData('counted', true);
        this.tappedCount++;
        void vibrate();

        // Número flutuante
        const numText = this.add
          .text(x, y - 80, NUMBER_WORDS[this.tappedCount] ?? `${this.tappedCount}`, {
            fontFamily: 'Nunito, system-ui, sans-serif',
            fontSize: '32px',
            color: CURIOSOS_PALETTE.primary,
            fontStyle: '500',
          })
          .setOrigin(0.5);
        numText.setData('roundEl', true);
        this.tweens.add({
          targets: numText,
          y: y - 130,
          alpha: 0,
          duration: 800,
          onComplete: () => numText.destroy(),
        });

        // Voz
        void getTtsPlaceholder().play([
          { type: 'speech', speaker: 'garuzinho', text: NUMBER_WORDS[this.tappedCount] ?? `${this.tappedCount}` },
        ]);

        // Pulo do objeto
        this.tweens.add({
          targets: sprite,
          y: y - 20,
          duration: 150,
          yoyo: true,
        });

        if (this.tappedCount === total) {
          this.time.delayedCall(800, () => {
            this.currentRound++;
            this.startRound();
          });
        }
      });
    }
  }

  private finish(): void {
    emitAtomComplete(this, {
      success: true,
      durationMs: performance.now() - this.startTime,
      attempts: this.totalRounds,
      raw: { rounds: this.totalRounds, countPerRound: this.params.totalCount },
    });
  }
}
