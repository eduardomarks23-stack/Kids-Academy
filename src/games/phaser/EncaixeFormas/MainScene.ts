import Phaser from 'phaser';
import type { GameCallbacks } from '@/games/core/types';
import { playRoundComplete, playSuccess, playVictory, playWrong } from './sound';
import {
  bezierPoint,
  generatePremiumTextures,
  getHeartBezierCurves,
  type ShapeType,
} from './premiumTextures';

interface RoundConfig {
  shapes: ShapeType[];
  /** Quantos targets são distratores (não tem shape correspondente) — adiciona desafio. */
  distractors: number;
}

const ROUNDS: RoundConfig[] = [
  { shapes: ['circle', 'square', 'triangle'], distractors: 0 },
  { shapes: ['circle', 'square', 'triangle'], distractors: 0 },
  { shapes: ['circle', 'square', 'triangle', 'star'], distractors: 0 },
  { shapes: ['square', 'triangle', 'star', 'heart'], distractors: 0 },
  { shapes: ['circle', 'square', 'triangle', 'star', 'heart'], distractors: 1 },
];

interface SceneInitData {
  callbacks?: GameCallbacks;
}

interface ActiveTarget {
  x: number;
  y: number;
  type: ShapeType;
  occupied: boolean;
  graphics: Phaser.GameObjects.Graphics;
  isDistractor: boolean;
}

interface ActiveShape {
  image: Phaser.GameObjects.Image;
  type: ShapeType;
  startX: number;
  startY: number;
}

export class MainScene extends Phaser.Scene {
  private callbacks: GameCallbacks | null = null;

  private currentRound = 0;
  private totalScore = 0;
  private streak = 0;
  private bestStreak = 0;
  private totalErrors = 0;
  private totalCorrect = 0;
  private startedAt = 0;
  private dragStartedAt = 0;

  private activeShapes: ActiveShape[] = [];
  private activeTargets: ActiveTarget[] = [];
  private bgGraphics?: Phaser.GameObjects.Graphics;
  private headerBg?: Phaser.GameObjects.Rectangle;
  private headerProgress?: Phaser.GameObjects.Graphics;
  private scoreText?: Phaser.GameObjects.Text;
  private roundText?: Phaser.GameObjects.Text;
  private comboText?: Phaser.GameObjects.Text;
  private endOverlayItems: Phaser.GameObjects.GameObject[] = [];

  private phase: 'idle' | 'playing' | 'transition' | 'ended' = 'idle';

  constructor() {
    super({ key: 'EncaixeFormasMain' });
  }

  init(data: SceneInitData) {
    if (data?.callbacks) {
      this.callbacks = data.callbacks;
    }
  }

  preload() {
    generatePremiumTextures(this);
  }

  create() {
    this.currentRound = 0;
    this.totalScore = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.totalErrors = 0;
    this.totalCorrect = 0;
    this.startedAt = Date.now();
    this.activeShapes = [];
    this.activeTargets = [];
    this.endOverlayItems = [];
    this.phase = 'idle';

    this.drawBackground();
    this.createHeader();

    // Drag handlers — registrados uma vez por scene lifecycle
    this.input.on(
      'dragstart',
      (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) => {
        if (this.phase !== 'playing') return;
        this.dragStartedAt = Date.now();
        gameObject.setDepth(20);
        const baseScale = gameObject.getData('baseScale') as number;
        this.tweens.add({
          targets: gameObject,
          scale: baseScale * 1.1,
          duration: 120,
          yoyo: true,
        });
      },
    );

    this.input.on(
      'drag',
      (
        _pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.Image,
        dragX: number,
        dragY: number,
      ) => {
        if (this.phase !== 'playing') return;
        gameObject.x = dragX;
        gameObject.y = dragY;
      },
    );

    // 'dragend' é o evento correto sem drop zones
    this.input.on(
      'dragend',
      (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) => {
        if (this.phase !== 'playing') return;
        this.handleDragEnd(gameObject);
      },
    );

    // Resize handler — reposiciona tudo quando viewport muda
    this.scale.on('resize', this.handleResize, this);
    this.events.once('shutdown', () => {
      this.scale.off('resize', this.handleResize, this);
    });

    this.startRound(0);
  }

