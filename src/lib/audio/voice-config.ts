// =============================================================
// Voice config — catálogo de vozes pré-renderizadas
// =============================================================
// Cada voz tem um id usado em children.preferred_voice. Quando
// children.preferred_voice é null, usar TTS quando disponível.
//
// As URLs apontam para Cloudflare R2 (assets/audio/voices/<id>/).
// =============================================================

export interface VoiceProfile {
  id: string;
  displayName: string;
  description: string;
  bucketPrefix: string; // path base no R2
}

export const VOICES: VoiceProfile[] = [
  {
    id: 'maria',
    displayName: 'Maria',
    description: 'Voz feminina suave, indicada para 5-6 anos',
    bucketPrefix: 'voices/maria',
  },
  {
    id: 'pedro',
    displayName: 'Pedro',
    description: 'Voz masculina alegre, indicada para 7-8 anos',
    bucketPrefix: 'voices/pedro',
  },
];

export function getVoice(id: string | null): VoiceProfile | null {
  if (!id) return null;
  return VOICES.find((v) => v.id === id) ?? null;
}
