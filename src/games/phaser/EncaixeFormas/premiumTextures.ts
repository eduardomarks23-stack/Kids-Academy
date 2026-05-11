/**
 * Geradores de texturas premium para o jogo Encaixe das Formas Mágicas.
 *
 * Diferente de Phaser.Graphics (que só faz fills sólidos), estas texturas
 * usam Canvas API 2D direto: gradientes radiais, drop shadow, glossy
 * highlight, anti-aliasing nativo.
 *
 * Cada textura é gerada em alta resolução (180×180) e Phaser escala
 * conforme necessário para nitidez retina.
 */

export type ShapeType = 'circle' | 'square' | 'triangle' | 'star' | 'heart';

export interface ShapeColors {
  base: string;
  light: string;
  dark: string;
  outline: string;
}

const COLOR_MAP: Record<ShapeType, ShapeColors> = {
  circle: { base: '#FF6B6B', light: '#FF9E9E', dark: '#D44848', outline: '#A82424' },
  square: { base: '#4ECDC4', light: '#7FE3DD', dark: '#2BA39A', outline: '#1A7F77' },
  triangle: { base: '#FFE66D', light: '#FFF1A6', dark: '#E0B83A', outline: '#9B7C0F' },
  star: { base: '#FFD700', light: '#FFE974', dark: '#C9A800', outline: '#8B7300' },
  heart: { base: '#F472B6', light: '#FBA4D2', dark: '#C33A85', outline: '#8B1A5A' },
};

const TEXTURE_SIZE = 180;
const SHAPE_RADIUS = TEXTURE_SIZE * 0.42; // 75.6

interface Phaser3Like {
  textures: {
    addCanvas: (key: string, canvas: HTMLCanvasElement) => unknown;
    exists: (key: string) => boolean;
    remove: (key: string) => void;
  };
}

/**
 * Cria texturas premium para todas as formas + sparkle de partícula.
 * Idempotente — verifica se a textura já existe antes de criar.
 */
export function generatePremiumTextures(scene: Phaser3Like) {
  const types: ShapeType[] = ['circle', 'square', 'triangle', 'star', 'heart'];
  for (const type of types) {
    const colors = COLOR_MAP[type];
    if (scene.textures.exists(type)) scene.textures.remove(type);
    const canvas = renderShape(type, colors);
    scene.textures.addCanvas(type, canvas);
  }

  if (scene.textures.exists('sparkle')) scene.textures.remove('sparkle');
  scene.textures.addCanvas('sparkle', renderSparkle());
}

export function getShapeColors(type: ShapeType): ShapeColors {
  return COLOR_MAP[type];
}

// ============================================================
// Renderers — cada forma é desenhada em canvas 2D nativo
// ============================================================

function renderShape(type: ShapeType, colors: ShapeColors): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = TEXTURE_SIZE;
  canvas.height = TEXTURE_SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const cx = TEXTURE_SIZE / 2;
  const cy = TEXTURE_SIZE / 2;

  // 1. Drop shadow (desenhada via shadowBlur na primeira passada)
  ctx.save();
  ctx.shadowColor = 'rgba(15, 23, 42, 0.3)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 6;
  ctx.fillStyle = colors.dark;
  drawShapePath(ctx, type, cx, cy, SHAPE_RADIUS);
  ctx.fill();
  ctx.restore();

  // 2. Gradiente principal (radial offset top-left para efeito 3D)
  const gradient = ctx.createRadialGradient(
    cx - SHAPE_RADIUS * 0.35,
    cy - SHAPE_RADIUS * 0.4,
    SHAPE_RADIUS * 0.15,
    cx,
    cy,
    SHAPE_RADIUS * 1.2,
  );
  gradient.addColorStop(0, colors.light);
  gradient.addColorStop(0.55, colors.base);
  gradient.addColorStop(1, colors.dark);

  ctx.fillStyle = gradient;
  drawShapePath(ctx, type, cx, cy, SHAPE_RADIUS);
  ctx.fill();

  // 3. Outline sutil
  ctx.strokeStyle = colors.outline;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.25;
  drawShapePath(ctx, type, cx, cy, SHAPE_RADIUS);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // 4. Glossy highlight (top-left)
  ctx.save();
  drawShapePath(ctx, type, cx, cy, SHAPE_RADIUS);
  ctx.clip();

  const glossGrad = ctx.createRadialGradient(
    cx - SHAPE_RADIUS * 0.4,
    cy - SHAPE_RADIUS * 0.5,
    0,
    cx - SHAPE_RADIUS * 0.4,
    cy - SHAPE_RADIUS * 0.5,
    SHAPE_RADIUS * 0.7,
  );
  glossGrad.addColorStop(0, 'rgba(255,255,255,0.55)');
  glossGrad.addColorStop(0.4, 'rgba(255,255,255,0.15)');
  glossGrad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = glossGrad;
  ctx.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);
  ctx.restore();

  return canvas;
}

