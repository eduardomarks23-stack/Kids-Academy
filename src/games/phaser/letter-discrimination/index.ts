import { registerScene } from '@/lib/games';

let registered = false;

export function registerLetterDiscriminationScene(): void {
  if (registered) return;
  registered = true;
  registerScene('letter-discrimination', () =>
    import('./scene').then((m) => ({
      default: m.default as unknown as new (...args: unknown[]) => unknown,
    })),
  );
}
