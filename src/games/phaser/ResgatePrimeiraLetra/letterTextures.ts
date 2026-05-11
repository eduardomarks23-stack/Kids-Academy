/**
 * Texturas premium para Resgate da Primeira Letra.
 *
 * Bolhas das letras: gradient radial + drop shadow + glossy highlight.
 * Slot alvo: glow translúcido com pulsação (renderizado dinamicamente
 * em MainScene via Phaser.Graphics — apenas texture base aqui).
 *
 * Geramos uma textura por letra para evitar reprocessamento. Cores
 * suaves harmonizadas com a paleta Kids (roxo + amarelo + azul-céu).
 */

const TEXTURE_SIZE = 180;
const BUBBLE_RADIUS = TEXTURE_SIZE * 0.45;

export interface BubbleColors {
  base: string;
  light: string;
  dark: string;
  outline: string;
}

const BUBBLE_NEUTRAL: BubbleColors = {
  base: '#7DD3FC',
  light: '#BAE6FD',
  dark: '#0284C7',
  outline: '#075985',
};

const BUBBLE_CORRECT: BubbleColors = {
  base: '#86EFAC',
  light: '#BBF7D0',
  dark: '#15803D',
  outline: '#14532D',
};

const BUBBLE_WRONG: BubbleColors = {
  base: '#FCA5A5',
  light: '#FECACA',
  dark: '#B91C1C',
  outline: '#7F1D1D',
};

interface PhaserTextureManager {
  textures: {
    addCanvas: (key: string, canvas: HTMLCanvasElement) => unknown;
    exists: (key: string) => boolean;
    remove: (key: string) => void;
  };
}

export type BubbleVariant = 'neutral' | 'correct' | 'wrong';

const VARIANT_COLORS: Record<BubbleVariant, BubbleColors> = {
  neutral: BUBBLE_NEUTRAL,
  correct: BUBBLE_CORRECT,
  wrong: BUBBLE_WRONG,
};

/** Chave da textura para uma letra+variante (ex: "letter-G-neutral"). */
export function letterTextureKey(letter: string, variant: BubbleVariant): string {
  return `letter-${letter}-${variant}`;
}

/**
 * Pré-gera todas as texturas necessárias: bolhas com letra integrada
 * (3 variantes × N letras únicas) + sparkle para partículas.
 *
 * Letra desenhada DENTRO da textura → drag funciona em Image direto,
 * hit area bate exatamente com o visual.
 */
export function generateBubbleTextures(scene: PhaserTextureManager, letters: string[]) {
  const unique = Array.from(new Set(letters));
  const variants: BubbleVariant[] = ['neutral', 'correct', 'wrong'];

  for (const letter of unique) {
    for (const variant of variants) {
      const key = letterTextureKey(letter, variant);
      if (scene.textures.exists(key)) scene.textures.remove(key);
      scene.textures.addCanvas(key, renderLetterBubble(letter, VARIANT_COLORS[variant]));
    }
  }

  if (scene.textures.exists('letter-sparkle')) scene.textures.remove('letter-sparkle');
  scene.textures.addCanvas('letter-sparkle', renderSparkle());
}

const EMOJI_TEXTURE_SIZE = 220;

export function emojiTextureKey(emoji: string): string {
  return `emoji-${emoji}`;
}

/**
 * Pré-gera texturas dos emojis usados no jogo. Phaser.Text renderiza
 * emojis cortados (measureText do Canvas calcula métricas incorretas
 * para emoji glyphs); pré-renderizar em canvas com tamanho explícito
 * resolve.
 */
export function generateEmojiTextures(scene: PhaserTextureManager, emojis: string[]) {
  const unique = Array.from(new Set(emojis));
  for (const emoji of unique) {
    const key = emojiTextureKey(emoji);
    if (scene.textures.exists(key)) scene.textures.remove(key);
    scene.textures.addCanvas(key, renderEmoji(emoji));
  }
}

