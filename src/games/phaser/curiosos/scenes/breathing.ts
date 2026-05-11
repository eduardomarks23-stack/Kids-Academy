// =============================================================
// BreathingScene — ciclos de respiração com flor
// =============================================================
// Cobre: respira devagar (Eixo 4 S6). Pode ser reusada via
// casinha (Folha Respirante) como mini-modo.
//
// Mecânica: flor cresce ao inspirar (3-4s) e encolhe ao expirar
// (4-5s). N ciclos.
//
// Config:
//   cycles?: number (default 3)
//   inhaleMs?: number (default 3500)
//   exhaleMs?: number (default 4500)
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
  CURIOSOS_PALETTE,
} from './shared';
import { getTtsPlaceholder, type TtsTrack } from '@/lib/audio/tts-placeholder';

interface SceneParams {
  cycles?: number;
  inhaleMs?: number;
  exhaleMs?: number;
  title?: string;
  audioTracks?: TtsTrack[];
}

export default class BreathingScene extends Phaser.Scene {
  private params!: SceneParams;
  private startTime = 0;
  private currentCycle = 0;
  private flower?: Phaser.GameObjects.Image;
  private instruction?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'breathing' });
  }

  create(): void {
    defaultBackground(this);
    this.params = (this.registry.get('atomParams') as SceneParams) ?? {};
    this.startTime = performance.now();
    addTitle(this, this.params.title ?? 'Respira comigo');
    playTracks(this.params.audioTracks);
    stopAudioOnShutdown(this);

    const { width, height } = this.scale;
    const tex = makeLabelTexture(this, 'flower', {
      label: '🌸',
      width: 200,
      height: 200,
      bgColor: '#FCE7F3',
      textColor: '#FFFFFF',
      fontSize: 120,
      rounded: 100,
    });
    this.flower = this.add.image(width / 2, height / 2, tex);
    this.flower.setScale(0.4);

    this.instruction = this.add
      .text(width / 2, height * 0.85, 'Pronto?', {
        fontFamily: 'Nunito, system-ui, sans-serif',
        fontSize: '26px',
        color: CURIOSOS_PALETTE.primary,
        fontStyle: '500',
      })
      .setOrigin(0.5);

    this.time.delayedCall(1200, () => this.nextCycle());
  }

  private nextCycle(): void {
    if (!this.flower || !this.instruction) return;
    const total = this.params.cycles ?? 3;
    if (this.currentCycle >= total) {
      this.finish();
      return;
    }
    this.currentCycle++;

    this.instruction.setText('Inspira pelo nariz...');
    void getTtsPlaceholder().play([
      { type: 'speech', speaker: 'garuzinho', text: 'Inspira pelo nariz...' },
    ]);

    this.tweens.add({
      targets: this.flower,
      scale: 1.5,
      duration: this.params.inhaleMs ?? 3500,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        this.instruction?.setText('Solta pela boca...');
        void getTtsPlaceholder().play([
          { type: 'speech', speaker: 'lolinha', text: 'Solta pela boca...' },
        ]);
        this.tweens.add({
          targets: this.flower,
          scale: 0.4,
          duration: this.params.exhaleMs ?? 4500,
          ease: 'Sine.easeInOut',
          onComplete: () => this.nextCycle(),
        });
      },
    });
  }

  private finish(): void {
    emitAtomComplete(this, {
      success: true,
      durationMs: performance.now() - this.startTime,
      attempts: this.currentCycle,
      raw: { cycles: this.currentCycle },
    });
  }
}
