// =============================================================
// BinaryChoiceScene — escolha entre 2 opções por rodada
// =============================================================
// Cobre: combina/não combina (Eixo 1 S4 rima), onde tem mais/menos
// (Eixo 2 S8-S9), cheio/vazio, grande/pequeno, mistura de cores,
// padrão ABAB.
//
// Config:
//   rounds: Array<{
//     prompt?: string, promptSfx?: string,
//     options: [string, string], answer: string
//   }>
//   title?: string
// =============================================================

import Phaser from 'phaser';
import {
  addTitle,
  defaultBackground,
  emitAtomComplete,
  makeBigButton,
  playTracks,
  vibrate,
  CURIOSOS_PALETTE,
} from './shared';
import { getTtsPlaceholder, type TtsTrack } from '@/lib/audio/tts-placeholder';

interface Round {
  prompt?: string;
  promptSfx?: string;
  options: string[]; // exatamente 2
  answer: string;
}

interface SceneParams {
  rounds: Round[];
  title?: string;
  audioTracks?: TtsTrack[];
}

export default class BinaryChoiceScene extends Phaser.Scene {
  private params!: SceneParams;
  private startTime = 0;
  private currentRound = 0;
  private correctCount = 0;
  private attempts = 0;

  constructor() {
    super({ key: 'binary-choice' });
  }

  create(): void {
    defaultBackground(this);
    this.params = (this.registry.get('atomParams') as SceneParams) ?? { rounds: [] };
    this.startTime = performance.now();
    addTitle(this, this.params.title ?? 'Escolhe!');
    playTracks(this.params.audioTracks);
    this.showRound();
  }

  private showRound(): void {
    if (this.currentRound >= this.params.rounds.length) {
      this.finish();
      return;
    }
    const round = this.params.rounds[this.currentRound];
    const { width, height } = this.scale;

    // Limpa elementos da rodada anterior (preserva título)
    this.children.list
      .filter((c) => c.getData('roundEl') === true)
      .forEach((c) => c.destroy());

    const prompt = this.add
      .text(width / 2, 160, round.prompt ?? '...', {
        fontFamily: 'Nunito, system-ui, sans-serif',
        fontSize: '24px',
        color: CURIOSOS_PALETTE.text,
        wordWrap: { width: width - 60 },
        align: 'center',
      })
      .setOrigin(0.5);
    prompt.setData('roundEl', true);

    if (round.promptSfx) {
      void getTtsPlaceholder().play([{ type: 'sfx', sfxKey: round.promptSfx }]);
    }

    const btnY = height * 0.55;
    const offsets = [-width * 0.22, width * 0.22];
    const colors = [CURIOSOS_PALETTE.blue, CURIOSOS_PALETTE.pink];

    round.options.forEach((option, idx) => {
      const btn = makeBigButton(this, width / 2 + offsets[idx], btnY, option, () => {
        this.attempts++;
        if (option === round.answer) {
          this.correctCount++;
          void vibrate();
          this.tweens.add({
            targets: btn,
            scale: 1.15,
            duration: 200,
            yoyo: true,
            onComplete: () => {
              this.currentRound++;
              this.showRound();
            },
          });
        } else {
          this.tweens.add({ targets: btn, x: btn.x - 6, duration: 60, yoyo: true, repeat: 2 });
        }
      }, { bgColor: colors[idx], width: 220, height: 110 });
      btn.setData('roundEl', true);
    });
  }

  private finish(): void {
    const accuracy = this.correctCount / Math.max(this.params.rounds.length, 1);
    emitAtomComplete(this, {
      success: accuracy >= 0.5,
      durationMs: performance.now() - this.startTime,
      attempts: this.attempts,
      raw: { correctCount: this.correctCount, totalRounds: this.params.rounds.length },
    });
  }
}
