// =============================================================
// CharacterEditorScene — customizar avatar
// =============================================================
// Cobre: faz a carinha feliz/triste/brava (Eixo 4 S1-S3), eu sou eu
// (S8), faz carinho no amiguinho (S5).
//
// Mecânica: avatar de cachorrinho com partes editáveis. Toque
// numa parte cicla entre opções. Quando atinge configuração
// "alvo" (mode=feliz, triste, etc), aciona feedback especial.
//
// Config:
//   targetEmotion?: 'feliz' | 'triste' | 'bravo'
//   mode?: 'avatar' | 'comfort'
//   minChanges?: number
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
} from './shared';
import type { TtsTrack } from '@/lib/audio/tts-placeholder';

interface SceneParams {
  targetEmotion?: 'feliz' | 'triste' | 'bravo';
  mode?: 'avatar' | 'comfort';
  minChanges?: number;
  title?: string;
  audioTracks?: TtsTrack[];
}

const EMOTION_STATES: Record<'feliz' | 'triste' | 'bravo' | 'neutro', { face: string; bg: string }> = {
  feliz: { face: '😀', bg: '#FCD34D' },
  triste: { face: '😢', bg: '#93C5FD' },
  bravo: { face: '😠', bg: '#FCA5A5' },
  neutro: { face: '😐', bg: '#E5E7EB' },
};

export default class CharacterEditorScene extends Phaser.Scene {
  private params!: SceneParams;
  private startTime = 0;
  private currentEmotion: 'feliz' | 'triste' | 'bravo' | 'neutro' = 'neutro';
  private cycleOrder: Array<'feliz' | 'triste' | 'bravo' | 'neutro'> = ['neutro', 'feliz', 'triste', 'bravo'];
  private changes = 0;
  private avatar?: Phaser.GameObjects.Image;
  private label?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'character-editor' });
  }

  create(): void {
    defaultBackground(this);
    this.params = (this.registry.get('atomParams') as SceneParams) ?? {};
    this.startTime = performance.now();
    addTitle(this, this.params.title ?? 'Faz a carinha');
    playTracks(this.params.audioTracks);

    const { width, height } = this.scale;
    this.refreshAvatar(width / 2, height * 0.5);

    // Instrução
    this.add
      .text(width / 2, height * 0.85, 'Toca pra trocar a carinha', {
        fontFamily: 'Nunito, system-ui, sans-serif',
        fontSize: '18px',
        color: CURIOSOS_PALETTE.text,
      })
      .setOrigin(0.5);
  }

  private refreshAvatar(x: number, y: number): void {
    const state = EMOTION_STATES[this.currentEmotion];
    if (this.avatar) this.avatar.destroy();
    if (this.label) this.label.destroy();

    const tex = makeLabelTexture(this, `avatar-${this.currentEmotion}`, {
      label: state.face,
      width: 260,
      height: 260,
      bgColor: state.bg,
      textColor: '#FFFFFF',
      fontSize: 140,
      rounded: 130,
    });
    this.avatar = this.add.image(x, y, tex).setInteractive({ useHandCursor: true });
    this.avatar.setSize(Math.max(260, HIT_AREA_MIN_PX), Math.max(260, HIT_AREA_MIN_PX));

    this.label = this.add
      .text(x, y + 170, this.currentEmotion.toUpperCase(), {
        fontFamily: 'Nunito, system-ui, sans-serif',
        fontSize: '32px',
        color: CURIOSOS_PALETTE.primary,
        fontStyle: '500',
      })
      .setOrigin(0.5);

    this.avatar.on('pointerdown', () => {
      this.changes++;
      void vibrate();
      const currentIdx = this.cycleOrder.indexOf(this.currentEmotion);
      this.currentEmotion = this.cycleOrder[(currentIdx + 1) % this.cycleOrder.length];
      this.refreshAvatar(x, y);

      const target = this.params.targetEmotion;
      const minChanges = this.params.minChanges ?? 3;

      // Caso modo avatar: completa após N trocas
      if (this.params.mode === 'avatar' && this.changes >= minChanges) {
        this.time.delayedCall(700, () => this.finish());
        return;
      }
      // Caso modo comfort: qualquer 3 toques basta
      if (this.params.mode === 'comfort' && this.changes >= 3) {
        this.time.delayedCall(700, () => this.finish());
        return;
      }
      // Caso targetEmotion: completa quando atingir alvo
      if (target && this.currentEmotion === target && this.changes >= 1) {
        this.tweens.add({
          targets: this.avatar,
          scale: 1.15,
          duration: 200,
          yoyo: true,
          repeat: 1,
          onComplete: () => this.finish(),
        });
      }
    });
  }

  private finish(): void {
    emitAtomComplete(this, {
      success: true,
      durationMs: performance.now() - this.startTime,
      attempts: this.changes,
      raw: { finalEmotion: this.currentEmotion, changes: this.changes },
    });
  }
}