  // ========== LAYOUT RESPONSIVO ==========

  private get layout() {
    const w = this.scale.width;
    const h = this.scale.height;
    const isPortrait = h > w * 1.05;
    const headerH = 80;
    const padding = 12;

    // Espaço útil abaixo do header
    const availH = h - headerH - padding * 2;
    const availW = w - padding * 2;

    // Em portrait, queremos alvos e formas mais próximos verticalmente
    // (menos espaço vazio no meio); em landscape, mais separados.
    const targetsRatio = isPortrait ? 0.22 : 0.3;
    const shapesRatio = isPortrait ? 0.72 : 0.78;

    return {
      w,
      h,
      headerH,
      padding,
      isPortrait,
      availW,
      availH,
      targetsCenterY: headerH + padding + availH * targetsRatio,
      shapesCenterY: headerH + padding + availH * shapesRatio,
    };
  }

  /**
   * Tamanho base das formas — section-based.
   * Divide largura útil em N seções iguais; cada forma ocupa 80% da seção.
   */
  private computeShapeSize(count: number): number {
    const { availW, isPortrait } = this.layout;
    const sectionW = availW / count;
    // Em portrait priorizamos shapes maiores (até 130px)
    const maxSize = isPortrait ? 140 : 120;
    const minSize = 70;
    const size = Math.min(maxSize, Math.max(minSize, sectionW * 0.85));
    return size;
  }

  private handleResize(gameSize: Phaser.Structs.Size) {
    if (!gameSize.width || !gameSize.height) return;
    this.repositionAll();
  }

  private repositionAll() {
    this.drawBackground();
    this.repositionHeader();
    this.repositionRound();
    this.repositionEndOverlay();
  }

  // ========== ROUND LIFECYCLE ==========

  private startRound(idx: number) {
    this.currentRound = idx;
    this.phase = 'playing';

    // Limpa elementos da rodada anterior
    this.activeShapes.forEach((s) => s.image.destroy());
    this.activeShapes = [];
    this.activeTargets.forEach((t) => t.graphics.destroy());
    this.activeTargets = [];

    const config = ROUNDS[idx];
    if (!config) return;

    const targetCount = config.shapes.length + config.distractors;
    const shapeCount = config.shapes.length;
    const targetSize = this.computeShapeSize(targetCount);
    const shapeSize = this.computeShapeSize(shapeCount);
    const targetRadius = targetSize * 0.5;

    const { w, targetsCenterY, shapesCenterY, padding, availW } = this.layout;
    const usableW = availW * 0.92;
    const leftEdge = (w - usableW) / 2;

    // Targets shuffled
    const targetTypes: { type: ShapeType; isDistractor: boolean }[] = config.shapes.map((s) => ({
      type: s,
      isDistractor: false,
    }));
    for (let d = 0; d < config.distractors; d++) {
      const allTypes: ShapeType[] = ['circle', 'square', 'triangle', 'star', 'heart'];
      const unused = allTypes.filter((t) => !config.shapes.includes(t));
      if (!unused.length) break;
      const pick = unused[d % unused.length];
      if (pick) targetTypes.push({ type: pick, isDistractor: true });
    }
    this.shuffle(targetTypes);

    // Section-based positioning: cada item no centro de uma seção igual
    const targetSectionW = usableW / targetCount;
    targetTypes.forEach((tt, i) => {
      const x = leftEdge + targetSectionW * (i + 0.5);
      const y = targetsCenterY;
      const g = this.add.graphics();
      const color = tt.isDistractor ? 0xfca5a5 : 0xa8a29e;
      g.lineStyle(5, color, 0.85);
      this.drawTargetOutline(g, tt.type, x, y, targetRadius);
      g.setDepth(0);
      this.activeTargets.push({
        x,
        y,
        type: tt.type,
        occupied: false,
        graphics: g,
        isDistractor: tt.isDistractor,
      });
    });

    // Shapes shuffled
    const shapesShuffled = [...config.shapes];
    this.shuffle(shapesShuffled);

    const shapeSectionW = usableW / shapeCount;
    shapesShuffled.forEach((type, i) => {
      const startX = leftEdge + shapeSectionW * (i + 0.5);
      const startY = shapesCenterY;
      // Textura é 180×180 nativo; calculamos scale para chegar em shapeSize
      const baseScale = shapeSize / 180;
      const image = this.add
        .image(startX, startY, type)
        .setInteractive({ useHandCursor: true, pixelPerfect: false })
        .setScale(0)
        .setDepth(1);
      image.setData('type', type);
      image.setData('startX', startX);
      image.setData('startY', startY);
      image.setData('baseScale', baseScale);
      this.input.setDraggable(image);

      this.tweens.add({
        targets: image,
        scale: baseScale,
        duration: 380,
        ease: 'Back.easeOut',
        delay: i * 90,
      });

      // Toques expandem a hitArea para dedinhos pequenos
      image.input!.hitArea.setSize(180, 180);

      this.activeShapes.push({ image, type, startX, startY });
    });

    void padding;
    this.updateHeader();
  }

