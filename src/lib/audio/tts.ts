// =============================================================
// TTSService — Web Speech API wrapper pt-BR
// =============================================================
// SPEC seção 11. getVoices() é assíncrono em alguns browsers;
// listener voiceschanged garante carregamento. Quando voz pt-BR
// não está disponível, lança erro para que o caller use
// narração pré-renderizada (NarrationPlayer).
// =============================================================

export interface TTSOptions {
  voice?: string;
  rate?: number; // 0.8 - 1.2
  pitch?: number; // 0.9 - 1.1
  volume?: number; // 0 - 1
}

export class TTSService {
  private synth: SpeechSynthesis | null = null;
  private voicePtBR: SpeechSynthesisVoice | null = null;
  private voicesReady: Promise<void>;

  constructor() {
    if (typeof window === 'undefined') {
      this.voicesReady = Promise.resolve();
      return;
    }
    this.synth = window.speechSynthesis;
    this.voicesReady = this.loadVoice();
  }

  private loadVoice(): Promise<void> {
    return new Promise((resolve) => {
      const tryAssign = () => {
        const voices = this.synth?.getVoices() ?? [];
        if (voices.length === 0) return false;

        // Preferência: feminina pt-BR. Heurística por nome.
        const femalePtBR = voices.find(
          (v) =>
            v.lang === 'pt-BR' &&
            /maria|francisca|luciana|camila|vitoria|helena|fernanda/i.test(
              v.name,
            ),
        );
        const ptBR = voices.find((v) => v.lang === 'pt-BR');
        const pt = voices.find((v) => v.lang.startsWith('pt'));
        this.voicePtBR = femalePtBR ?? ptBR ?? pt ?? null;
        return this.voicePtBR !== null;
      };

      if (tryAssign()) {
        resolve();
        return;
      }
      this.synth?.addEventListener('voiceschanged', () => {
        tryAssign();
        resolve();
      });
      // Fallback: resolve depois de 1s mesmo sem voz (para não travar)
      setTimeout(resolve, 1000);
    });
  }

  async isAvailable(): Promise<boolean> {
    await this.voicesReady;
    return this.synth !== null && this.voicePtBR !== null;
  }

  async speak(text: string, opts: TTSOptions = {}): Promise<void> {
    await this.voicesReady;
    if (!this.synth || !this.voicePtBR) {
      throw new Error(
        'TTS pt-BR não disponível neste device; usar narração pré-renderizada',
      );
    }
    const voice = this.voicePtBR;
    const synth = this.synth;
    return new Promise((resolve, reject) => {
      const utter = new SpeechSynthesisUtterance(text);
      utter.voice = voice;
      utter.lang = voice.lang;
      utter.rate = opts.rate ?? 1;
      utter.pitch = opts.pitch ?? 1;
      utter.volume = opts.volume ?? 1;
      utter.onend = () => resolve();
      utter.onerror = (e) => reject(e);
      synth.speak(utter);
    });
  }

  cancel(): void {
    this.synth?.cancel();
  }
}

// Singleton lazy
let instance: TTSService | null = null;
export function getTTS(): TTSService {
  if (!instance) instance = new TTSService();
  return instance;
}
