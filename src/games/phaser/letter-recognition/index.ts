// =============================================================
// Registro da cena no scene registry (chamado uma vez no boot)
// =============================================================

import { registerScene } from '@/lib/games';

let registered = false;

export function registerLetterRecognitionScene(): void {
  if (registered) return;
  registered = true;
  registerScene('letter-recognition', () =>
    import('./scene').then((m) => ({
      default: m.default as unknown as new (...args: unknown[]) => unknown,
    })),
  );
}
