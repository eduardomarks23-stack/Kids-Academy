/**
 * Encaixe das Formas Mágicas — drag-drop educativo (3-6 anos).
 *
 * Origem: prototype Qwen (public/Jogo Qwen 1/) + reescrita v2.
 * Mecânica: 5 rodadas progressivas com formas geométricas.
 *   - Rodadas 1-2: 3 formas básicas (círculo/quadrado/triângulo)
 *   - Rodada 3: 4 formas (+ estrela)
 *   - Rodada 4: 4 formas (+ coração)
 *   - Rodada 5: 5 formas com 1 distrator
 *
 * Sistema de pontuação: base 10 + speed bonus (até 10) + combo (até 10) + sem-erros bonus (20).
 * Estrelas finais: 1-3 baseado em score + erros.
 *
 * Captura: tempo_resposta, tentativas_multiplas, conquista_streak, erro_conceitual.
 */

import type {
  GameCallbacks,
  GameConfig,
  KidsAcademyGameWithCallbacks,
} from '@/games/core/types';
import { createGameConfig } from './gameConfig';

export default class EncaixeFormas implements KidsAcademyGameWithCallbacks {
  readonly id = 'encaixe-formas';
  readonly title = 'Encaixe das Formas Mágicas';
  readonly engine = 'phaser' as const;
  readonly conceitos = ['formas-geometricas', 'coordenacao-motora', 'discriminacao-visual'];

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

    // Aguarda boot, depois reinicia a cena com callbacks como init data.
    // Init data garante callbacks disponíveis ANTES de create() rodar.
    this.game.events.once('ready', () => {
      if (!this.game || !this.callbacks) return;
      const scene = this.game.scene.getScene('EncaixeFormasMain');
      if (scene) {
        scene.scene.restart({ callbacks: this.callbacks });
      } else {
        this.game.scene.start('EncaixeFormasMain', { callbacks: this.callbacks });
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