  private repositionRound() {
    if (this.activeShapes.length === 0 && this.activeTargets.length === 0) return;
    const { w, targetsCenterY, shapesCenterY, availW } = this.layout;
    const usableW = availW * 0.92;
    const leftEdge = (w - usableW) / 2;
    const targetCount = this.activeTargets.length;
    const shapeCount = this.activeShapes.length;
    const targetSize = this.computeShapeSize(targetCount || 1);
    const shapeSize = this.computeShapeSize(shapeCount || 1);
    const targetRadius = targetSize * 0.5;
    const targetSectionW = usableW / (targetCount || 1);
    const shapeSectionW = usableW / (shapeCount || 1);

    // Reposiciona targets + redesenha
    this.activeTargets.forEach((t, i) => {
      const x = leftEdge + targetSectionW * (i + 0.5);
      const y = targetsCenterY;
      t.x = x;
      t.y = y;
      t.graphics.clear();
      const color = t.isDistractor ? 0xfca5a5 : 0xa8a29e;
      t.graphics.lineStyle(5, color, 0.85);
      this.drawTargetOutline(t.graphics, t.type, x, y, targetRadius);
    });

    // Reposiciona shapes
    this.activeShapes.forEach((s, i) => {
      const newStartX = leftEdge + shapeSectionW * (i + 0.5);
      const newStartY = shapesCenterY;
      const baseScale = shapeSize / 180;
      s.image.setData('baseScale', baseScale);

      // Se está na posição inicial, atualiza sem animar
      if (Math.abs(s.image.x - s.startX) < 5 && Math.abs(s.image.y - s.startY) < 5) {
        s.image.x = newStartX;
        s.image.y = newStartY;
        s.image.setScale(baseScale);
      }
      // Se já está no alvo (occupied), mover para nova posição do alvo
      const targetMatch = this.activeTargets.find(
        (t) => t.occupied && t.type === s.type,
      );
      if (targetMatch) {
        s.image.x = targetMatch.x;
        s.image.y = targetMatch.y;
        s.image.setScale(baseScale * 0.85);
      }

      s.startX = newStartX;
      s.startY = newStartY;
      s.image.setData('startX', newStartX);
      s.image.setData('startY', newStartY);
    });
  }