function renderEmoji(emoji: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = EMOJI_TEXTURE_SIZE;
  canvas.height = EMOJI_TEXTURE_SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Tamanho da fonte deixando 10% de margem em cada lado para evitar clip
  // de glyphs que ultrapassam o "em-square" padrão.
  const fontPx = Math.floor(EMOJI_TEXTURE_SIZE * 0.78);
  ctx.font = `${fontPx}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#000000'; // ignorado pelo glyph color do emoji
  ctx.fillText(emoji, EMOJI_TEXTURE_SIZE / 2, EMOJI_TEXTURE_SIZE / 2);
  return canvas;
}

export const EMOJI_DISPLAY_SIZE = EMOJI_TEXTURE_SIZE;

function renderLetterBubble(letter: string, colors: BubbleColors): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = TEXTURE_SIZE;
  canvas.height = TEXTURE_SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const cx = TEXTURE_SIZE / 2;
  const cy = TEXTURE_SIZE / 2;

  // 1. Drop shadow
  ctx.save();
  ctx.shadowColor = 'rgba(15, 23, 42, 0.32)';
  ctx.shadowBlur = 16;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = colors.dark;
  ctx.beginPath();
  ctx.arc(cx, cy, BUBBLE_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 2. Gradiente principal (radial, offset top-left → 3D)
  const gradient = ctx.createRadialGradient(
    cx - BUBBLE_RADIUS * 0.4,
    cy - BUBBLE_RADIUS * 0.45,
    BUBBLE_RADIUS * 0.1,
    cx,
    cy,
    BUBBLE_RADIUS * 1.2,
  );
  gradient.addColorStop(0, colors.light);
  gradient.addColorStop(0.55, colors.base);
  gradient.addColorStop(1, colors.dark);

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, BUBBLE_RADIUS, 0, Math.PI * 2);
  ctx.fill();

  // 3. Outline sutil
  ctx.strokeStyle = colors.outline;
  ctx.lineWidth = 2.5;
  ctx.globalAlpha = 0.32;
  ctx.beginPath();
  ctx.arc(cx, cy, BUBBLE_RADIUS, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // 4. Glossy highlight (top-left)
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, BUBBLE_RADIUS, 0, Math.PI * 2);
  ctx.clip();

  const glossGrad = ctx.createRadialGradient(
    cx - BUBBLE_RADIUS * 0.42,
    cy - BUBBLE_RADIUS * 0.5,
    0,
    cx - BUBBLE_RADIUS * 0.42,
    cy - BUBBLE_RADIUS * 0.5,
    BUBBLE_RADIUS * 0.78,
  );
  glossGrad.addColorStop(0, 'rgba(255,255,255,0.65)');
  glossGrad.addColorStop(0.45, 'rgba(255,255,255,0.18)');
  glossGrad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = glossGrad;
  ctx.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);
  ctx.restore();

  // 5. Letra centralizada — Nunito 900 com sombra suave para legibilidade
  ctx.save();
  ctx.font = '900 110px "Nunito", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(15, 23, 42, 0.35)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetY = 2;
  // Stroke escuro fino para contraste em qualquer cor de fundo
  ctx.lineWidth = 6;
  ctx.strokeStyle = colors.outline;
  ctx.globalAlpha = 0.6;
  ctx.strokeText(letter, cx, cy + 4);
  ctx.globalAlpha = 1;
  // Fill branco
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(letter, cx, cy + 4);
  ctx.restore();

  return canvas;
}

function renderSparkle(): HTMLCanvasElement {
  const size = 32;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  const cx = size / 2;
  const cy = size / 2;
  // Brilho radial dourado-pastel
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size / 2);
  grad.addColorStop(0, 'rgba(255, 252, 200, 1)');
  grad.addColorStop(0.4, 'rgba(252, 211, 77, 0.9)');
  grad.addColorStop(1, 'rgba(252, 211, 77, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return canvas;
}

export const BUBBLE_TEXTURE_SIZE = TEXTURE_SIZE;
