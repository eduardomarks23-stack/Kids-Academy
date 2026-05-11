// =============================================================
// PhaserAdapter — implementação concreta de GameAdapter
// =============================================================
// Lições aprendidas (spec seção 10):
//   1. Drag em Image direto, não Container.
//   2. Emoji deve ser pré-renderizado (não Phaser.Text).
//   3. Matar tweens antes de dragstart.
//   4. TTS pt-BR exige fallback para áudio pré-renderizado.
//   5. Hit area mínima 64px (configurar via setInteractive).
//
// Phaser é importado via dynamic import — bundle inicial < 300KB.
// =============================================================

import type { PhaserAtomConfig, AtomResult } from '@/types/domain';
import type { GameAdapter, GameInstance } from './adapter';
import { GameError } from './adapter';

/** Registry de scenes. Cada cena registra-se aqui via scene-registry.ts. */
const sceneRegistry = new Map<
  string,
  () => Promise<{ default: new (...args: unknown[]) => unknown }>
>();

export function registerScene(
  key: string,
  loader: () => Promise<{ default: new (...args: unknown[]) => unknown }>,
): void {
  sceneRegistry.set(key, loader);
}

async function loadScene(
  key: string,
): Promise<new (...args: unknown[]) => unknown> {
  const loader = sceneRegistry.get(key);
  if (!loader) {
    throw new GameError(
      `Scene "${key}" não registrada`,
      'SCENE_NOT_FOUND',
    );
  }
  const sceneModule = await loader();
  return sceneModule.default;
}

export class PhaserAdapter
  implements GameAdapter<PhaserAtomConfig, AtomResult>
{
  readonly engine = 'phaser' as const;

  async mount(
    container: HTMLElement,
    config: PhaserAtomConfig,
  ): Promise<GameInstance<AtomResult>> {
    // Dynamic import: Phaser fica fora do bundle inicial
    const phaserModule = await import('phaser');
    const Phaser = phaserModule.default;
    const SceneClass = await loadScene(config.scene);

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: container,
      backgroundColor: '#FFFFFF',
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      scene: SceneClass as any,
      input: { activePointers: 2 },
      // Hit detection mais precisa em pointers de criança
      banner: false,
    });

    // Passa params da config para a cena via registry
    game.registry.set('atomParams', config.params);
    game.registry.set('atomAssets', config.assets);

    return new PhaserGameInstance(game);
  }
}

// -------------------------------------------------------------
// Wrapper de GameInstance — emite eventos via callbacks
// -------------------------------------------------------------

class PhaserGameInstance implements GameInstance<AtomResult> {
  private completeCb: ((result: AtomResult) => void) | null = null;
  private errorCb: ((error: GameError) => void) | null = null;
  private progressCb: ((progress: number) => void) | null = null;
  private destroyed = false;

  constructor(private game: import('phaser').Game) {
    // Cena pode emitir eventos via game.events
    this.game.events.on('atom:complete', (result: AtomResult) => {
      this.completeCb?.(result);
    });
    this.game.events.on('atom:error', (err: { message: string; code: string }) => {
      this.errorCb?.(new GameError(err.message, err.code));
    });
    this.game.events.on('atom:progress', (progress: number) => {
      this.progressCb?.(progress);
    });
  }

  pause(): void {
    if (this.destroyed) return;
    this.game.scene.scenes.forEach((scene) => {
      if (scene.scene.isActive()) scene.scene.pause();
    });
  }

  resume(): void {
    if (this.destroyed) return;
    this.game.scene.scenes.forEach((scene) => {
      if (scene.scene.isPaused()) scene.scene.resume();
    });
  }

  async destroy(): Promise<void> {
    if (this.destroyed) return;
    this.destroyed = true;
    this.game.events.removeAllListeners();
    this.game.destroy(true);
  }

  onComplete(cb: (result: AtomResult) => void): void {
    this.completeCb = cb;
  }

  onError(cb: (error: GameError) => void): void {
    this.errorCb = cb;
  }

  onProgress(cb: (progress: number) => void): void {
    this.progressCb = cb;
  }
}