  private handleDragEnd(image: Phaser.GameObjects.Image) {
    const type = image.getData('type') as ShapeType;
    const startX = image.getData('startX') as number;
    const startY = image.getData('startY') as number;
    const baseScale = image.getData('baseScale') as number;
    const tempoMs = Date.now() - this.dragStartedAt;

    // Encontra alvo não-ocupado mais próximo
    let bestTarget: ActiveTarget | null = null;
    let bestDist = Infinity;
    for (const t of this.activeTargets) {
      if (t.occupied) continue;
      const d = Phaser.Math.Distance.Between(image.x, image.y, t.x, t.y);
      if (d < bestDist) {
        bestDist = d;
        bestTarget = t;
      }
    }

    // Tolerância proporcional ao tamanho do shape
    const tolerance = Math.max(70, baseScale * 90);

    this.callbacks?.onBehavior({
      type: 'tempo_resposta',
      valor: { ms: tempoMs, forma: type, distancia: Math.round(bestDist) },
    });

    if (bestTarget && bestDist < tolerance && bestTarget.type === type) {
      this.handleCorrect(image, bestTarget, tempoMs, baseScale);
    } else {
      this.handleWrong(image, startX, startY, type, bestTarget?.type ?? null, baseScale);
    }
  }

  private handleCorrect(
    image: Phaser.GameObjects.Image,
    target: ActiveTarget,
    tempoMs: number,
    baseScale: number,
  ) {
    target.occupied = true;
    image.disableInteractive();
    this.input.setDraggable(image, false);

    this.streak++;
    this.bestStreak = Math.max(this.bestStreak, this.streak);
    this.totalCorrect++;

    const speedBonus = tempoMs < 2500 ? 10 : tempoMs < 5000 ? 6 : 2;
    const comboBonus = Math.min(10, (this.streak - 1) * 2);
    const points = 10 + speedBonus + comboBonus;
    this.totalScore += points;

    this.callbacks?.onScore(this.totalScore);
    this.callbacks?.onBehavior({
      type: 'conquista_streak',
      valor: { acerto: true, forma: target.type, streak: this.streak, points },
    });

    playSuccess();

    // Snap para o alvo (escala um pouco menor para "encaixar")
    this.tweens.add({
      targets: image,
      x: target.x,
      y: target.y,
      scale: baseScale * 0.85,
      duration: 280,
      ease: 'Back.easeOut',
      onComplete: () => {
        this.emitSparkles(target.x, target.y, 14);
        this.showFloatingText(target.x, target.y - 50, `+${points}`, '#10B981', 22);
        if (this.streak >= 3) {
          this.showFloatingText(
            target.x,
            target.y - 80,
            `🔥 Combo ${this.streak}!`,
            '#F59E0B',
            18,
          );
        }
        this.checkRoundComplete();
      },
    });

    this.updateHeader();
  }

  private handleWrong(
    image: Phaser.GameObjects.Image,
    startX: number,
    startY: number,
    type: ShapeType,
    nearestType: ShapeType | null,
    baseScale: number,
  ) {
    this.streak = 0;
    this.totalErrors++;

    this.callbacks?.onBehavior({
      type: 'tentativas_multiplas',
      valor: { forma: type, alvo_proximo: nearestType, errors: this.totalErrors },
    });

    if (nearestType && nearestType !== type) {
      this.callbacks?.onBehavior({
        type: 'erro_conceitual',
        valor: { confundiu: type, com: nearestType },
      });
    }

    playWrong();

    // Tremida horizontal antes de retornar
    this.tweens.add({
      targets: image,
      x: { from: image.x - 8, to: image.x + 8 },
      duration: 60,
      yoyo: true,
      repeat: 2,
      onComplete: () => {
        this.tweens.add({
          targets: image,
          x: startX,
          y: startY,
          scale: baseScale,
          duration: 380,
          ease: 'Back.easeOut',
        });
      },
    });

    this.showFloatingText(image.x, image.y - 40, 'Quase!', '#F87171', 20);
    this.updateHeader();
  }

