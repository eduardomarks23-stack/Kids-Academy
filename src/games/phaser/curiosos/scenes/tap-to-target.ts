// =============================================================
// TapToTargetScene — toque em alvos específicos
// =============================================================
// Cobre: imitate em Eixo 1 (S1, S6-S10 — toque em letra), Eixo 3
// (S1-S4 — toca na cor X, S6-S8 — toca na forma X).
//
// Config esperada (atomParams):
//   prompts: Array<{ label, icon, isTarget?, color?, shape? }>
//   targetLabel?: string
//   targetColor?: string
//   targetShape?: string
//   title?: string
//   mode?: 'sequential' | 'pick-all'
// =============================================================

import Phaser from 'phaser';
import {
  addTitle,
  defaultBackground,
  emitAtomComplete,
  makeLabelTexture,
  CURIOSOS_PALETTE,
  playTracks,
  stopAudioOnShutdown,
  vibrate,
} from './shared';
import type { TtsTrack } from '@/lib/audio/tts-placeholder';

interface Prompt {
  label: string;
  icon: string;
  isTarget?: boolean;
  color?: string;
  shape?: string;
  sfxKey?: string;
}

interface SceneParams {
  prompts: Prompt[];
  targetLabel?: string;
  targetColor?: string;
  targetShape?: string;
  title?: string;
  mode?: 'sequential' | 'pick-all';
  audioTracks?: TtsTrack[];
}

const COLOR_HEX: Record<string, string> = {
  red: '#EF4444',
  blue: '#60A5FA',
  yellow: '#FCD34D',
  green: '#34D399',
  orange: '#FB923C',
  purple: '#A78BFA',
  pink: '#F472B6',
};

export default class TapToTargetScene extends Phaser.Scene {
  private params!: SceneParams;
  private startTime = 0;
  private correctTaps = 0;
  private wrongTaps = 0;
  private targets: Phaser.GameObjects.Image[] = [];

  constructor() {
    super({ key: 'tap-to-target' });
  }

  create(): void {
    defaultBackground(this);
    this.params = (this.registry.get('atomParams') as SceneParams) ?? {
      prompts: [{ label: 'A', icon: 'A', isTarget: true }],
    };
    this.startTime = performance.now();
    addTitle(this, this.params.title ?? 'Toca no alvo');
    playTracks(this.params.audioTracks);
    stopAudioOnShutdown(this);

    const { width, height } = this.scale;
    const cols = Math.min(this.params.prompts.length, 4);
    const cellW = Math.min(width / (cols + 0.5), 200);
    const startX = width / 2 - (cellW * (cols - 1)) / 2;
    const y = height * 0.55;

    this.params.prompts.forEach((prompt, idx) => {
      const x = startX + idx * cellW;
      const isTarget = this.isTarget(prompt);
      const bg = prompt.color
        ? COLOR_HEX[prompt.color] ?? CURIOSOS_PALETTE.yellow
        : CURIOSOS_PALETTE.yellow;
      const tex = makeLabelTexture(this, `prompt-${idx}-${prompt.label}`, {
        label: prompt.icon,
        width: 160,
        height: 160,
        bgColor: bg,
        textColor: CURIOSOS_PALETTE.text,
        fontSize: 64,
      });
      const img = this.add.image(x, y, tex).setInteractive({ useHandCursor: true });
      this.add
        .text(x, y + 100, prompt.label, {
          fontFamily: 'Nunito, system-ui, sans-serif',
          fontSize: '20px',
          color: CURIOSOS_PALETTE.text,
        })
        .setOrigin(0.5);

      img.on('pointerdown', () => {
        void vibrate();
        if (isTarget) {
          this.correctTaps++;
          this.targets.push(img);
          this.tweens.add({
            targets: img,
            scale: 1.25,
            duration: 200,
            yoyo: true,
          });
          this.checkComplete();
        } else {
          this.wrongTaps++;
          // sem punição — só balança
          this.tweens.add({
            targets: img,
            x: x - 5,
            duration: 60,
            yoyo: true,
            repeat: 2,
            onComplete: () => img.setX(x),
          });
        }
      });
    });
  }

  private isTarget(p: Prompt): boolean {
    if (typeof p.isTarget === 'boolean') return p.isTarget;
    if (this.params.targetLabel) return p.label === this.params.targetLabel;
    if (this.params.targetColor) return p.color === this.params.targetColor;
    if (this.params.targetShape) return p.shape === this.params.targetShape;
    return false;
  }

  private totalTargets(): number {
    return this.params.prompts.filter((p) => this.isTarget(p)).length;
  }

  private checkComplete(): void {
    if (this.correctTaps >= this.totalTargets()) {
      this.time.delayedCall(500, () => this.finish());
    }
  }

  private finish(): void {
    const total = this.totalTargets();
    const durationMs = performance.now() - this.startTime;
    emitAtomComplete(this, {
      success: this.correctTaps >= total,
      durationMs,
      attempts: this.correctTaps + this.wrongTaps,
      raw: { correctTaps: this.correctTaps, wrongTaps: this.wrongTaps },
    });
  }
}
