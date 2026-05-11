// =============================================================
// Scene registry — boot
// =============================================================
// Importado no boot do app (root layout) para que adapters
// consigam resolver scenes por nome.
// =============================================================

import { registerLetterRecognitionScene } from './letter-recognition';
import { registerNumberRecognitionScene } from './number-recognition';
import { registerLetterDiscriminationScene } from './letter-discrimination';

let bootDone = false;

export function bootSceneRegistry(): void {
  if (bootDone) return;
  bootDone = true;
  registerLetterRecognitionScene();
  registerNumberRecognitionScene();
  registerLetterDiscriminationScene();
  // Novas cenas: registrar aqui.
}