  private checkRoundComplete() {
    const allDone = this.activeTargets
      .filter((t) => !t.isDistractor)
      .every((t) => t.occupied);
    if (!allDone) return;

    this.phase = 'transition';
    playRoundComplete();

    // Bonus de rodada — sem erros = 20 extra
    const roundBonus = this.totalErrors === 0 ? 20 : 0;
    if (roundBonus > 0) {
      this.totalScore += roundBonus;
      this.callbacks?.onScore(this.totalScore);
    }

    const { w, headerH } = this.layout;
    const msg = roundBonus > 0 ? '✨ Sem erros! +20' : '👏 Bem feito!';
    this.showFloatingText(w / 2, headerH + 90, msg, '#6B46C1', 26);

    this.time.delayedCall(1400, () => {
      const next = this.currentRound + 1;
      if (next >= ROUNDS.length) {
        this.endGame();
      } else {
        this.startRound(next);
      }
    });
  }

  private endGame() {
    this.phase = 'ended';
    playVictory();

    const duracao = Math.floor((Date.now() - this.startedAt) / 1000);
    const stars = this.computeStars();

    this.callbacks?.onComplete({
      score: this.totalScore,
      duracaoSegundos: duracao,
      acertos: this.totalCorrect,
      erros: this.totalErrors,
      conceitosTrabalhados: ['formas-geometricas', 'coordenacao-motora', 'discriminacao-visual'],
    });

    this.showEndScreen(stars);
  }

  private computeStars(): 1 | 2 | 3 {
    if (this.totalScore >= 450 && this.totalErrors <= 2) return 3;
    if (this.totalScore >= 320) return 2;
    return 1;
  }

  // ========== UI ==========

  private drawBackground() {
    const { w, h } = this.layout;
    if (this.bgGraphics) this.bgGraphics.destroy();
    const bg = this.add.graphics();
    bg.setDepth(-10);
    // Gradient via círculos suaves (Phaser não tem fillGradient direto)
    bg.fillStyle(0xfaf7ff, 1);
    bg.fillRect(0, 0, w, h);

    bg.fillStyle(0xfef3c7, 0.45);
    bg.fillCircle(w * 0.1, h * 0.18, Math.max(80, Math.min(w, h) * 0.18));
    bg.fillStyle(0xede9fe, 0.55);
    bg.fillCircle(w * 0.92, h * 0.85, Math.max(80, Math.min(w, h) * 0.2));
    bg.fillStyle(0xd1fae5, 0.4);
    bg.fillCircle(w * 0.85, h * 0.15, Math.max(60, Math.min(w, h) * 0.12));
    bg.fillStyle(0xfce7f3, 0.4);
    bg.fillCircle(w * 0.15, h * 0.82, Math.max(60, Math.min(w, h) * 0.13));
    this.bgGraphics = bg;
  }

  private createHeader() {
    const { w, headerH } = this.layout;
    this.headerBg = this.add.rectangle(w / 2, headerH / 2, w - 24, headerH - 16, 0xffffff, 0.92);
    this.headerBg.setStrokeStyle(2, 0xe9d5ff, 1);
    this.headerBg.setDepth(15);

    this.roundText = this.add.text(24, 18, '', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '16px',
      fontStyle: '900',
      color: '#6B46C1',
    });
    this.roundText.setDepth(16);

