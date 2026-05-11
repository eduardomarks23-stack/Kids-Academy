/**
 * ReadingScene.ts
 * Cena principal do Phaser 3 para o treino "Resgate da Primeira Letra".
 * 
 * ARQUITETURA DE PONTE (Event Emitter Pattern):
 * ─────────────────────────────────────────────
 * A comunicação entre Phaser e React é feita via EventTarget nativo do DOM,
 * acessível globalmente em window. Isso evita acoplamento direto entre
 * a engine de jogo e o framework de UI.
 * 
 * Fluxo de eventos:
 *   ReadingScene (Phaser) ──dispatchEvent──► window ──addEventListener──► ReadingTrainingModule (React)
 * 
 * Por que não usar refs ou callbacks diretos?
 * - Phaser roda em um loop de renderização independente do React reconciler.
 * - Passar callbacks diretas criaria closures stale e memory leaks.
 * - EventTarget é a forma mais limpa e desacoplada de comunicação cross-layer.
 */

import Phaser from 'phaser';
import {
  TRAINING_WORDS,
  ON_TRAINING_COMPLETE,
  ON_WORD_COMPLETED,
  ON_WRONG_ATTEMPT,
  type TrainingWord,
} from './readingGameConfig';

// ─── Constantes de Estilo ───
const COLORS = {
  bubbleFill: 0x60a5fa,      // Azul claro (Tailwind blue-400)
  bubbleStroke: 0x3b82f6,    // Azul médio (Tailwind blue-500)
  bubbleWrong: 0xf87171,     // Vermelho claro (Tailwind red-400)
  bubbleCorrect: 0x4ade80,   // Verde (Tailwind green-400)
  textMain: '#1e293b',       // Slate-800
  textLight: '#ffffff',
  targetSlot: 0xe2e8f0,      // Slate-200
  targetSlotActive: 0xfcd34d, // Amber-300
} as const;

const SIZES = {
  bubbleRadius: 48,
  targetSlotWidth: 80,
  targetSlotHeight: 100,
  fontSizeBubble: '48px',
  fontSizeWord: '72px',
  fontSizeEmoji: '120px',
} as const;

// ─── Tipos Internos ───
interface BubbleData {
  letter: string;
  isCorrect: boolean;
  originalX: number;
  originalY: number;
}

export class ReadingScene extends Phaser.Scene {
  /** Índice da palavra atual no array TRAINING_WORDS */
  private currentWordIndex: number = 0;

  /** Flag para evitar interações durante transições */
  private isTransitioning: boolean = false;

  /** Referências aos objetos da cena */
  private bubbles: Phaser.GameObjects.Container[] = [];
  private targetSlot!: Phaser.GameObjects.Rectangle;
  private wordText!: Phaser.GameObjects.Text;
  private emojiText!: Phaser.GameObjects.Text;
  private instructionText!: Phaser.GameObjects.Text;
  private particles!: Phaser.GameObjects.Particles.ParticleEmitterManager;

  constructor() {
    super({ key: 'ReadingScene' });
  }

  // ═══════════════════════════════════════════════════
  //  LIFECYCLE: CREATE
  // ═══════════════════════════════════════════════════
  create(): void {
    this.currentWordIndex = 0;
    this.isTransitioning = false;
    this.setupParticles();
    this.loadWordRound(this.currentWordIndex);
  }