function drawShapePath(
  ctx: CanvasRenderingContext2D,
  type: ShapeType,
  cx: number,
  cy: number,
  r: number,
) {
  ctx.beginPath();

  if (type === 'circle') {
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
  } else if (type === 'square') {
    const w = r * 1.7;
    const corner = r * 0.22;
    roundedRectPath(ctx, cx - w / 2, cy - w / 2, w, w, corner);
  } else if (type === 'triangle') {
    // Triângulo equilátero com altura = 2r (mesmo bounding box do círculo).
    // Apex no topo (cy - r), base na parte inferior (cy + r * 0.85).
    const apex = { x: cx, y: cy - r };
    const halfBase = r * 0.95;
    const baseY = cy + r * 0.85;
    const corner = r * 0.18;
    roundedTrianglePath(ctx, apex, { x: cx - halfBase, y: baseY }, { x: cx + halfBase, y: baseY }, corner);
  } else if (type === 'star') {
    const outer = r * 1.0;
    const inner = r * 0.42;
    for (let i = 0; i < 10; i++) {
      const radius = i % 2 === 0 ? outer : inner;
      const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  } else if (type === 'heart') {
    const curves = getHeartBezierCurves(cx, cy, r);
    const first = curves[0]?.[0];
    if (!first) return;
    ctx.moveTo(first.x, first.y);
    for (const curve of curves) {
      const c1 = curve[1];
      const c2 = curve[2];
      const end = curve[3];
      if (c1 && c2 && end) {
        ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, end.x, end.y);
      }
    }
    ctx.closePath();
  }
}

interface Pt {
  x: number;
  y: number;
}

/**
 * Define o caminho do coração via 4 cubic bezier curves.
 * Retornado como array de [start, c1, c2, end] para reuso entre
 * Canvas API (filled premium) e Phaser.Graphics (outline).
 *
 * Bounding box centrado em (cx, cy) com tamanho 2r × 2r.
 * Topos das lóbulas em y = cy - r; ponta inferior em y = cy + r.
 */
export function getHeartBezierCurves(cx: number, cy: number, r: number): Pt[][] {
  const w = r * 2;
  const h = r * 2;
  const topY = cy - r;
  const topCurveH = h * 0.3;
  const startY = topY + topCurveH;
  const midY = topY + (h + topCurveH) / 2;

  return [
    // top-left lóbula
    [
      { x: cx, y: startY },
      { x: cx, y: topY },
      { x: cx - w / 2, y: topY },
      { x: cx - w / 2, y: startY },
    ],
    // bottom-left curva descendente
    [
      { x: cx - w / 2, y: startY },
      { x: cx - w / 2, y: midY },
      { x: cx, y: midY },
      { x: cx, y: topY + h },
    ],
    // bottom-right curva descendente
    [
      { x: cx, y: topY + h },
      { x: cx, y: midY },
      { x: cx + w / 2, y: midY },
      { x: cx + w / 2, y: startY },
    ],
    // top-right lóbula
    [
      { x: cx + w / 2, y: startY },
      { x: cx + w / 2, y: topY },
      { x: cx, y: topY },
      { x: cx, y: startY },
    ],
  ];
}

/** Avalia ponto cubic bezier em parâmetro t ∈ [0, 1]. */
export function bezierPoint(t: number, p0: Pt, p1: Pt, p2: Pt, p3: Pt): Pt {
  const u = 1 - t;
  const uu = u * u;
  const uuu = uu * u;
  const tt = t * t;
  const ttt = tt * t;
  return {
    x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
    y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
  };
}

function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function roundedTrianglePath(
  ctx: CanvasRenderingContext2D,
  a: { x: number; y: number },
  b: { x: number; y: number },
  c: { x: number; y: number },
  r: number,
) {
  // Cantos arredondados via lineTo + arcTo
  ctx.moveTo(midpoint(a, b, r).x, midpoint(a, b, r).y);
  ctx.arcTo(b.x, b.y, c.x, c.y, r);
  ctx.arcTo(c.x, c.y, a.x, a.y, r);
  ctx.arcTo(a.x, a.y, b.x, b.y, r);
  ctx.closePath();
}

function midpoint(p1: { x: number; y: number }, p2: { x: number; y: number }, offset: number) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.hypot(dx, dy);
  return {
    x: p1.x + (dx * offset) / len,
    y: p1.y + (dy * offset) / len,
  };
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
  // Brilho radial dourado
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size / 2);
  grad.addColorStop(0, 'rgba(255, 252, 179, 1)');
  grad.addColorStop(0.4, 'rgba(255, 215, 0, 0.85)');
  grad.addColorStop(1, 'rgba(255, 215, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return canvas;
}

/** Desenha contorno do alvo (target) — apenas linhas, sem fill. */
export function drawTargetOutline(
  ctx: CanvasRenderingContext2D,
  type: ShapeType,
  cx: number,
  cy: number,
  radius: number,
  color: string,
  width = 5,
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.setLineDash([8, 6]);
  drawShapePath(ctx, type, cx, cy, radius);
  ctx.stroke();
  ctx.restore();
}