    this.scoreText = this.add.text(w / 2, 18, '', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '22px',
      fontStyle: '900',
      color: '#1F2937',
    });
    this.scoreText.setOrigin(0.5, 0);
    this.scoreText.setDepth(16);

    this.comboText = this.add.text(w - 24, 18, '', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '16px',
      fontStyle: '900',
      color: '#F59E0B',
    });
    this.comboText.setOrigin(1, 0);
    this.comboText.setDepth(16);

    this.headerProgress = this.add.graphics();
    this.headerProgress.setDepth(16);

    this.updateHeader();
  }

  private repositionHeader() {
    if (!this.headerBg || !this.scoreText || !this.comboText) return;
    const { w, headerH } = this.layout;
    this.headerBg.setPosition(w / 2, headerH / 2);
    this.headerBg.setSize(w - 24, headerH - 16);
    this.scoreText.setPosition(w / 2, 18);
    this.comboText.setPosition(w - 24, 18);
    this.updateHeader();
  }

  private updateHeader() {
    if (!this.roundText || !this.scoreText || !this.comboText || !this.headerProgress) return;
    this.roundText.setText(`Rodada ${this.currentRound + 1}/${ROUNDS.length}`);
    this.scoreText.setText(`★ ${this.totalScore}`);
    this.comboText.setText(this.streak >= 2 ? `🔥 x${this.streak}` : '');

    const { w } = this.layout;
    this.headerProgress.clear();
    const prog = (this.currentRound + 1) / ROUNDS.length;
    const barW = w - 32;
    this.headerProgress.fillStyle(0xede9fe, 1);
    this.headerProgress.fillRoundedRect(16, 60, barW, 6, 3);
    this.headerProgress.fillStyle(0x6b46c1, 1);
    this.headerProgress.fillRoundedRect(16, 60, barW * prog, 6, 3);
  }

  private showFloatingText(x: number, y: number, text: string, color: string, size = 22) {
    const t = this.add.text(x, y, text, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: `${size}px`,
      fontStyle: '900',
      color,
      stroke: '#FFFFFF',
      strokeThickness: 3,
    });
    t.setOrigin(0.5);
    t.setDepth(30);
    this.tweens.add({
      targets: t,
      y: y - 60,
      alpha: 0,
      duration: 1100,
      ease: 'Cubic.easeOut',
      onComplete: () => t.destroy(),
    });
  }

  private emitSparkles(x: number, y: number, qty = 12) {
    const emitter = this.add.particles(x, y, 'sparkle', {
      speed: { min: 100, max: 240 },
      scale: { start: 0.9, end: 0 },
      lifespan: 850,
      blendMode: 'ADD',
      emitting: false,
      quantity: qty,
      angle: { min: 0, max: 360 },
    });
    emitter.setDepth(25);
    emitter.explode();
    this.time.delayedCall(900, () => emitter.destroy());
  }

  private showEndScreen(stars: 1 | 2 | 3) {
    const { w, h } = this.layout;

    const overlay = this.add.rectangle(0, 0, w, h, 0x1f2937, 0.6);
    overlay.setOrigin(0);
    overlay.setDepth(50);
    this.endOverlayItems.push(overlay);

    const cardW = Math.min(440, w - 40);
    const cardH = 320;
    const cardX = w / 2;
    const cardY = h / 2;
    const card = this.add.graphics();
    card.fillStyle(0xffffff, 1);
    card.fillRoundedRect(cardX - cardW / 2, cardY - cardH / 2, cardW, cardH, 24);
    card.lineStyle(4, 0xfcd34d, 1);
    card.strokeRoundedRect(cardX - cardW / 2, cardY - cardH / 2, cardW, cardH, 24);
    card.setDepth(51);
    this.endOverlayItems.push(card);

    const title = this.add.text(cardX, cardY - 110, '🌟 Parabéns! 🌟', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '32px',
      fontStyle: '900',
      color: '#6B46C1',
    });
    title.setOrigin(0.5);
    title.setDepth(52);
    this.endOverlayItems.push(title);

    for (let i = 0; i < 3; i++) {
      const earned = i < stars;
      const sx = cardX - 70 + i * 70;
      const sy = cardY - 30;
      const star = this.add.text(sx, sy, '★', {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '60px',
        fontStyle: '900',
        color: earned ? '#FCD34D' : '#E5E7EB',
      });
      star.setOrigin(0.5);
      star.setDepth(52);
      star.setScale(0);
      this.tweens.add({
        targets: star,
        scale: 1,
        duration: 400,
        ease: 'Back.easeOut',
        delay: 300 + i * 220,
      });
      this.endOverlayItems.push(star);
    }

    const scoreLabel = this.add.text(cardX, cardY + 40, `${this.totalScore} pontos`, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      fontStyle: '900',
      color: '#1F2937',
    });
    scoreLabel.setOrigin(0.5);
    scoreLabel.setDepth(52);
    this.endOverlayItems.push(scoreLabel);

    const sub = this.add.text(
      cardX,
      cardY + 70,
      `${this.totalCorrect} acertos · ${this.totalErrors} tentativas extras`,
      {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '14px',
        color: '#6B7280',
      },
    );
    sub.setOrigin(0.5);
    sub.setDepth(52);
    this.endOverlayItems.push(sub);

    const btnY = cardY + 120;
    const btnW = 240;
    const btnH = 56;
    const btnBg = this.add.graphics();
    btnBg.fillStyle(0x10b981, 1);
    btnBg.fillRoundedRect(cardX - btnW / 2, btnY - btnH / 2, btnW, btnH, 28);
    btnBg.setDepth(52);
    this.endOverlayItems.push(btnBg);

    const btnText = this.add.text(cardX, btnY, 'Jogar novamente 🔄', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '18px',
      fontStyle: '900',
      color: '#FFFFFF',
    });
    btnText.setOrigin(0.5);
    btnText.setDepth(53);
    this.endOverlayItems.push(btnText);

    const btnHit = this.add.rectangle(cardX, btnY, btnW, btnH, 0xffffff, 0.001);
    btnHit.setDepth(54);
    btnHit.setInteractive({ useHandCursor: true });
    btnHit.on('pointerup', () => {
      this.scene.restart();
    });
    this.endOverlayItems.push(btnHit);
  }

  private repositionEndOverlay() {
    // Em fim de jogo, simplificamos: apenas reposicionar centro do overlay
    if (this.phase !== 'ended') return;
    // Por ora, redesenhar exigiria recriar todos os elementos.
    // Em um redimensionamento durante end screen, melhor recriar:
    this.endOverlayItems.forEach((item) => item.destroy());
    this.endOverlayItems = [];
    this.showEndScreen(this.computeStars());
  }

  // ========== TARGET OUTLINES ==========

  private drawTargetOutline(
    g: Phaser.GameObjects.Graphics,
    type: ShapeType,
    x: number,
    y: number,
    radius: number,
  ) {
    if (type === 'circle') {
      g.strokeCircle(x, y, radius);
    } else if (type === 'square') {
      const w = radius * 1.7;
      g.strokeRoundedRect(x - w / 2, y - w / 2, w, w, radius * 0.22);
    } else if (type === 'triangle') {
      // Mesma proporção da textura: apex em y - r, base em y + r * 0.85
      const halfBase = radius * 0.95;
      g.strokeTriangle(x, y - radius, x - halfBase, y + radius * 0.85, x + halfBase, y + radius * 0.85);
    } else if (type === 'star') {
      this.drawStarOutline(g, x, y, radius);
    } else if (type === 'heart') {
      this.drawHeartOutline(g, x, y, radius);
    }
  }

  private drawStarOutline(
    g: Phaser.GameObjects.Graphics,
    cx: number,
    cy: number,
    outer: number,
  ) {
    const inner = outer * 0.42;
    g.beginPath();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) g.moveTo(x, y);
      else g.lineTo(x, y);
    }
    g.closePath();
    g.strokePath();
  }

  private drawHeartOutline(
    g: Phaser.GameObjects.Graphics,
    cx: number,
    cy: number,
    radius: number,
  ) {
    // Mesmo path da textura premium — 4 cubic bezier amostradas em 18 pontos cada.
    const curves = getHeartBezierCurves(cx, cy, radius);
    const samples = 18;
    g.beginPath();
    const first = curves[0]?.[0];
    if (!first) return;
    g.moveTo(first.x, first.y);
    for (const curve of curves) {
      const [p0, p1, p2, p3] = curve;
      if (!p0 || !p1 || !p2 || !p3) continue;
      for (let s = 1; s <= samples; s++) {
        const t = s / samples;
        const p = bezierPoint(t, p0, p1, p2, p3);
        g.lineTo(p.x, p.y);
      }
    }
    g.closePath();
    g.strokePath();
  }

  // ========== UTILS ==========

  private shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const ai = arr[i];
      const aj = arr[j];
      if (ai !== undefined && aj !== undefined) {
        arr[i] = aj;
        arr[j] = ai;
      }
    }
    return arr;
  }
}
