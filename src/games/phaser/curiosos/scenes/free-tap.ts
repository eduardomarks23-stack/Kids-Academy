// =============================================================
// FreeTapScene — toque livre, causa-efeito puro (play)
// =============================================================
// Cada toque na tela: partícula colorida + SFX aleatório.
// Botão "Pronto!" no canto superior direito (criança escolhe sair).
// Critério: ≥ minTaps toques antes de finalizar.
//
// Config:
//   randomSfx: string[]
//   particleColors: string[]
//   minTaps?: number (default 5)
//   title?: string
// =============================================================

import Phaser from 'phaser';
import {
  addTitle,
  defaultBackground,
  emitAtomComplete,
  makeBigButton,
  playTracks,
  stopAudioOnShutdown,
  vibrate,
  CURIOSOS_PALETTE,
} from './shared';
import { getTtsPlaceholder, type TtsTrack } from '@/lib/audio/tts-placeholder';

interface SceneParams {
  randomSfx: string[];
  particleColors: string[];
  minTaps?: number;
  title?: string;
  audioTracks?: TtsTrack[];
}

export default class FreeTapScene extends Phaser.Scene {
  private params!: SceneParams;
  private taps = 0;
  private startTime = 0;
  private doneBtn?: Phaser.GameObjects.Image;

  constructor() {
    super({ key: 'free-tap' });
  }

  create(): void {
    defaultBackground(this);
    this.params = (this.registry.get('atomParams') as SceneParams) ?? {
      randomSfx: ['palma'],
      particleColors: ['#E26B45'],
    };
    this.startTime = performance.now();
    addTitle(this, this.params.title ?? 'Toque livre');
    playTracks(this.params.audioTracks);
    stopAudioOnShutdown(this);

    const { width, height } = this.scale;
    // Área tocável: todo o canvas exceto a barra superior
    const zone = this.add.zone(0, 100, width, height - 100).setOrigin(0, 0);
    zone.setInteractive();
    zone.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.spawnParticle(pointer.x, pointer.y);
      this.playRandomSfx();
      this.taps++;
      void vibrate();
      if (this.taps === (this.params.minTaps ?? 5)) {
        // Aparece botão "Pronto!" pulsante depois do mínimo
        this.showDoneButton();
      }
    });
  }

  private spawnParticle(x: number, y: number): void {
    const palette = this.params.particleColors;
    const color = palette[Math.floor(Math.random() * palette.length)];
    const colorNum = Phaser.Display.Color.HexStringToColor(color).color;
    const circle = this.add.circle(x, y, 30, colorNum, 0.8);
    this.tweens.add({
      targets: circle,
      scale: 3,
      alpha: 0,
      duration: 700,
      onComplete: () => circle.destroy(),
    });
  }

  private playRandomSfx(): void {
    const sfx = this.params.randomSfx;
    if (sfx.length === 0) return;
    const key = sfx[Math.floor(Math.random() * sfx.length)];
    void getTtsPlaceholder().play([{ type: 'sfx', sfxKey: key }]);
  }

  private showDoneButton(): void {
    if (this.doneBtn) return;
    const { width } = this.scale;
    this.doneBtn = makeBigButton(this, width - 120, 60, 'Pronto!', () => this.finish(), {
      bgColor: CURIOSOS_PALETTE.green,
      width: 200,
      height: 80,
    });
    this.tweens.add({
      targets: this.doneBtn,
      scale: 1.08,
      yoyo: true,
      repeat: -1,
      duration: 700,
    });
  }

  private finish(): void {
    emitAtomComplete(this, {
      success: true,
      durationMs: performance.now() - this.startTime,
      attempts: this.taps,
      raw: { taps: this.taps },
    });
  }
}
