/**
 * Aventura Matemática — placeholder Phaser 3.
 *
 * Status: Fase 4 estabelece template e wiring. Implementação completa
 * (cenas, sprites, lógica de gameplay) virá em sub-fase dedicada.
 */

import type {
  GameCallbacks,
  GameConfig,
  KidsAcademyGameWithCallbacks,
} from '@/games/core/types';

export default class AventuraMatematica implements KidsAcademyGameWithCallbacks {
  readonly id = 'aventura-matematica';
  readonly title = 'Aventura Matemática';
  readonly engine = 'phaser' as const;
  readonly conceitos = ['aritmetica', 'matematica-ef-3'];

  private game: import('phaser').Game | null = null;
  private callbacks: GameCallbacks | null = null;
  private startedAt = 0;

  setCallbacks(callbacks: GameCallbacks): void {
    this.callbacks = callbacks;
  }

  async mount(container: HTMLElement, config: GameConfig): Promise<void> {
    const Phaser = (await import('phaser')).default;
    this.startedAt = Date.now();

    const callbacks = this.callbacks;
    const onCompleteHook = () => {
      callbacks?.onComplete({
        score: 0,
        duracaoSegundos: Math.floor((Date.now() - this.startedAt) / 1000),
        acertos: 0,
        erros: 0,
        conceitosTrabalhados: this.conceitos,
      });
    };

    const PlaceholderScene = class extends Phaser.Scene {
      constructor() {
        super('Placeholder');
      }
      create() {
        const w = this.scale.width;
        const h = this.scale.height;

        this.cameras.main.setBackgroundColor('#FFFDF5');

        // título
        this.add
          .text(w / 2, h / 2 - 60, 'Aventura Matemática', {
            fontFamily: 'Nunito',
            fontSize: '40px',
            fontStyle: '900',
            color: '#6B46C1',
          })
          .setOrigin(0.5);

        // subtítulo
        this.add
          .text(w / 2, h / 2 - 10, 'Phaser 3 carregado ✓', {
            fontFamily: 'Nunito',
            fontSize: '18px',
            fontStyle: '700',
            color: '#10B981',
          })
          .setOrigin(0.5);

        this.add
          .text(w / 2, h / 2 + 30, 'Implementação completa virá em sub-fase dedicada', {
            fontFamily: 'Nunito',
            fontSize: '14px',
            color: '#6B7280',
          })
          .setOrigin(0.5);

        // botão concluir (demo)
        const btn = this.add.rectangle(w / 2, h / 2 + 100, 200, 56, 0x10b981);
        btn.setInteractive({ useHandCursor: true });
        const btnText = this.add.text(w / 2, h / 2 + 100, 'Concluir demo', {
          fontFamily: 'Nunito',
          fontSize: '20px',
          fontStyle: '900',
          color: '#FFFFFF',
        });
        btnText.setOrigin(0.5);

        btn.on('pointerdown', onCompleteHook);
      }
    };

    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: container,
      width: 800,
      height: 600,
      backgroundColor: '#FFFDF5',
      scene: [PlaceholderScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    });

    void config;
  }

  unmount(): void {
    this.game?.destroy(true);
    this.game = null;
  }

  pause(): void {
    this.game?.scene.getScenes(true).forEach((s) => s.scene.pause());
  }

  resume(): void {
    this.game?.scene.getScenes(true).forEach((s) => s.scene.resume());
  }

  reset(): void {
    this.game?.scene.getScenes(true).forEach((s) => s.scene.restart());
  }
}
