// =============================================================
// Cenas Curiosos — helpers compartilhados
// =============================================================
// Hit area mínima 80px (Curiosos), snap radius 80px,
// paleta coral/amarelo/azul/verde/rosa.
// =============================================================

import Phaser from 'phaser';
import type { AtomResult } from '@/types/domain';
import { getTtsPlaceholder, type TtsTrack } from '@/lib/audio/tts-placeholder';

export const CURIOSOS_PALETTE = {
  bg: '#FFFCF7',
  primary: '#E26B45', // coral
  yellow: '#FCD34D',
  blue: '#60A5FA',
  green: '#34D399',
  pink: '#F472B6',
  purple: '#A78BFA',
  text: '#1F2937',
};

export const HIT_AREA_MIN_PX = 80;
export const SNAP_RADIUS_PX = 80;

export interface AtomParamsBase {
  title?: string;
  audioTracks?: TtsTrack[];
}

/**
 * Cria textura colorida com texto/emoji centralizado.
 * Não usa Phaser.Text para evitar bugs de emoji rendering.
 */
export function makeLabelTexture(
  scene: Phaser.Scene,
  key: string,
  options: {
    label: string;
    width?: number;
    height?: number;
    bgColor?: string;
    textColor?: string;
    fontSize?: number;
    rounded?: number;
  },
): string {
  const {
    label,
    width = 160,
    height = 160,
    bgColor = CURIOSOS_PALETTE.yellow,
    textColor = CURIOSOS_PALETTE.text,
    fontSize = 56,
    rounded = 24,
  } = options;

  // Evita colisão de keys reutilizando os mesmos prefixos
  const uniqueKey = `${key}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  if (scene.textures.exists(uniqueKey)) return uniqueKey;
  const tex = scene.textures.createCanvas(uniqueKey, width, height);
  if (!tex) return uniqueKey;
  const ctx = tex.getContext();
  ctx.fillStyle = bgColor;
  ctx.beginPath();
  // roundRect pode não existir em todas as plataformas — usar fallback
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(0, 0, width, height, rounded);
  } else {
    ctx.rect(0, 0, width, height);
  }
  ctx.fill();
  ctx.fillStyle = textColor;
  // Fonte com fallback explícito para emojis em SO Windows/macOS/Android
  ctx.font = `500 ${fontSize}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", Nunito, system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, width / 2, height / 2);
  tex.refresh();
  return uniqueKey;
}

/** Adiciona haptic feedback (Capacitor) com fallback silencioso */
export async function vibrate(): Promise<void> {
  try {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(15);
    }
  } catch {
    // silencioso
  }
}

/** Reproduz tracks TTS placeholder (não bloqueia gameplay) */
export function playTracks(tracks: TtsTrack[] | undefined): void {
  if (!tracks || tracks.length === 0) return;
  void getTtsPlaceholder().play(tracks);
}

export function emitAtomComplete(
  scene: Phaser.Scene,
  partial: Partial<AtomResult>,
): void {
  const result: AtomResult = {
    success: true,
    durationMs: 0,
    attempts: 1,
    difficultyLevel: 1,
    conceptsScored: [],
    ...partial,
  };
  scene.game.events.emit('atom:complete', result);
}

/** Helper: cria botão grande (hit area mínima 80px) com texto e cor */
export function makeBigButton(
  scene: Phaser.Scene,
  x: number,
  y: number,
  label: string,
  onClick: () => void,
  options?: { bgColor?: string; textColor?: string; width?: number; height?: number },
): Phaser.GameObjects.Image {
  const w = Math.max(options?.width ?? 220, HIT_AREA_MIN_PX);
  const h = Math.max(options?.height ?? 100, HIT_AREA_MIN_PX);
  const tex = makeLabelTexture(scene, `btn-${label}`, {
    label,
    width: w,
    height: h,
    bgColor: options?.bgColor ?? CURIOSOS_PALETTE.primary,
    textColor: options?.textColor ?? '#FFFFFF',
    fontSize: 28,
    rounded: 28,
  });
  const img = scene.add.image(x, y, tex).setInteractive({ useHandCursor: true });
  img.setSize(w, h);
  img.on('pointerdown', () => {
    scene.tweens.add({ targets: img, scale: 0.95, duration: 80, yoyo: true });
    void vibrate();
    onClick();
  });
  return img;
}

/** Adiciona título grande no topo da cena */
export function addTitle(scene: Phaser.Scene, title: string): void {
  const { width } = scene.scale;
  scene.add
    .text(width / 2, 60, title, {
      fontFamily: 'Nunito, system-ui, sans-serif',
      fontSize: '32px',
      color: CURIOSOS_PALETTE.primary,
      fontStyle: '500',
    })
    .setOrigin(0.5);
}

export function defaultBackground(scene: Phaser.Scene): void {
  scene.cameras.main.setBackgroundColor(CURIOSOS_PALETTE.bg);
}
