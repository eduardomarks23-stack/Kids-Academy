// =============================================================
// ListenScreenScene — átomo tipo "listen" (sem vídeo real)
// =============================================================
// Renderiza cenário simples com Garuzinho e Lolinha (placeholders
// SVG-style desenhados em canvas), toca os tracks TTS sequenciais.
// Conclui automaticamente ao terminar a sequência de tracks.
//
// Quando vídeos reais existirem, este átomo pode ser migrado
// para o VideoAdapter sem mudar o seed (só trocar engine/config).
//
// Config:
//   title: string
//   audioTracks: TtsTrack[]
//   axisIndex?: number (cor de fundo varia por eixo)
// =============================================================

import Phaser from 'phaser';
import {
  emitAtomComplete,
  makeLabelTexture,
  CURIOSOS_PALETTE,
} from './shared';
import { getTtsPlaceholder, type TtsTrack } from '@/lib/audio/tts-placeholder';

interface SceneParams {
  title: string;
  audioTracks: TtsTrack[];
  axisIndex?: number;
}

const EIXO_TINTS: Record<number, string> = {
  1: '#FEF3C7', // amarelo claro (sons-letras)
  2: '#DBEAFE', // azul claro (contar-comparar)
  3: '#FCE7F3', // rosa claro (formas-cores)
  4: '#F3E8FF', // roxo claro (afetos)
};

export default class ListenScreenScene extends Phaser.Scene {
  private params!: SceneParams;
  private startTime = 0;
  private garu?: Phaser.GameObjects.Image;
  private lola?: Phaser.GameObjects.Image;
  private finished = false;

  constructor() {
    super({ key: 'listen-screen' });
  }

  create(): void {
    this.params = (this.registry.get('atomParams') as SceneParams) ?? {
      title: 'Ouve com a gente',
      audioTracks: [],
    };
    const tint = EIXO_TINTS[this.params.axisIndex ?? 1] ?? CURIOSOS_PALETTE.bg;
    this.cameras.main.setBackgroundColor(tint);
    this.startTime = performance.now();

    // Marca finished + para TTS quando cena é destruída (substitui
    // método shutdown() — Phaser não chama métodos custom, escuta evento)
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.finished = true;
      getTtsPlaceholder().stop();
    });
    this.events.once(Phaser.Scenes.Events.DESTROY, () => {
      this.finished = true;
      getTtsPlaceholder().stop();
    });

    const { width, height } = this.scale;

    // Título
    this.add
      .text(width / 2, 80, this.params.title, {
        fontFamily: 'Nunito, system-ui, sans-serif',
        fontSize: '36px',
        color: CURIOSOS_PALETTE.primary,
        fontStyle: '500',
      })
      .setOrigin(0.5);

    // Garuzinho (border collie filhote — placeholder)
    const garuTex = makeLabelTexture(this, 'garu-static', {
      label: '🐶',
      width: 200,
      height: 200,
      bgColor: '#FFFFFF',
      textColor: '#000000',
      fontSize: 140,
      rounded: 100,
    });
    this.garu = this.add.image(width * 0.3, height * 0.55, garuTex);

    // Lolinha (golden filhote — placeholder)
    const lolaTex = makeLabelTexture(this, 'lola-static', {
      label: '🐕',
      width: 200,
      height: 200,
      bgColor: '#FFFFFF',
      textColor: '#000000',
      fontSize: 140,
      rounded: 100,
    });
    this.lola = this.add.image(width * 0.7, height * 0.55, lolaTex);

    // Labels
    this.add
      .text(width * 0.3, height * 0.55 + 130, 'Garuzinho', {
        fontFamily: 'Nunito, system-ui, sans-serif',
        fontSize: '20px',
        color: CURIOSOS_PALETTE.text,
        fontStyle: '500',
      })
      .setOrigin(0.5);
    this.add
      .text(width * 0.7, height * 0.55 + 130, 'Lolinha', {
        fontFamily: 'Nunito, system-ui, sans-serif',
        fontSize: '20px',
        color: CURIOSOS_PALETTE.text,
        fontStyle: '500',
      })
      .setOrigin(0.5);

    // Animação "respirando" — escala suave
    this.tweens.add({
      targets: this.garu,
      scale: 1.05,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    this.tweens.add({
      targets: this.lola,
      scale: 1.05,
      duration: 1400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Inicia narração
    this.playNarration();

    // Badge "MODO DEV — áudio TTS"
    this.add
      .text(width - 20, height - 20, 'MODO DEV — áudio TTS', {
        fontFamily: 'Nunito, system-ui, sans-serif',
        fontSize: '12px',
        color: '#9CA3AF',
      })
      .setOrigin(1, 1);
  }

  private async playNarration(): Promise<void> {
    const tracks = this.params.audioTracks ?? [];
    if (tracks.length === 0) {
      this.time.delayedCall(2000, () => this.finish());
      return;
    }
    // Lampejos visuais para indicar quem está falando
    const tts = getTtsPlaceholder();
    // Toca em sequência e destaca o speaker atual
    for (const track of tracks) {
      if (this.finished) return;
      if (track.type === 'speech') {
        const target = track.speaker === 'garuzinho' ? this.garu : this.lola;
        if (target) {
          this.tweens.killTweensOf(target);
          this.tweens.add({ targets: target, scale: 1.15, duration: 250, yoyo: true });
        }
      }
      await tts.play([track]);
    }
    if (!this.finished) {
      this.time.delayedCall(800, () => this.finish());
    }
  }

  private finish(): void {
    if (this.finished) return;
    this.finished = true;
    emitAtomComplete(this, {
      success: true,
      durationMs: performance.now() - this.startTime,
      attempts: 1,
      raw: { tracksPlayed: this.params.audioTracks?.length ?? 0 },
    });
  }
}
