// =============================================================
// Scene registry — boot
// =============================================================
// Importado no boot do app (root layout) para que adapters
// consigam resolver scenes por nome.
// =============================================================

import { registerLetterRecognitionScene } from './letter-recognition';
import { registerNumberRecognitionScene } from './number-recognition';
import { registerLetterDiscriminationScene } from './letter-discrimination';
import { registerCuriososScenes } from './curiosos';

let bootDone = false;

export function bootSceneRegistry(): void {
  if (bootDone) return;
  bootDone = true;
  // Mundo dos Exploradores (legado spec v1)
  registerLetterRecognitionScene();
  registerNumberRecognitionScene();
  registerLetterDiscriminationScene();
  // Mundo dos Curiosos (3-4 anos) — 11 cenas-template
  registerCuriososScenes();
}
