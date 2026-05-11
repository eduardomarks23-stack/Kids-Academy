import { registerScene } from '@/lib/games';

let registered = false;

export function registerNumberRecognitionScene(): void {
  if (registered) return;
  registered = true;
  registerScene('number-recognition', () =>
    import('./scene').then((m) => ({
      default: m.default as unknown as new (...args: unknown[]) => unknown,
    })),
  );
}
