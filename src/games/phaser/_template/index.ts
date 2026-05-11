/**
 * TEMPLATE — Jogo Phaser 3.
 *
 * Para criar novo jogo Phaser:
 *   1. Copie esta pasta para src/games/phaser/SeuJogo/
 *   2. Implemente cenas (preload/create/update)
 *   3. Exporte default uma classe que implementa KidsAcademyGameWithCallbacks
 *   4. Registre em src/games/core/GameRegistry.ts
 *
 * Ver `docs/CREATING_NEW_GAMES.md` para guia completo.
 */

import type {
  GameCallbacks,
  GameConfig,
  KidsAcademyGameWithCallbacks,
} from '@/games/core/types';

export default class TemplatePhaserGame implements KidsAcademyGameWithCallbacks {
  readonly id = 'template-phaser';
  readonly title = 'Template Phaser';
  readonly engine = 'phaser' as const;
  readonly conceitos: string[] = [];

  private game: import('phaser').Game | null = null;
  private callbacks: GameCallbacks | null = null;

  setCallbacks(callbacks: GameCallbacks): void {
    this.callbacks = callbacks;
  }

  async mount(container: HTMLElement, config: GameConfig): Promise<void> {
    const Phaser = (await import('phaser')).default;

    const TemplateScene = class extends Phaser.Scene {
      constructor() {
        super('TemplateScene');
      }
      create() {
        this.cameras.main.setBackgroundColor('#FFFFFF');
        const text = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Template Phaser', {
          fontFamily: 'Nunito',
          fontSize: '32px',
          fontStyle: '900',
          color: '#6B46C1',
        });
        text.setOrigin(0.5);
      }
    };

    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: container,
      width: 800,
      height: 600,
      backgroundColor: '#FFFFFF',
      scene: [TemplateScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    });

    void config;
    void this.callbacks;
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
    if (this.game) {
      this.game.scene.getScenes(true).forEach((s) => s.scene.restart());
    }
  }
}
