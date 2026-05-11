/**
 * Resgate da Primeira Letra — micro-jogo de alfabetização (3-6 anos).
 *
 * Origem: prototype Kimi (public/Jogo Kimi 1/) refatorado para o
 * Game Adapter Pattern do Kids Academy. Drop completo da camada
 * React/Zustand do prototype — toda UI vive dentro do Phaser, e
 * comunicação React ↔ Phaser passa por GameCallbacks tipados em
 * vez de window.dispatchEvent.
 *
 * Mecânica: 5 rodadas, criança arrasta a letra inicial correta
 * para o slot pulsante na palavra ilustrada por emoji.
 *
 * Captura: tempo_resposta, hesitacao, tentativas_multiplas,
 * conquista_streak, erro_conceitual, interacao_audio.
 */

import type {
  GameCallbacks,
  GameConfig,
  KidsAcademyGameWithCallbacks,
} from '@/games/core/types';
import { createGameConfig } from './gameConfig';

export default class ResgatePrimeiraLetra implements KidsAcademyGameWithCallbacks {
  readonly id = 'resgate-primeira-letra';
  readonly title = 'Resgate da Primeira Letra';
  readonly engine = 'phaser' as const;
  readonly conceitos = [
    'leitura',
    'alfabetizacao',
    'consciencia-fonologica',
    'reconhecimento-letras',
  ];

  private game: import('phaser').Game | null = null;
  private callbacks: GameCallbacks | null = null;

  setCallbacks(callbacks: GameCallbacks): void {
    this.callbacks = callbacks;
  }

  async mount(container: HTMLElement, gameConfig: GameConfig): Promise<void> {
    void gameConfig;
    const Phaser = (await import('phaser')).default;
    const phaserConfig = createGameConfig(container);
    this.game = new Phaser.Game(phaserConfig);

    // Init data garante callbacks disponíveis ANTES de create() rodar.
    this.game.events.once('ready', () => {
      if (!this.game || !this.callbacks) return;
      const scene = this.game.scene.getScene('ResgatePrimeiraLetraMain');
      if (scene) {
        scene.scene.restart({ callbacks: this.callbacks });
      } else {
        this.game.scene.start('ResgatePrimeiraLetraMain', { callbacks: this.callbacks });
      }
    });
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
