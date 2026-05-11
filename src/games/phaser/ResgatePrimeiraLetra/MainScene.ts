import Phaser from 'phaser';
import type { GameCallbacks } from '@/games/core/types';
import {
  BUBBLE_TEXTURE_SIZE,
  EMOJI_DISPLAY_SIZE,
  emojiTextureKey,
  generateBubbleTextures,
  generateEmojiTextures,
  letterTextureKey,
} from './letterTextures';
import { playRoundComplete, playSuccess, playVictory, playWrong, speak } from './sound';
import { WORD_ROUNDS } from './words';

interface SceneInitData {
  callbacks?: GameCallbacks;
}

interface ActiveBubble {
  image: Phaser.GameObjects.Image;
  letter: string;
  isCorrect: boolean;
  startX: number;
  startY: number;
  baseScale: number;
}

interface SlotRefs {
  ring: Phaser.GameObjects.Graphics;
  glow: Phaser.GameObjects.Graphics;
  centerX: number;
  centerY: number;
  radius: number;
}

/**
 * Resgate da Primeira Letra — micro-jogo de alfabetização (3-6 anos).
 *
 * Mecânica: a criança vê uma palavra com a primeira letra ausente
 * (ex: "_ATO" + emoji 🐱) e arrasta a bolha com a letra correta para
 * o slot pulsante. 5 rodadas progressivas com distratores fonéticos.
 *
 * Sistema de pontuação: 10 base + speed (até 10) + combo (até 10).
 * Bônus de rodada sem erros: +20. Estrelas finais: 1-3 baseado em
 * score + erros.
 *
 * Captura: tempo_resposta, hesitacao, tentativas_multiplas,
 * conquista_streak, erro_conceitual, interacao_audio.
 */
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
  private roundErrors = 0;
  private hesitationTimer?: Phaser.Time.TimerEvent;

  private bubbles: ActiveBubble[] = [];
  private slot: SlotRefs | null = null;
  private slotPulseTween?: Phaser.Tweens.Tween;
  private prefixText?: Phaser.GameObjects.Text;
  private suffixText?: Phaser.GameObjects.Text;
  private emojiImage?: Phaser.GameObjects.Image;
  private hintText?: Phaser.GameObjects.Text;
  private audioButton?: Phaser.GameObjects.Container;

  private bgGraphics?: Phaser.GameObjects.Graphics;
  private headerBg?: Phaser.GameObjects.Rectangle;
  private headerProgress?: Phaser.GameObjects.Graphics;
  private scoreText?: Phaser.GameObjects.Text;
  private roundText?: Phaser.GameObjects.Text;
  private comboText?: Phaser.GameObjects.Text;
  private endOverlayItems: Phaser.GameObjects.GameObject[] = [];

  private phase: 'idle' | 'playing' | 'transition' | 'ended' = 'idle';

  constructor() {
    super({ key: 'ResgatePrimeiraLetraMain' });
  }

  init(data: SceneInitData) {
    if (data?.callbacks) {
      this.callbacks = data.callbacks;
    }
  }

  preload() {
    // Coleta todas as letras únicas (correta + distratores) p/ pré-gerar texturas.
    const allLetters: string[] = [];
    const allEmojis: string[] = [];
    for (const round of WORD_ROUNDS) {
      allLetters.push(round.correctLetter);
      for (const d of round.distractors) allLetters.push(d);
      allEmojis.push(round.emoji);
    }
    generateBubbleTextures(this, allLetters);
    generateEmojiTextures(this, allEmojis);
  }

  create() {
    this.currentRound = 0;
    this.totalScore = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.totalErrors = 0;
    this.totalCorrect = 0;
    this.roundErrors = 0;
    this.startedAt = Date.now();
    this.bubbles = [];
    this.endOverlayItems = [];
    this.phase = 'idle';

    this.drawBackground();
    this.createHeader();

    this.input.on(
      'dragstart',
      (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) => {
        if (this.phase !== 'playing') return;
        this.dragStartedAt = Date.now();
        this.cancelHesitationTimer();
        // Para o tween de flutuação — senão sobrescreve y e bloqueia drag vertical.
        this.stopFloatTween(gameObject);
        gameObject.setDepth(20);
        const baseScale = gameObject.getData('baseScale') as number;
        this.tweens.add({
          targets: gameObject,
          scale: baseScale * 1.12,
          duration: 130,
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

    this.input.on(
      'dragend',
      (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) => {
        if (this.phase !== 'playing') return;
        this.handleDragEnd(gameObject);
      },
    );

    this.scale.on('resize', this.handleResize, this);
    this.events.once('shutdown', () => {
      this.scale.off('resize', this.handleResize, this);
      this.cancelHesitationTimer();
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

    const availH = h - headerH - padding * 2;
    const availW = w - padding * 2;

    // Em portrait, distribuímos: emoji (15%) + palavra+slot (28%) + bolhas (45-55%)
    const emojiRatio = isPortrait ? 0.13 : 0.18;
    const wordRatio = isPortrait ? 0.4 : 0.45;
    const bubblesRatio = isPortrait ? 0.74 : 0.78;

    return {
      w,
      h,
      headerH,
      padding,
      isPortrait,
      availW,
      availH,
      emojiCenterY: headerH + padding + availH * emojiRatio,
      wordCenterY: headerH + padding + availH * wordRatio,
      bubblesCenterY: headerH + padding + availH * bubblesRatio,
    };
  }

  private computeBubbleSize(count: number): number {
    const { availW, isPortrait } = this.layout;
    const sectionW = availW / count;
    const maxSize = isPortrait ? 140 : 120;
    const minSize = 70;
    return Math.min(maxSize, Math.max(minSize, sectionW * 0.78));
  }

  private handleResize(gameSize: Phaser.Structs.Size) {
    if (!gameSize.width || !gameSize.height) return;
    this.repositionAll();
  }

  private repositionAll() {
    this.drawBackground();
    this.repositionHeader();
    this.repositionRound();
    this.repositionAudioButton();
    this.repositionEndOverlay();
  }

  // ========== ROUND LIFECYCLE ==========

  private startRound(idx: number) {
    this.currentRound = idx;
    this.phase = 'playing';
    this.roundErrors = 0;

    this.clearRoundObjects();

    const round = WORD_ROUNDS[idx];
    if (!round) return;

    const { w, emojiCenterY, wordCenterY, bubblesCenterY, availW } = this.layout;

    // Emoji renderizado como Image (Phaser.Text corta emojis)
    const emojiTargetSize = this.layout.isPortrait ? 110 : 120;
    const emojiBaseScale = emojiTargetSize / EMOJI_DISPLAY_SIZE;
    this.emojiImage = this.add
      .image(w / 2, emojiCenterY, emojiTextureKey(round.emoji))
      .setOrigin(0.5)
      .setScale(0)
      .setDepth(2);
    this.emojiImage.setData('baseScale', emojiBaseScale);
    this.tweens.add({
      targets: this.emojiImage,
      scale: emojiBaseScale,
      duration: 480,
      ease: 'Back.easeOut',
    });

    // Palavra com underscore + slot pulsante
    this.drawWordWithSlot(round.word, w / 2, wordCenterY);

    // Hint
    this.hintText = this.add
      .text(w / 2, wordCenterY + 80, '👇 Arraste a letra que começa a palavra!', {
        fontFamily: 'Nunito, sans-serif',
        fontSize: this.layout.isPortrait ? '15px' : '17px',
        fontStyle: '700',
        color: '#475569',
      })
      .setOrigin(0.5)
      .setAlpha(0.85)
      .setDepth(2);

    // Bolhas
    const allLetters = Phaser.Utils.Array.Shuffle([
      round.correctLetter,
      ...round.distractors,
    ]);
    const bubbleSize = this.computeBubbleSize(allLetters.length);
    const sectionW = (availW * 0.92) / allLetters.length;
    const leftEdge = (w - availW * 0.92) / 2;

    allLetters.forEach((letter, i) => {
      const x = leftEdge + sectionW * (i + 0.5);
      const y = bubblesCenterY;
      const isCorrect = letter === round.correctLetter;
      const bubble = this.createBubble(letter, x, y, bubbleSize, isCorrect, i);
      this.bubbles.push(bubble);
    });

    // Botão de áudio
    this.createAudioButton();

    // TTS automático ao começar a rodada (pode ser cancelado pelo usuário)
    this.time.delayedCall(450, () => {
      speak(round.word);
      this.callbacks?.onBehavior({
        type: 'interacao_audio',
        valor: { palavra: round.word, automatico: true },
      });
    });

    // Hesitação: se em 4s não tocar nenhuma bolha, registra
    this.scheduleHesitationTimer();

    this.updateHeader();
  }

  private drawWordWithSlot(word: string, centerX: number, centerY: number) {
    const fontSize = this.layout.isPortrait ? 56 : 64;
    const firstLetter = word.charAt(0);
    const restLetters = word.substring(1);
    const letterSpacing = 10;
    const gapBetweenSlotAndRest = 18; // espaço extra após a primeira letra

    // Resto da palavra (sem a primeira letra)
    this.suffixText = this.add
      .text(0, centerY, restLetters, {
        fontFamily: 'Nunito, sans-serif',
        fontSize: `${fontSize}px`,
        fontStyle: '900',
        color: '#1F2937',
      })
      .setOrigin(0, 0.5)
      .setLetterSpacing(letterSpacing)
      .setDepth(2);

    // Letra correta (inicialmente invisível — slot ocupa o lugar visual)
    this.prefixText = this.add
      .text(0, centerY, firstLetter, {
        fontFamily: 'Nunito, sans-serif',
        fontSize: `${fontSize}px`,
        fontStyle: '900',
        color: '#10B981',
      })
      .setOrigin(0.5)
      .setLetterSpacing(letterSpacing)
      .setAlpha(0)
      .setDepth(2);

    // Calcula tamanhos individuais e posiciona tudo centralizado
    const prefixWidth = this.prefixText.width;
    const suffixWidth = this.suffixText.width;
    const totalWidth = prefixWidth + gapBetweenSlotAndRest + suffixWidth;
    const startX = centerX - totalWidth / 2;

    this.prefixText.setX(startX + prefixWidth / 2);
    this.suffixText.setX(startX + prefixWidth + gapBetweenSlotAndRest);

    const slotCenterX = this.prefixText.x;
    const slotCenterY = centerY;
    const slotRadius = fontSize * 0.65;

    // Glow e ring do slot
    const glow = this.add.graphics().setDepth(1);
    const ring = this.add.graphics().setDepth(2);
    this.drawSlotGraphics(glow, ring, slotCenterX, slotCenterY, slotRadius, false);

    this.slot = {
      ring,
      glow,
      centerX: slotCenterX,
      centerY: slotCenterY,
      radius: slotRadius,
    };

    // Pulsação suave do anel
    this.slotPulseTween = this.tweens.add({
      targets: ring,
      alpha: { from: 0.65, to: 1 },
      duration: 750,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  private drawSlotGraphics(
    glow: Phaser.GameObjects.Graphics,
    ring: Phaser.GameObjects.Graphics,
    x: number,
    y: number,
    radius: number,
    filled: boolean,
  ) {
    glow.clear();
    ring.clear();

    // Glow externo (4 níveis de translucidez)
    const baseGlow = filled ? 0x22c55e : 0xfbbf24;
    glow.fillStyle(baseGlow, 0.12);
    glow.fillCircle(x, y, radius * 1.55);
    glow.fillStyle(baseGlow, 0.18);
    glow.fillCircle(x, y, radius * 1.3);
    glow.fillStyle(baseGlow, 0.25);
    glow.fillCircle(x, y, radius * 1.1);

    // Anel pontilhado externo
    const ringColor = filled ? 0x16a34a : 0xeab308;
    ring.lineStyle(4, ringColor, 1);
    this.drawDashedCircle(ring, x, y, radius, 8, 5);
    // Anel sólido interno
    ring.lineStyle(2.5, ringColor, 0.7);
    ring.strokeCircle(x, y, radius * 0.85);
  }

  private drawDashedCircle(
    g: Phaser.GameObjects.Graphics,
    cx: number,
    cy: number,
    r: number,
    dashLen: number,
    gapLen: number,
  ) {
    const circumference = 2 * Math.PI * r;
    const totalDash = dashLen + gapLen;
    const dashes = Math.floor(circumference / totalDash);
    const dashAngle = (dashLen / circumference) * 2 * Math.PI;
    const stepAngle = (2 * Math.PI) / dashes;

    g.beginPath();
    for (let i = 0; i < dashes; i++) {
      const start = i * stepAngle;
      const end = start + dashAngle;
      g.moveTo(cx + r * Math.cos(start), cy + r * Math.sin(start));
      g.arc(cx, cy, r, start, end, false);
    }
    g.strokePath();
  }

  private createBubble(
    letter: string,
    x: number,
    y: number,
    size: number,
    isCorrect: boolean,
    delayIdx: number,
  ): ActiveBubble {
    const baseScale = size / BUBBLE_TEXTURE_SIZE;

    // Image direto com letra já desenhada na textura — drag tem hit area
    // exata do pixel (Phaser usa o tamanho da textura), sem desalinhamento.
    const image = this.add
      .image(x, y, letterTextureKey(letter, 'neutral'))
      .setInteractive({ useHandCursor: true, pixelPerfect: false })
      .setScale(0)
      .setDepth(3);

    image.setData('letter', letter);
    image.setData('isCorrect', isCorrect);
    image.setData('startX', x);
    image.setData('startY', y);
    image.setData('baseScale', baseScale);
    this.input.setDraggable(image);

    // Hit area circular ajustada à bolha visível (raio 0.5 do TEXTURE_SIZE).
    if (image.input?.hitArea) {
      image.input.hitArea = new Phaser.Geom.Circle(
        BUBBLE_TEXTURE_SIZE / 2,
        BUBBLE_TEXTURE_SIZE / 2,
        BUBBLE_TEXTURE_SIZE * 0.5,
      );
      image.input.hitAreaCallback = Phaser.Geom.Circle.Contains;
    }

    // Entrada com escala
    this.tweens.add({
      targets: image,
      scale: baseScale,
      duration: 420,
      ease: 'Back.easeOut',
      delay: 80 + delayIdx * 90,
    });

    // Flutuação contínua sutil — pausada no dragstart (senão sobrescreve y).
    this.startFloatTween(image, y, delayIdx);

    return { image, letter, isCorrect, startX: x, startY: y, baseScale };
  }

  private startFloatTween(
    image: Phaser.GameObjects.Image,
    baseY: number,
    delayIdx: number,
  ) {
    const existing = image.getData('floatTween') as Phaser.Tweens.Tween | undefined;
    existing?.stop();

    const tween = this.tweens.add({
      targets: image,
      y: baseY + Phaser.Math.Between(-12, -6),
      duration: Phaser.Math.Between(1700, 2400),
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      delay: delayIdx === undefined ? 0 : 600 + delayIdx * 250,
    });
    image.setData('floatTween', tween);
  }

  private stopFloatTween(image: Phaser.GameObjects.Image) {
    // Guard contra image destruída (handleCorrect destrói a bolha após acertar)
    if (!image.scene) return;
    const tween = image.getData('floatTween') as Phaser.Tweens.Tween | undefined;
    tween?.stop();
    image.setData('floatTween', null);
  }

  private createAudioButton() {
    const { w, h } = this.layout;
    const bx = w - 36;
    const by = h - 36;
    const r = 24;

    const container = this.add.container(bx, by).setDepth(40);
    const bg = this.add.graphics();
    bg.fillStyle(0xffffff, 0.95);
    bg.fillCircle(0, 0, r);
    bg.lineStyle(2, 0x6b46c1, 0.7);
    bg.strokeCircle(0, 0, r);
    container.add(bg);

    const icon = this.add
      .text(0, 0, '🔊', { fontSize: '22px' })
      .setOrigin(0.5);
    container.add(icon);

    bg.setInteractive({
      hitArea: new Phaser.Geom.Circle(0, 0, r),
      hitAreaCallback: Phaser.Geom.Circle.Contains,
      useHandCursor: true,
    });
    bg.on('pointerup', () => {
      if (this.phase !== 'playing') return;
      const round = WORD_ROUNDS[this.currentRound];
      if (!round) return;
      speak(round.audioCue);
      this.callbacks?.onBehavior({
        type: 'interacao_audio',
        valor: { palavra: round.word, automatico: false },
      });
      this.tweens.add({
        targets: container,
        scale: { from: 0.85, to: 1 },
        duration: 250,
        ease: 'Back.easeOut',
      });
    });

    this.audioButton = container;
  }

  private repositionAudioButton() {
    if (!this.audioButton) return;
    const { w, h } = this.layout;
    this.audioButton.setPosition(w - 36, h - 36);
  }

  private repositionRound() {
    if (this.bubbles.length === 0) return;
    const { w, emojiCenterY, wordCenterY, bubblesCenterY, availW } = this.layout;

    if (this.emojiImage) {
      this.emojiImage.setPosition(w / 2, emojiCenterY);
      const newSize = this.layout.isPortrait ? 110 : 120;
      const newScale = newSize / EMOJI_DISPLAY_SIZE;
      this.emojiImage.setScale(newScale);
      this.emojiImage.setData('baseScale', newScale);
    }

    if (this.prefixText && this.suffixText) {
      const fontSize = this.layout.isPortrait ? 56 : 64;
      const gapBetweenSlotAndRest = 18;

      this.prefixText.setFontSize(fontSize);
      this.suffixText.setFontSize(fontSize);
      this.prefixText.setY(wordCenterY);
      this.suffixText.setY(wordCenterY);

      const prefixWidth = this.prefixText.width;
      const suffixWidth = this.suffixText.width;
      const totalWidth = prefixWidth + gapBetweenSlotAndRest + suffixWidth;
      const startX = w / 2 - totalWidth / 2;

      this.prefixText.setX(startX + prefixWidth / 2);
      this.suffixText.setX(startX + prefixWidth + gapBetweenSlotAndRest);

      if (this.slot) {
        const newSlotX = this.prefixText.x;
        const newSlotY = wordCenterY;
        const newRadius = fontSize * 0.65;
        this.slot.centerX = newSlotX;
        this.slot.centerY = newSlotY;
        this.slot.radius = newRadius;
        this.drawSlotGraphics(
          this.slot.glow,
          this.slot.ring,
          newSlotX,
          newSlotY,
          newRadius,
          false,
        );
      }
    }

    this.hintText?.setPosition(w / 2, wordCenterY + 80);
    this.hintText?.setFontSize(this.layout.isPortrait ? 15 : 17);

    // Reposiciona bolhas
    const bubbleSize = this.computeBubbleSize(this.bubbles.length);
    const sectionW = (availW * 0.92) / this.bubbles.length;
    const leftEdge = (w - availW * 0.92) / 2;
    const baseScale = bubbleSize / BUBBLE_TEXTURE_SIZE;

    this.bubbles.forEach((b, i) => {
      const newX = leftEdge + sectionW * (i + 0.5);
      const newY = bubblesCenterY;
      const draggable = b.image.input?.draggable ?? false;
      if (draggable) {
        // Ainda arrastável → reposiciona no slot inicial
        b.image.x = newX;
        b.image.y = newY;
        b.image.setScale(baseScale);
      } else if (this.slot) {
        // Já encaixou no slot → segue o slot
        b.image.x = this.slot.centerX;
        b.image.y = this.slot.centerY;
        b.image.setScale(baseScale * 0.9);
      }
      b.startX = newX;
      b.startY = newY;
      b.baseScale = baseScale;
      b.image.setData('startX', newX);
      b.image.setData('startY', newY);
      b.image.setData('baseScale', baseScale);
    });
  }

  private clearRoundObjects() {
    this.cancelHesitationTimer();
    this.bubbles.forEach((b) => {
      if (!b.image.scene) return; // já destruída (acerto)
      this.stopFloatTween(b.image);
      b.image.destroy();
    });
    this.bubbles = [];
    this.slotPulseTween?.stop();
    this.slotPulseTween = undefined;
    this.slot?.glow.destroy();
    this.slot?.ring.destroy();
    this.slot = null;
    this.prefixText?.destroy();
    this.prefixText = undefined;
    this.suffixText?.destroy();
    this.suffixText = undefined;
    this.emojiImage?.destroy();
    this.emojiImage = undefined;
    this.hintText?.destroy();
    this.hintText = undefined;
    this.audioButton?.destroy();
    this.audioButton = undefined;
  }

  // ========== INTERAÇÃO ==========

  private handleDragEnd(image: Phaser.GameObjects.Image) {
    const letter = image.getData('letter') as string;
    const isCorrect = image.getData('isCorrect') as boolean;
    const startX = image.getData('startX') as number;
    const startY = image.getData('startY') as number;
    const baseScale = image.getData('baseScale') as number;
    const tempoMs = Date.now() - this.dragStartedAt;

    if (!this.slot) return;

    const dist = Phaser.Math.Distance.Between(
      image.x,
      image.y,
      this.slot.centerX,
      this.slot.centerY,
    );
    const tolerance = Math.max(80, this.slot.radius * 1.4);

    this.callbacks?.onBehavior({
      type: 'tempo_resposta',
      valor: { ms: tempoMs, letra: letter, distancia: Math.round(dist) },
    });

    if (dist < tolerance && isCorrect) {
      this.handleCorrect(image, letter, tempoMs, baseScale);
    } else {
      this.handleWrong(image, startX, startY, letter, baseScale, dist < tolerance);
    }
  }

  private handleCorrect(
    image: Phaser.GameObjects.Image,
    letter: string,
    tempoMs: number,
    baseScale: number,
  ) {
    if (!this.slot) return;
    this.phase = 'transition';
    this.cancelHesitationTimer();

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
      valor: { acerto: true, letra: letter, streak: this.streak, points },
    });

    playSuccess();

    // Troca para variante verde + snap p/ slot
    image.setTexture(letterTextureKey(letter, 'correct'));
    this.tweens.add({
      targets: image,
      x: this.slot.centerX,
      y: this.slot.centerY,
      scale: baseScale * 0.92,
      duration: 320,
      ease: 'Back.easeOut',
      onComplete: () => {
        if (!this.slot) return;
        // Captura coords antes de completeWord(), que seta this.slot = null
        const slotX = this.slot.centerX;
        const slotY = this.slot.centerY;
        this.emitSparkles(slotX, slotY, 18);
        this.completeWord(letter);
        this.showFloatingText(slotX, slotY - 70, `+${points}`, '#10B981', 24);
        if (this.streak >= 3) {
          this.showFloatingText(
            slotX,
            slotY - 100,
            `🔥 Combo ${this.streak}!`,
            '#F59E0B',
            18,
          );
        }
        // Bolha "absorvida" pela palavra — fade + encolhe enquanto wordText
        // revela a letra correta no lugar.
        this.tweens.add({
          targets: image,
          alpha: 0,
          scale: baseScale * 0.4,
          duration: 380,
          delay: 120,
          ease: 'Cubic.easeIn',
          onComplete: () => image.destroy(),
        });
        this.time.delayedCall(1500, () => {
          const next = this.currentRound + 1;
          if (next >= WORD_ROUNDS.length) {
            this.endGame();
          } else {
            playRoundComplete();
            this.startRound(next);
          }
        });
      },
    });

    this.updateHeader();
  }

  private completeWord(letter: string) {
    if (!this.prefixText || !this.suffixText || !this.slot) return;

    const round = WORD_ROUNDS[this.currentRound];
    if (!round) return;

    // Slot some completamente (fade out + destroy depois)
    this.slotPulseTween?.stop();
    this.slotPulseTween = undefined;
    const slotRefs = this.slot;
    this.tweens.add({
      targets: [slotRefs.glow, slotRefs.ring],
      alpha: 0,
      duration: 280,
      onComplete: () => {
        slotRefs.glow.destroy();
        slotRefs.ring.destroy();
      },
    });
    this.slot = null;

    // Letra correta aparece na posição exata do slot, com pop celebratório
    this.prefixText.setAlpha(0).setScale(0.5);
    this.tweens.add({
      targets: this.prefixText,
      alpha: 1,
      scale: 1.15,
      duration: 280,
      ease: 'Back.easeOut',
      onComplete: () => {
        if (!this.prefixText) return;
        this.tweens.add({
          targets: this.prefixText,
          scale: 1,
          duration: 180,
          ease: 'Sine.easeOut',
        });
      },
    });

    // Esconde hint
    if (this.hintText) {
      this.tweens.add({
        targets: this.hintText,
        alpha: 0,
        duration: 200,
      });
    }

    // Pronuncia a palavra completa
    speak(round.word);
    void letter;
  }

  private handleWrong(
    image: Phaser.GameObjects.Image,
    startX: number,
    startY: number,
    letter: string,
    baseScale: number,
    droppedInsideSlot: boolean,
  ) {
    this.streak = 0;
    this.totalErrors++;
    this.roundErrors++;

    const round = WORD_ROUNDS[this.currentRound];
    this.callbacks?.onBehavior({
      type: 'tentativas_multiplas',
      valor: {
        letra_arrastada: letter,
        letra_correta: round?.correctLetter,
        dentro_slot: droppedInsideSlot,
        round_errors: this.roundErrors,
      },
    });

    if (droppedInsideSlot && round && letter !== round.correctLetter) {
      this.callbacks?.onBehavior({
        type: 'erro_conceitual',
        valor: { confundiu: letter, com: round.correctLetter, palavra: round.word },
      });
    }

    playWrong();

    image.setTexture(letterTextureKey(letter, 'wrong'));

    // Tremida horizontal antes de retornar
    this.tweens.add({
      targets: image,
      x: { from: image.x - 10, to: image.x + 10 },
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
          onComplete: () => {
            image.setTexture(letterTextureKey(letter, 'neutral'));
            if (this.phase !== 'playing') return;
            image.setDepth(3);
            this.startFloatTween(image, startY, 0);
          },
        });
      },
    });

    this.showFloatingText(image.x, image.y - 50, 'Quase! 💪', '#EF4444', 18);
    this.scheduleHesitationTimer();
    this.updateHeader();
  }

  // ========== HESITAÇÃO ==========

  private scheduleHesitationTimer() {
    this.cancelHesitationTimer();
    this.hesitationTimer = this.time.delayedCall(4000, () => {
      if (this.phase !== 'playing') return;
      this.callbacks?.onBehavior({
        type: 'hesitacao',
        valor: { duracao_ms: 4000, palavra: WORD_ROUNDS[this.currentRound]?.word },
      });
      // Pulsa as bolhas levemente p/ chamar atenção
      this.bubbles.forEach((b) => {
        const draggable = b.image.input?.draggable ?? false;
        if (!draggable) return;
        this.tweens.add({
          targets: b.image,
          scale: { from: b.baseScale, to: b.baseScale * 1.08 },
          duration: 200,
          yoyo: true,
          repeat: 1,
        });
      });
    });
  }

  private cancelHesitationTimer() {
    this.hesitationTimer?.remove(false);
    this.hesitationTimer = undefined;
  }

  // ========== FIM DE JOGO ==========

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
      conceitosTrabalhados: ['leitura', 'alfabetizacao', 'consciencia-fonologica'],
    });

    this.showEndScreen(stars);
  }

  private computeStars(): 1 | 2 | 3 {
    if (this.totalScore >= 110 && this.totalErrors <= 1) return 3;
    if (this.totalScore >= 75) return 2;
    return 1;
  }

  // ========== UI / HEADER / BACKGROUND ==========

  private drawBackground() {
    const { w, h } = this.layout;
    if (this.bgGraphics) this.bgGraphics.destroy();
    const bg = this.add.graphics();
    bg.setDepth(-10);
    bg.fillStyle(0xeff6ff, 1);
    bg.fillRect(0, 0, w, h);

    // Círculos decorativos sempre 100% dentro da viewport: centro afastado
    // da borda mais próxima por pelo menos `r * 1.05` (margem de segurança).
    const minDim = Math.min(w, h);
    const r1 = minDim * 0.13;
    const r2 = minDim * 0.15;
    const r3 = minDim * 0.1;
    const r4 = minDim * 0.09;
    const margin = 1.05;

    bg.fillStyle(0xfef3c7, 0.4);
    bg.fillCircle(r1 * margin, r1 * margin, r1);
    bg.fillStyle(0xc7d2fe, 0.5);
    bg.fillCircle(w - r2 * margin, h - r2 * margin, r2);
    bg.fillStyle(0xfbcfe8, 0.4);
    bg.fillCircle(w - r3 * margin, r3 * margin, r3);
    bg.fillStyle(0xa5f3fc, 0.4);
    bg.fillCircle(r4 * margin, h - r4 * margin, r4);

    this.bgGraphics = bg;
  }

  private createHeader() {
    const { w, headerH } = this.layout;
    this.headerBg = this.add.rectangle(w / 2, headerH / 2, w - 24, headerH - 16, 0xffffff, 0.92);
    this.headerBg.setStrokeStyle(2, 0xc7d2fe, 1);
    this.headerBg.setDepth(15);

    this.roundText = this.add.text(24, 18, '', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '16px',
      fontStyle: '900',
      color: '#3730A3',
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
    this.roundText.setText(`Palavra ${this.currentRound + 1}/${WORD_ROUNDS.length}`);
    this.scoreText.setText(`★ ${this.totalScore}`);
    this.comboText.setText(this.streak >= 2 ? `🔥 x${this.streak}` : '');

    const { w } = this.layout;
    this.headerProgress.clear();
    const prog =
      this.phase === 'ended' ? 1 : this.currentRound / WORD_ROUNDS.length;
    const barW = w - 32;
    this.headerProgress.fillStyle(0xe0e7ff, 1);
    this.headerProgress.fillRoundedRect(16, 60, barW, 6, 3);
    this.headerProgress.fillStyle(0x3b82f6, 1);
    this.headerProgress.fillRoundedRect(16, 60, barW * prog, 6, 3);
  }

  // ========== EFEITOS ==========

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

  private emitSparkles(x: number, y: number, qty = 14) {
    const emitter = this.add.particles(x, y, 'letter-sparkle', {
      speed: { min: 110, max: 250 },
      scale: { start: 0.95, end: 0 },
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

  // ========== END SCREEN ==========

  private showEndScreen(stars: 1 | 2 | 3) {
    const { w, h } = this.layout;

    const overlay = this.add.rectangle(0, 0, w, h, 0x1f2937, 0.6);
    overlay.setOrigin(0);
    overlay.setDepth(50);
    this.endOverlayItems.push(overlay);

    const cardW = Math.min(440, w - 40);
    const cardH = 340;
    const cardX = w / 2;
    const cardY = h / 2;
    const card = this.add.graphics();
    card.fillStyle(0xffffff, 1);
    card.fillRoundedRect(cardX - cardW / 2, cardY - cardH / 2, cardW, cardH, 24);
    card.lineStyle(4, 0xfcd34d, 1);
    card.strokeRoundedRect(cardX - cardW / 2, cardY - cardH / 2, cardW, cardH, 24);
    card.setDepth(51);
    this.endOverlayItems.push(card);

    const title = this.add.text(cardX, cardY - 120, '📖 Parabéns! 📖', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '30px',
      fontStyle: '900',
      color: '#3730A3',
    });
    title.setOrigin(0.5);
    title.setDepth(52);
    this.endOverlayItems.push(title);

    const subtitle = this.add.text(cardX, cardY - 80, 'Você é um leitor iniciante!', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '15px',
      fontStyle: '700',
      color: '#6B7280',
    });
    subtitle.setOrigin(0.5);
    subtitle.setDepth(52);
    this.endOverlayItems.push(subtitle);

    for (let i = 0; i < 3; i++) {
      const earned = i < stars;
      const sx = cardX - 70 + i * 70;
      const sy = cardY - 20;
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

    const scoreLabel = this.add.text(cardX, cardY + 50, `${this.totalScore} pontos`, {
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
      cardY + 80,
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

    const btnY = cardY + 130;
    const btnW = 240;
    const btnH = 56;
    const btnBg = this.add.graphics();
    btnBg.fillStyle(0x3b82f6, 1);
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
    if (this.phase !== 'ended') return;
    this.endOverlayItems.forEach((item) => item.destroy());
    this.endOverlayItems = [];
    this.showEndScreen(this.computeStars());
  }
}
