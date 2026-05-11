import Phaser from 'phaser';

interface ShapeConfig {
  key: string;
  color: number;
  targetX: number;
  targetY: number;
  startX: number;
  startY: number;
}

export class MainScene extends Phaser.Scene {
  private matchedCount = 0;
  private shapes: Phaser.GameObjects.Image[] = [];

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // Geração procedural de texturas para evitar requisições HTTP e problemas de SSR
    this.createShapeTexture('circle', 0xFF6B6B, 'circle');
    this.createShapeTexture('square', 0x4ECDC4, 'square');
    this.createShapeTexture('triangle', 0xFFE66D, 'triangle');
    this.createShapeTexture('star', 0xFFD700, 'star'); // Para partículas
  }

  create() {
    this.matchedCount = 0;
    this.shapes = [];

    const shapesConfig: ShapeConfig[] = [
      { key: 'circle', color: 0xFF6B6B, targetX: 280, targetY: 240, startX: 200, startY: 440 },
      { key: 'square', color: 0x4ECDC4, targetX: 480, targetY: 240, startX: 480, startY: 440 },
      { key: 'triangle', color: 0xFFE66D, targetX: 680, targetY: 240, startX: 760, startY: 440 },
    ];

    // 1. Desenhar contornos vazados (alvos)
    shapesConfig.forEach((cfg) => {
      const target = this.add.graphics();
      target.lineStyle(6, 0x94A3B8, 0.7);
      if (cfg.key === 'circle') target.strokeCircle(cfg.targetX, cfg.targetY, 45);
      else if (cfg.key === 'square') target.strokeRect(cfg.targetX - 45, cfg.targetY - 45, 90, 90);
      else if (cfg.key === 'triangle') {
        target.strokeTriangle(cfg.targetX, cfg.targetY - 45, cfg.targetX - 45, cfg.targetY + 45, cfg.targetX + 45, cfg.targetY + 45);
      }
      target.setDepth(0);
    });

    // 2. Criar formas arrastáveis
    shapesConfig.forEach((cfg) => {
      const shape = this.add.image(cfg.startX, cfg.startY, cfg.key)
        .setInteractive({ useHandCursor: true, pixelPerfect: false })
        .setScale(1.3) // Áreas de toque grandes para crianças
        .setDepth(1);

      // Armazenar metadados no próprio GameObject
      shape.setData('targetX', cfg.targetX);
      shape.setData('targetY', cfg.targetY);
      shape.setData('startX', cfg.startX);
      shape.setData('startY', cfg.startY);

      this.input.setDraggable(shape);
      this.shapes.push(shape);
    });

    // 3. Eventos de Drag & Drop
    this.input.on('dragstart', (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) => {
      this.tweens.add({ targets: gameObject, scale: 1.4, duration: 100, yoyo: true });
      gameObject.setDepth(10);
    });

    this.input.on('drag', (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image, dragX: number, dragY: number) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('drop', (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) => {
      const targetX = gameObject.getData('targetX') as number;
      const targetY = gameObject.getData('targetY') as number;
      const startX = gameObject.getData('startX') as number;
      const startY = gameObject.getData('startY') as number;

      // Tolerância generosa (70px) para coordenação motora infantil
      const distance = Phaser.Math.Distance.Between(gameObject.x, gameObject.y, targetX, targetY);

      if (distance < 70) {
        this.handleCorrectMatch(gameObject, targetX, targetY);
      } else {
        // Retorna suavemente à bandeja se errar
        this.tweens.add({
          targets: gameObject,
          x: startX,
          y: startY,
          scale: 1.3,
          duration: 400,
          ease: 'Back.easeOut',
        });
      }
    });
  }

  private handleCorrectMatch(shape: Phaser.GameObjects.Image, targetX: number, targetY: number) {
    shape.disableInteractive();
    this.input.setDraggable(shape, false);

    this.tweens.add({
      targets: shape,
      x: targetX,
      y: targetY,
      scale: 1,
      duration: 250,
      ease: 'Back.easeOut',
      onComplete: () => {
        this.matchedCount++;
        this.emitSuccessEffect(targetX, targetY);
        
        // 🔗 Ponte Phaser -> React: Emite evento de pontuação
        this.events.emit('scoreUpdate', this.matchedCount);

        if (this.matchedCount === 3) {
          this.time.delayedCall(600, () => {
            // 🔗 Ponte Phaser -> React: Emite evento de vitória
            this.events.emit('victory');
          });
        }
      },
    });
  }

  private emitSuccessEffect(x: number, y: number) {
    // Explosão de estrelas (partículas)
    const emitter = this.add.particles(x, y, 'star', {
      speed: { min: 80, max: 180 },
      scale: { start: 0.6, end: 0 },
      lifespan: 700,
      blendMode: 'ADD',
      emitting: false,
      quantity: 12,
    });
    emitter.explode();
    this.time.delayedCall(700, () => emitter.destroy());

    // 💡 Dica EdTech: Em produção, use this.sound.play('success') com um asset curto e agudo.
    // Para manter zero-dependência aqui, o feedback visual já cumpre o reforço positivo imediato.
  }

  private createShapeTexture(key: string, color: number, type: 'circle' | 'square' | 'triangle' | 'star') {
    const g = this.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(color, 1);
    if (type === 'circle') g.fillCircle(45, 45, 45);
    else if (type === 'square') g.fillRect(0, 0, 90, 90);
    else if (type === 'triangle') g.fillTriangle(45, 0, 0, 90, 90, 90);
    else if (type === 'star') {
      // Estrela simples para partículas
      g.fillTriangle(10, 0, 0, 20, 20, 20);
      g.fillTriangle(10, 20, 0, 0, 20, 0);
    }
    g.generateTexture(key, 90, 90);
    g.destroy();
  }
}