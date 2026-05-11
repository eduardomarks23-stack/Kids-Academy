// =============================================================
// LetterRecognitionScene
// =============================================================
// Átomo recognition: criança toca na letra correta entre N
// distratores. Lições aprendidas:
//   - Hit area >= 64px (toques imprecisos de crianças)
//   - Letras desenhadas direto na textura (Canvas API) para
//     drag/click ter hit detection precisa.
//   - Tolerância generosa: raio do alvo × 1.4
// =============================================================

import Phaser from 'phaser';
import type { AtomResult } from '@/types/domain';

interface SceneParams {
  targetLetter: string;
  distractors: string[];
  rounds: number;
}

export default class LetterRecognitionScene extends Phaser.Scene {
  private params!: SceneParams;
  private currentRound = 0;
  private startTime = 0;
  private attempts = 0;
  private correctCount = 0;

  constructor() {
    super({ key: 'letter-recognition' });
  }

  create(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.params = (this.registry.get('atomParams') as any) ?? {
      targetLetter: 'A',
      distractors: ['B', 'O', 'I'],
      rounds: 3,
    };
    this.startTime = performance.now();
    this.nextRound();
  }

  private nextRound(): void {
    this.cameras.main.setBackgroundColor('#FFFFFF');
    this.children.removeAll(true);

    const { width, height } = this.scale;

    // Pergunta no topo
    this.add
      .text(width / 2, height * 0.18, `Toque na letra ${this.params.targetLetter}`, {
        fontFamily: 'Nunito, system-ui, sans-serif',
        fontSize: '36px',
        color: '#5B21B6',
        fontStyle: '500',
      })
      .setOrigin(0.5);

    // Embaralha [target, ...distractors.slice(0,3)]
    const distractors = this.params.distractors.slice(0, 3);
    const options = [this.params.targetLetter, ...distractors];
    Phaser.Utils.Array.Shuffle(options);

    const baseY = height * 0.55;
    const spacing = Math.min(width / (options.length + 1), 140);
    const startX = width / 2 - (spacing * (options.length - 1)) / 2;

    options.forEach((letter, idx) => {
      const x = startX + idx * spacing;
      this.spawnLetter(letter, x, baseY);
    });
  }

  private spawnLetter(letter: string, x: number, y: number): void {
    // Renderiza letra em canvas dedicado para hit detection precisa
    const tex = this.makeLetterTexture(letter);
    const img = this.add
      .image(x, y, tex)
      .setInteractive({ useHandCursor: true });

    // Hit area mínima 64px (lição aprendida)
    const minHit = 80;
    img.setSize(Math.max(img.width, minHit), Math.max(img.height, minHit));

    img.on('pointerdown', () => {
      this.attempts++;
      const isCorrect = letter === this.params.targetLetter;
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
        // Feedback negativo sutil — sem punição
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
    const key = `letter-${letter}-${Date.now()}`;
    const canvas = this.textures.createCanvas(key, 128, 160);
    if (!canvas) {
      // Fallback: cria via documento mesmo
      return key;
    }
    const ctx = canvas.getContext();
    ctx.fillStyle = '#FCD34D';
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
    const success =
      this.correctCount / Math.max(this.params.rounds, 1) >= 0.7;

    const result: AtomResult = {
      success,
      durationMs,
      attempts: this.attempts,
      difficultyLevel: 1,
      conceptsScored: [
        {
          conceptId: 'letra-a', // TODO: passar conceptId real via params
          score: this.correctCount / Math.max(this.params.rounds, 1),
        },
      ],
      raw: {
        rounds: this.params.rounds,
        correctCount: this.correctCount,
      },
    };

    this.game.events.emit('atom:complete', result);
  }
}
