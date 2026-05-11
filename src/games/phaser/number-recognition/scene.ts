// =============================================================
// NumberRecognitionScene
// =============================================================
// Toque no número correto entre N distratores. Mesmos princípios
// de hit area, feedback positivo/negativo, conceito-score que a
// LetterRecognitionScene.
// =============================================================

import Phaser from 'phaser';
import type { AtomResult } from '@/types/domain';

interface SceneParams {
  targetNumber: number;
  distractors: number[];
  rounds: number;
  conceptSlug?: string; // ex: 'numero-3'
}

export default class NumberRecognitionScene extends Phaser.Scene {
  private params!: SceneParams;
  private currentRound = 0;
  private startTime = 0;
  private attempts = 0;
  private correctCount = 0;

  constructor() {
    super({ key: 'number-recognition' });
  }

  create(): void {
    const raw = this.registry.get('atomParams') as Partial<SceneParams> | null;
    this.params = {
      targetNumber: raw?.targetNumber ?? 3,
      distractors: raw?.distractors ?? [1, 2, 5],
      rounds: raw?.rounds ?? 3,
      conceptSlug: raw?.conceptSlug,
    };
    this.startTime = performance.now();
    this.nextRound();
  }

  private nextRound(): void {
    this.cameras.main.setBackgroundColor('#FFFFFF');
    this.children.removeAll(true);
    const { width, height } = this.scale;

    this.add
      .text(
        width / 2,
        height * 0.18,
        `Toque no número ${this.params.targetNumber}`,
        {
          fontFamily: 'Nunito, system-ui, sans-serif',
          fontSize: '36px',
          color: '#5B21B6',
          fontStyle: '500',
        },
      )
      .setOrigin(0.5);

    const distractors = this.params.distractors.slice(0, 3);
    const options = [this.params.targetNumber, ...distractors];
    Phaser.Utils.Array.Shuffle(options);

    const baseY = height * 0.55;
    const spacing = Math.min(width / (options.length + 1), 140);
    const startX = width / 2 - (spacing * (options.length - 1)) / 2;

    options.forEach((n, idx) => {
      this.spawnNumber(n, startX + idx * spacing, baseY);
    });
  }

  private spawnNumber(num: number, x: number, y: number): void {
    const tex = this.makeNumberTexture(num);
    const img = this.add.image(x, y, tex).setInteractive({ useHandCursor: true });
    const minHit = 80;
    img.setSize(Math.max(img.width, minHit), Math.max(img.height, minHit));

    img.on('pointerdown', () => {
      this.attempts++;
      const isCorrect = num === this.params.targetNumber;
      if (isCorrect) {
        this.correctCount++;
        this.tweens.add({
          targets: img,
          scale: 1.2,
          duration: 200,
          yoyo: true,
          onComplete: () => {
            this.currentRound++;
            if (this.currentRound >= this.params.rounds) {
              this.finishAtom();
            } else {
              this.nextRound();
            }
          },
        });
      } else {
        this.tweens.add({
          targets: img,
          x: x - 6,
          duration: 60,
          yoyo: true,
          repeat: 2,
        });
      }
    });
  }

  private makeNumberTexture(n: number): string {
    const key = `num-${n}-${Date.now()}`;
    const canvas = this.textures.createCanvas(key, 128, 160);
    if (!canvas) return key;
    const ctx = canvas.getContext();
    // Cor diferente por número para reforço sensorial
    const palette = ['#FCD34D', '#A7F3D0', '#BFDBFE', '#FBCFE8', '#FDE68A'];
    ctx.fillStyle = palette[n % palette.length];
    ctx.beginPath();
    ctx.roundRect(0, 0, 128, 160, 24);
    ctx.fill();
    ctx.fillStyle = '#5B21B6';
    ctx.font =
      '500 96px Nunito, "Helvetica Neue", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(n), 64, 80);
    canvas.refresh();
    return key;
  }

  private finishAtom(): void {
    const durationMs = performance.now() - this.startTime;
    const score = this.correctCount / Math.max(this.params.rounds, 1);
    const success = score >= 0.7;
    const result: AtomResult = {
      success,
      durationMs,
      attempts: this.attempts,
      difficultyLevel: 1,
      conceptsScored: this.params.conceptSlug
        ? [{ conceptId: this.params.conceptSlug, score }]
        : [],
      raw: { rounds: this.params.rounds, correctCount: this.correctCount },
    };
    this.game.events.emit('atom:complete', result);
  }
}
