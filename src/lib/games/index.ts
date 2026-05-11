// =============================================================
// Game adapters — barrel export
// =============================================================
// Resolve o adapter correto pelo engine do átomo.
// =============================================================

import type { GameEngine } from '@/types/domain';
import type { GameAdapter } from './adapter';
import { PhaserAdapter } from './phaser-adapter';
import { AudioAdapter } from './audio-adapter';
import { VideoAdapter } from './video-adapter';
import { NativeHtmlAdapter } from './native-html-adapter';

export { GameError } from './adapter';
export type { GameAdapter, GameInstance } from './adapter';
export { PhaserAdapter, registerScene } from './phaser-adapter';
export { AudioAdapter } from './audio-adapter';
export { VideoAdapter } from './video-adapter';
export {
  NativeHtmlAdapter,
  registerNativeAtom,
} from './native-html-adapter';

const adapters: Partial<Record<GameEngine, GameAdapter<unknown, unknown>>> = {};

export function getAdapter(engine: GameEngine): GameAdapter<unknown, unknown> {
  if (!adapters[engine]) {
    switch (engine) {
      case 'phaser':
        adapters.phaser = new PhaserAdapter() as unknown as GameAdapter<
          unknown,
          unknown
        >;
        break;
      case 'audio':
        adapters.audio = new AudioAdapter() as unknown as GameAdapter<
          unknown,
          unknown
        >;
        break;
      case 'video':
        adapters.video = new VideoAdapter() as unknown as GameAdapter<
          unknown,
          unknown
        >;
        break;
      case 'native_html':
        adapters.native_html =
          new NativeHtmlAdapter() as unknown as GameAdapter<unknown, unknown>;
        break;
      default:
        throw new Error(`Engine desconhecido: ${engine satisfies never}`);
    }
  }
  return adapters[engine]!;
}
