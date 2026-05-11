// =============================================================
// CelebrateScene — celebração + colecionável
// =============================================================
// Renderiza Garuzinho + Lolinha festejando, confete sutil, e
// apresenta o colecionável que vai pra casinha.
//
// Config:
//   collectibleSlug: string
//   collectibleDisplayName: string
// =============================================================

import Phaser from 'phaser';
import {
  defaultBackground,
  emitAtomComplete,
  makeLabelTexture,
  playTracks,
  stopAudioOnShutdown,
  CURIOSOS_PALETTE,
  makeBigButton,
} from './shared';
import type { TtsTrack } from '@/lib/audio/tts-placeholder';

interface SceneParams {
  collectibleSlug: string;
  collectibleDisplayName: string;
  audioTracks?: TtsTrack[];
}

const COLLECTIBLE_ICONS: Record<string, string> = {
  'tatuzinho-tatactaque': '🐀',
  'campainha-din-don': '🔔',
  'galinha-co-co-ri': '🐔',
  'passarinho-ri-ri': '🐦',
  'patinho-rimador': '🦆',
  'abelhinha-a': '🐝',
  'elefantinho-e': '🐘',
  'ilhota-i': '🏝️',
  'ovinho-o': '🥚',
  'ursinho-u': '🐻',
  'trio-patinho': '🦆',
  'maozinha-do-5': '🖐️',
  'cestinha-cheia': '🧺',
  'duo-tamanho': '🐘',
  'copinho-cheio': '🥛',
  'gemeos-felizes': '👯',
  'estrelinha-5': '⭐',
  'cesto-mais': '🧺',
  'cesto-menos': '🧺',
  'dezena-amiga': '🔟',
  'tomatinho-vermelho': '🍅',
  'peixinho-azul': '🐟',
  'solzinho-amarelo': '☀️',
  'sapinho-verde': '🐸',
  'arco-iris': '🌈',
  'bolinha-rolante': '⚪',
  'caixinha-quadrada': '📦',
  'pizza-triangular': '🍕',
  'encaixador-mestre': '🧩',
  'detetive-padrao': '🕵️',
  'sol-sorriso': '☀️',
  'nuvenzinha-acolhe': '☁️',
  'leaozinho-passa': '🦁',
  'coracao-brilhante': '💖',
  'mao-amiga': '🤝',
  'folha-respirante': '🍃',
  'sininho-ajuda': '🔔',
  'espelhinho-eu': '🪞',
};

export default class CelebrateScene extends Phaser.Scene {
  private params!: SceneParams;
  private startTime = 0;
  private finished = false;

  constructor() {
    super({ key: 'celebrate' });
  }

  create(): void {
    defaultBackground(this);
    this.params = (this.registry.get('atomParams') as SceneParams) ?? {
      collectibleSlug: 'unknown',
      collectibleDisplayName: 'Amigo Novo',
    };
    this.startTime = performance.now();
    playTracks(this.params.audioTracks);
    stopAudioOnShutdown(this);

    const { width, height } = this.scale;

    // Cabeçalho
    this.add
      .text(width / 2, 80, 'VOCÊ CONSEGUIU!', {
        fontFamily: 'Nunito, system-ui, sans-serif',
        fontSize: '48px',
        color: CURIOSOS_PALETTE.primary,
        fontStyle: '500',
      })
      .setOrigin(0.5);

    // Confete sutil — 8 partículas
    for (let i = 0; i < 8; i++) {
      const colors = [CURIOSOS_PALETTE.primary, CURIOSOS_PALETTE.yellow, CURIOSOS_PALETTE.pink];
      const color = colors[i % colors.length];
      const colorNum = Phaser.Display.Color.HexStringToColor(color).color;
      const c = this.add.circle(
        Math.random() * width,
        -20,
        12,
        colorNum,
        0.85,
      );
      this.tweens.add({
        targets: c,
        y: height + 50,
        x: c.x + (Math.random() * 100 - 50),
        rotation: Math.PI * 2,
        duration: 2500 + Math.random() * 1000,
        ease: 'Sine.easeIn',
      });
    }

    // Colecionável grande no centro
    const icon = COLLECTIBLE_ICONS[this.params.collectibleSlug] ?? '✨';
    const tex = makeLabelTexture(this, `collectible-${this.params.collectibleSlug}`, {
      label: icon,
      width: 240,
      height: 240,
      bgColor: CURIOSOS_PALETTE.yellow,
      textColor: '#FFFFFF',
      fontSize: 140,
      rounded: 120,
    });
    const sprite = this.add.image(width / 2, height / 2, tex);
    sprite.setScale(0);
    this.tweens.add({
      targets: sprite,
      scale: 1,
      duration: 600,
      ease: 'Back.easeOut',
    });

    this.add
      .text(width / 2, height / 2 + 160, this.params.collectibleDisplayName, {
        fontFamily: 'Nunito, system-ui, sans-serif',
        fontSize: '32px',
        color: CURIOSOS_PALETTE.text,
        fontStyle: '500',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + 200, 'foi pra sua casinha!', {
        fontFamily: 'Nunito, system-ui, sans-serif',
        fontSize: '20px',
        color: CURIOSOS_PALETTE.text,
      })
      .setOrigin(0.5);

    // Botões: Próxima!
    this.time.delayedCall(2500, () => {
      if (this.finished) return;
      makeBigButton(this, width / 2, height - 100, 'Próxima!', () => this.finish(), {
        bgColor: CURIOSOS_PALETTE.primary,
        width: 240,
        height: 100,
      });
    });

    // Auto-avança após 8s
    this.time.delayedCall(8000, () => {
      if (!this.finished) this.finish();
    });
  }

  private finish(): void {
    if (this.finished) return;
    this.finished = true;
    emitAtomComplete(this, {
      success: true,
      durationMs: performance.now() - this.startTime,
      attempts: 1,
      raw: { collectibleSlug: this.params.collectibleSlug },
    });
  }
}
