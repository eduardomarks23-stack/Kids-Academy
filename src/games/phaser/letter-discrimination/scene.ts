// =============================================================
// LetterDiscriminationScene
// =============================================================
// "Toque na letra que NÃO é a X" — exercício de discriminação.
// Útil depois de recognition: força atenção à forma.
// =============================================================

import Phaser from 'phaser';
import type { AtomResult } from '@/types/domain';

interface SceneParams {
  targetLetter: string;
  options: string[]; // 4 letras, sendo (rounds-1) iguais a target e 1 diferente
  rounds: number;
}

export default class LetterDiscriminationScene extends Phaser.Scene {
  private params!: SceneParams;
  private currentRound = 0;
  private startTime = 0;
  private attempts = 0;
  private correctCount = 0;

  constructor() {
    super({ key: 'letter-discrimination' });
  }

  create(): void {
    const raw = this.registry.get('atomParams') as Partial<SceneParams> | null;
    this.params = {
      targetLetter: raw?.targetLetter ?? 'A',
      options: raw?.options ?? ['A', 'A', 'A', 'O'],
      rounds: raw?.rounds ?? 3,
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
        height * 0.16,
        `Achou a diferente?`,
        {
          fontFamily: 'Nunito, system-ui, sans-serif',
          fontSize: '32px',
          color: '#5B21B6',
          fontStyle: '500',
        },
      )
      .setOrigin(0.5);
    this.add
      .text(
        width / 2,
        height * 0.24,
        `Toque na letra que não é ${this.params.targetLetter}`,
        {
          fontFamily: 'Nunito, system-ui, sans-serif',
          fontSize: '20px',
          color: '#6B7280',
        },
      )
      .setOrigin(0.5);

    const options = [...this.params.options];
    Phaser.Utils.Array.Shuffle(options);
    const baseY = height * 0.6;
    const spacing = Math.min(width / (options.length + 1), 130);
    const startX = width / 2 - (spacing * (options.length - 1)) / 2;

    options.forEach((letter, idx) => {
      this.spawnLetter(letter, startX + idx * spacing, baseY);
    });
  }

  private spawnLetter(letter: string, x: number, y: number): void {
    const tex = this.makeLetterTexture(letter);
    const img = this.add.image(x, y, tex).setInteractive({ useHandCursor: true });
    const minHit = 80;
    img.setSize(Math.max(img.width, minHit), Math.max(img.height, minHit));

    img.on('pointerdown', () => {
      this.attempts++;
      const isCorrect = letter !== this.params.targetLetter;
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

  private makeLetterTexture(letter: string): string {
    const key = `disc-letter-${letter}-${Date.now()}-${Math.random()}`;
    const canvas = this.textures.createCanvas(key, 128, 160);
    if (!canvas) return key;
    const ctx = canvas.getContext();
    ctx.fillStyle = '#E0E7FF';
    ctx.beginPath();
    ctx.roundRect(0, 0, 128, 160, 24);
    ctx.fill();
    ctx.fillStyle = '#5B21B6';
    ctx.font =
      '500 96px Nunito, "Helvetica Neue", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, 64, 80);
    canvas.refresh();
    return key;
  }

  private finishAtom(): void {
    const durationMs = performance.now() - this.startTime;
    const score = this.correctCount / Math.max(this.params.rounds, 1);
    const success = score >= 0.7;
    this.game.events.emit('atom:complete', {
      success,
      durationMs,
      attempts: this.attempts,
      difficultyLevel: 2,
      conceptsScored: [],
      raw: { rounds: this.params.rounds, correctCount: this.correctCount },
    } satisfies AtomResult);
  }
}