  // ═══════════════════════════════════════════════════
  //  CONFIGURAÇÃO DE PARTÍCULAS (EFEITO DE BRILHO)
  // ═══════════════════════════════════════════════════
  private setupParticles(): void {
    // Cria uma textura procedural para as partículas (círculo branco)
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0xffffff, 1);
    graphics.fillCircle(4, 4, 4);
    graphics.generateTexture('particle', 8, 8);
    graphics.destroy();
  }

  // ═══════════════════════════════════════════════════
  //  CARREGAMENTO DE UMA RODADA
  // ═══════════════════════════════════════════════════
  private loadWordRound(index: number): void {
    if (index >= TRAINING_WORDS.length) {
      this.emitTrainingComplete();
      return;
    }

    // Limpa objetos da rodada anterior
    this.clearRoundObjects();

    const wordData = TRAINING_WORDS[index];
    const { width, height } = this.scale;
    const centerX = width / 2;
    const centerY = height / 2;

    // ─── Emoji da palavra (centro superior) ───
    this.emojiText = this.add
      .text(centerX, centerY - 120, wordData.imageEmoji, {
        fontSize: SIZES.fontSizeEmoji,
        align: 'center',
      })
      .setOrigin(0.5);

    // Animação de entrada do emoji
    this.tweens.add({
      targets: this.emojiText,
      scale: { from: 0, to: 1 },
      duration: 500,
      ease: 'Back.out',
    });

    // ─── Texto da palavra com slot vazio ───
    this.wordText = this.add
      .text(centerX, centerY + 20, wordData.displayWord, {
        fontSize: SIZES.fontSizeWord,
        color: COLORS.textMain,
        fontFamily: 'Nunito, sans-serif',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // ─── Slot alvo (área onde a letra deve ser solta) ───
    // Calcula a posição do underscore na palavra para posicionar o slot
    const slotX = this.wordText.x - this.wordText.width / 2 + 30;
    this.targetSlot = this.add
      .rectangle(
        slotX,
        this.wordText.y,
        SIZES.targetSlotWidth,
        SIZES.targetSlotHeight,
        COLORS.targetSlot,
        0.6
      )
      .setStrokeStyle(3, COLORS.targetSlotActive)
      .setOrigin(0.5);

    // Animação pulsante do slot
    this.tweens.add({
      targets: this.targetSlot,
      scaleX: { from: 1, to: 1.05 },
      scaleY: { from: 1, to: 1.05 },
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.inOut',
    });

    // ─── Instrução ───
    this.instructionText = this.add
      .text(centerX, height - 40, '👆 Arraste a letra certa para o espaço!', {
        fontSize: '24px',
        color: '#64748b',
        fontFamily: 'Nunito, sans-serif',
      })
      .setOrigin(0.5)
      .setAlpha(0.8);

    // ─── Criação das bolhas flutuantes ───
    this.createFloatingBubbles(wordData, centerX, centerY + 140);
  }

  // ═══════════════════════════════════════════════════
  //  CRIAÇÃO DAS BOLHAS FLUTUANTES (DRAG & DROP)
  // ═══════════════════════════════════════════════════
  private createFloatingBubbles(
    wordData: TrainingWord,
    baseX: number,
    baseY: number
  ): void {
    const allLetters = [wordData.correctLetter, ...wordData.distractors];
    // Embaralha as letras
    const shuffled = Phaser.Utils.Array.Shuffle([...allLetters]);

    const spacing = 160;
    const startX = baseX - ((shuffled.length - 1) * spacing) / 2;

    shuffled.forEach((letter, i) => {
      const x = startX + i * spacing;
      const y = baseY + Phaser.Math.Between(-20, 20);

      // Container da bolha (círculo + texto)
      const bubble = this.createBubble(letter, x, y, letter === wordData.correctLetter);
      this.bubbles.push(bubble);

      // Animação de flutuação contínua (movimento vertical suave)
      this.tweens.add({
        targets: bubble,
        y: y + Phaser.Math.Between(10, 25),
        duration: Phaser.Math.Between(1500, 2500),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.inOut',
        delay: i * 200,
      });
    });
  }

  // ═══════════════════════════════════════════════════
  //  CONSTRUÇÃO DE UMA BOLHA INDIVIDUAL
  // ═══════════════════════════════════════════════════
  private createBubble(
    letter: string,
    x: number,
    y: number,
    isCorrect: boolean
  ): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);

    // Círculo de fundo
    const circle = this.add
      .circle(0, 0, SIZES.bubbleRadius, COLORS.bubbleFill)
      .setStrokeStyle(4, COLORS.bubbleStroke);

    // Texto da letra
    const text = this.add
      .text(0, 0, letter, {
        fontSize: SIZES.fontSizeBubble,
        color: COLORS.textLight,
        fontFamily: 'Nunito, sans-serif',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    container.add([circle, text]);

    // Armazena metadados no container para recuperação posterior
    const bubbleData: BubbleData = {
      letter,
      isCorrect,
      originalX: x,
      originalY: y,
    };
    container.setData('bubbleData', bubbleData);

    // ─── Configuração do Drag & Drop ───
    circle.setInteractive({ draggable: true, cursor: 'grab' });

    // IMPORTANTE: O evento de drag é vinculado ao círculo, mas movemos o container inteiro
    circle.on('dragstart', (_pointer: Phaser.Input.Pointer) => {
      if (this.isTransitioning) return;

      this.tweens.add({
        targets: container,
        scale: 1.15,
        duration: 150,
        ease: 'Back.out',
      });
      // Traz para frente de todos os outros objetos
      this.children.bringToTop(container);
    });

    circle.on(
      'drag',
      (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
        if (this.isTransitioning) return;
        container.setPosition(dragX, dragY);
      }
    );

    circle.on('dragend', (_pointer: Phaser.Input.Pointer) => {
      if (this.isTransitioning) return;
      this.handleDrop(container, circle, text, isCorrect);
    });

    return container;
  }

  // ═══════════════════════════════════════════════════
  //  LÓGICA DE DROP E VERIFICAÇÃO
  // ═══════════════════════════════════════════════════
  private handleDrop(
    container: Phaser.GameObjects.Container,
    circle: Phaser.GameObjects.Arc,
    text: Phaser.GameObjects.Text,
    isCorrect: boolean
  ): void {
    const bubbleData = container.getData('bubbleData') as BubbleData;

    // Verifica overlap com o slot alvo
    const bounds = container.getBounds();
    const targetBounds = this.targetSlot.getBounds();

    const isOverTarget = Phaser.Geom.Intersects.RectangleToRectangle(
      bounds,
      targetBounds
    );

    if (isOverTarget && isCorrect) {
      // ═══ ACERTO ═══
      this.handleCorrectDrop(container, circle, text, bubbleData);
    } else {
      // ═══ ERRO (ou soltou fora do alvo) ═══
      this.handleWrongDrop(container, circle, bubbleData);
    }
  }

  // ═══════════════════════════════════════════════════
  //  ACERTO: ANIMAÇÃO DE SUCESSO
  // ═══════════════════════════════════════════════════
  private handleCorrectDrop(
    container: Phaser.GameObjects.Container,
    circle: Phaser.GameObjects.Arc,
    text: Phaser.GameObjects.Text,
    bubbleData: BubbleData
  ): void {
    this.isTransitioning = true;

    const wordData = TRAINING_WORDS[this.currentWordIndex];

    // 1. Posiciona a bolha exatamente no slot
    this.tweens.add({
      targets: container,
      x: this.targetSlot.x,
      y: this.targetSlot.y,
      scale: 1,
      duration: 300,
      ease: 'Power2',
      onComplete: () => {
        // 2. Muda cor para verde (feedback positivo)
        circle.setFillStyle(COLORS.bubbleCorrect);
        circle.setStrokeStyle(4, 0x22c55e);

        // 3. Efeito de brilho com partículas
        this.createSparkleEffect(container.x, container.y);

        // 4. Completa a palavra na tela
        this.completeWordAnimation(wordData);

        // 5. Emite evento para o React
        this.emitWordCompleted(wordData);

        // 6. Aguarda e avança para próxima rodada
        this.time.delayedCall(2000, () => {
          this.currentWordIndex++;
          this.isTransitioning = false;
          this.loadWordRound(this.currentWordIndex);
        });
      },
    });
  }

  // ═══════════════════════════════════════════════════
  //  ERRO: ANIMAÇÃO DE ESTOURO E RETORNO
  // ═══════════════════════════════════════════════════
  private handleWrongDrop(
    container: Phaser.GameObjects.Container,
    circle: Phaser.GameObjects.Arc,
    bubbleData: BubbleData
  ): void {
    // Feedback visual de erro (pisca vermelho)
    const originalFill = circle.fillColor;
    circle.setFillStyle(COLORS.bubbleWrong);

    // Efeito de "estouro" — encolhe e volta
    this.tweens.add({
      targets: container,
      scaleX: 0.8,
      scaleY: 0.8,
      duration: 100,
      yoyo: true,
      ease: 'Quad.easeInOut',
      onComplete: () => {
        // Retorna à posição original
        this.tweens.add({
          targets: container,
          x: bubbleData.originalX,
          y: bubbleData.originalY,
          scale: 1,
          duration: 400,
          ease: 'Power2',
          onComplete: () => {
            circle.setFillStyle(originalFill);
          },
        });
      },
    });

    // Emite evento de tentativa incorreta
    this.emitWrongAttempt(bubbleData.letter);
  }

  // ═══════════════════════════════════════════════════
  //  ANIMAÇÃO DE COMPLETAR A PALAVRA
  // ═══════════════════════════════════════════════════
  private completeWordAnimation(wordData: TrainingWord): void {
    // Substitui o underscore pela letra correta
    const completedWord = wordData.word;

    this.wordText.setText(completedWord);
    this.wordText.setColor('#16a34a'); // Verde escuro

    // Animação de escala celebratória
    this.tweens.add({
      targets: this.wordText,
      scale: { from: 1, to: 1.3 },
      duration: 400,
      yoyo: true,
      ease: 'Back.out',
    });

    // Esconde o slot (não precisa mais dele)
    this.tweens.add({
      targets: this.targetSlot,
      alpha: 0,
      duration: 200,
    });
  }

  // ═══════════════════════════════════════════════════
  //  EFEITO DE PARTÍCULAS (BRILHO)
  // ═══════════════════════════════════════════════════
  private createSparkleEffect(x: number, y: number): void {
    const emitter = this.add.particles(x, y, 'particle', {
      speed: { min: 50, max: 150 },
      scale: { start: 1, end: 0 },
      lifespan: 800,
      quantity: 20,
      tint: [0xfcd34d, 0x4ade80, 0x60a5fa],
      emitting: false,
    });

    emitter.explode(30, x, y);

    // Limpa o emitter após a animação
    this.time.delayedCall(1000, () => {
      emitter.destroy();
    });
  }

  // ═══════════════════════════════════════════════════
  //  LIMPEZA DE OBJETOS DA RODADA
  // ═══════════════════════════════════════════════════
  private clearRoundObjects(): void {
    // Destrói todas as bolhas
    this.bubbles.forEach((bubble) => bubble.destroy());
    this.bubbles = [];

    // Destrói outros objetos se existirem
    if (this.emojiText) this.emojiText.destroy();
    if (this.wordText) this.wordText.destroy();
    if (this.targetSlot) this.targetSlot.destroy();
    if (this.instructionText) this.instructionText.destroy();
  }

  // ═══════════════════════════════════════════════════
  //  EMISSÃO DE EVENTOS (PONTE PHASER → REACT)
  // ═══════════════════════════════════════════════════
  private emitTrainingComplete(): void {
    window.dispatchEvent(
      new CustomEvent(ON_TRAINING_COMPLETE, {
        detail: {
          totalWords: TRAINING_WORDS.length,
          timestamp: Date.now(),
        },
      })
    );
  }

  private emitWordCompleted(wordData: TrainingWord): void {
    window.dispatchEvent(
      new CustomEvent(ON_WORD_COMPLETED, {
        detail: {
          wordIndex: this.currentWordIndex,
          word: wordData.word,
          letter: wordData.correctLetter,
        },
      })
    );
  }

  private emitWrongAttempt(letter: string): void {
    window.dispatchEvent(
      new CustomEvent(ON_WRONG_ATTEMPT, {
        detail: { letter, wordIndex: this.currentWordIndex },
      })
    );
  }

  // ═══════════════════════════════════════════════════
  //  LIFECYCLE: SHUTDOWN (limpeza ao destruir)
  // ═══════════════════════════════════════════════════
  shutdown(): void {
    this.clearRoundObjects();
    this.tweens.killAll();
  }
}
