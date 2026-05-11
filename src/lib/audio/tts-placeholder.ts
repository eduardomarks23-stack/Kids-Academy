// =============================================================
// TTS Placeholder Service — Mundo dos Curiosos
// =============================================================
// PROMPT-IMPLEMENTACAO-MUNDO-CURIOSOS seção 6.
//
// Reproduz tracks de áudio sintético (Web Speech API) enquanto
// vozes reais do Garuzinho e da Lolinha não foram gravadas.
// Suporta sequência mista de speech + pauses + SFX.
//
// Speakers:
//   - garuzinho: voz masculina pt-BR, pitch 0.9, rate 0.95
//   - lolinha:   voz feminina  pt-BR, pitch 1.15, rate 1.05
//
// Quando as vozes reais existirem, este service será substituído
// por um player de áudio pré-renderizado, sem mudar a API.
// =============================================================

export type Speaker = 'garuzinho' | 'lolinha' | 'narrator';

export type TtsTrack =
  | { type: 'speech'; speaker: Speaker; text: string; rate?: number; pitch?: number }
  | { type: 'pause'; durationMs: number }
  | { type: 'sfx'; sfxKey: string; srcPlaceholder?: string };

interface SpeakerDefaults {
  rate: number;
  pitch: number;
  preferredVoiceMatchers: RegExp[];
}

const SPEAKER_DEFAULTS: Record<Speaker, SpeakerDefaults> = {
  garuzinho: {
    rate: 0.95,
    pitch: 0.9,
    preferredVoiceMatchers: [/Daniel/i, /Felipe/i, /Ricardo/i, /Microsoft.*Brazil.*Male/i, /Male/i],
  },
  lolinha: {
    rate: 1.05,
    pitch: 1.15,
    preferredVoiceMatchers: [/Luciana/i, /Maria/i, /Camila/i, /Francisca/i, /Vitoria/i, /Microsoft.*Brazil.*Female/i, /Female/i],
  },
  narrator: {
    rate: 1.0,
    pitch: 1.0,
    preferredVoiceMatchers: [/Brazil/i, /pt-BR/i],
  },
};

interface VoiceCatalog {
  garuzinho: SpeechSynthesisVoice | null;
  lolinha: SpeechSynthesisVoice | null;
  narrator: SpeechSynthesisVoice | null;
}

let cachedCatalog: VoiceCatalog | null = null;

function loadVoiceCatalog(synth: SpeechSynthesis): VoiceCatalog {
  if (cachedCatalog) return cachedCatalog;
  const all = synth.getVoices();
  const ptBR = all.filter((v) => v.lang === 'pt-BR' || v.lang.toLowerCase().startsWith('pt'));

  const pickBy = (matchers: RegExp[]): SpeechSynthesisVoice | null => {
    for (const re of matchers) {
      const match = ptBR.find((v) => re.test(v.name));
      if (match) return match;
    }
    return ptBR[0] ?? all[0] ?? null;
  };

  cachedCatalog = {
    garuzinho: pickBy(SPEAKER_DEFAULTS.garuzinho.preferredVoiceMatchers),
    lolinha: pickBy(SPEAKER_DEFAULTS.lolinha.preferredVoiceMatchers),
    narrator: pickBy(SPEAKER_DEFAULTS.narrator.preferredVoiceMatchers),
  };
  return cachedCatalog;
}

async function ensureVoicesLoaded(synth: SpeechSynthesis): Promise<void> {
  if (synth.getVoices().length > 0) return;
  await new Promise<void>((resolve) => {
    const handler = () => {
      synth.removeEventListener('voiceschanged', handler);
      resolve();
    };
    synth.addEventListener('voiceschanged', handler);
    // fallback caso evento nunca dispare
    setTimeout(() => {
      synth.removeEventListener('voiceschanged', handler);
      resolve();
    }, 2500);
  });
}

interface PlayerState {
  cancelRequested: boolean;
  currentUtter: SpeechSynthesisUtterance | null;
  currentTimeout: number | null;
  currentAudio: HTMLAudioElement | null;
}

export class TtsPlaceholderPlayer {
  private synth: SpeechSynthesis | null;
  private state: PlayerState = {
    cancelRequested: false,
    currentUtter: null,
    currentTimeout: null,
    currentAudio: null,
  };

  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  }

  async play(tracks: TtsTrack[]): Promise<void> {
    if (!this.synth) {
      console.warn('[tts-placeholder] SpeechSynthesis unavailable; skipping playback');
      return;
    }
    this.state.cancelRequested = false;
    await ensureVoicesLoaded(this.synth);
    const catalog = loadVoiceCatalog(this.synth);

    for (const track of tracks) {
      if (this.state.cancelRequested) return;
      if (track.type === 'speech') {
        await this.playSpeech(track, catalog);
      } else if (track.type === 'pause') {
        await this.sleep(track.durationMs);
      } else if (track.type === 'sfx') {
        await this.playSfx(track);
      }
    }
  }

  stop(): void {
    this.state.cancelRequested = true;
    if (this.synth) this.synth.cancel();
    if (this.state.currentTimeout) window.clearTimeout(this.state.currentTimeout);
    if (this.state.currentAudio) {
      this.state.currentAudio.pause();
      this.state.currentAudio = null;
    }
  }

  pause(): void {
    if (this.synth?.speaking) this.synth.pause();
    if (this.state.currentAudio && !this.state.currentAudio.paused) {
      this.state.currentAudio.pause();
    }
  }

  resume(): void {
    if (this.synth?.paused) this.synth.resume();
    if (this.state.currentAudio?.paused) {
      void this.state.currentAudio.play().catch(() => {});
    }
  }

  private async playSpeech(
    track: Extract<TtsTrack, { type: 'speech' }>,
    catalog: VoiceCatalog,
  ): Promise<void> {
    if (!this.synth) return;
    const defaults = SPEAKER_DEFAULTS[track.speaker];
    const voice = catalog[track.speaker];
    const utter = new SpeechSynthesisUtterance(track.text);
    if (voice) utter.voice = voice;
    utter.rate = track.rate ?? defaults.rate;
    utter.pitch = track.pitch ?? defaults.pitch;
    utter.lang = 'pt-BR';
    this.state.currentUtter = utter;
    await new Promise<void>((resolve) => {
      utter.onend = () => resolve();
      utter.onerror = () => resolve();
      this.synth!.speak(utter);
    });
    this.state.currentUtter = null;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
      this.state.currentTimeout = window.setTimeout(() => {
        this.state.currentTimeout = null;
        resolve();
      }, ms);
    });
  }

  private async playSfx(track: Extract<TtsTrack, { type: 'sfx' }>): Promise<void> {
    // Tenta carregar arquivo placeholder; se falhar, sintetiza beep curto
    const url = track.srcPlaceholder ?? `/audio/sfx/${track.sfxKey}.mp3`;
    try {
      const audio = new Audio(url);
      this.state.currentAudio = audio;
      await new Promise<void>((resolve) => {
        audio.onended = () => resolve();
        audio.onerror = () => resolve();
        void audio.play().catch(() => resolve());
        // timeout máximo: 2s
        window.setTimeout(() => resolve(), 2000);
      });
      this.state.currentAudio = null;
    } catch {
      // fallback: beep WebAudio
      this.playBeep();
    }
  }

  private playBeep(): void {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 440;
      gain.gain.value = 0.1;
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
      window.setTimeout(() => void ctx.close(), 300);
    } catch {
      // silencioso
    }
  }
}

// Singleton para uso direto sem props drilling
let singleton: TtsPlaceholderPlayer | null = null;

export function getTtsPlaceholder(): TtsPlaceholderPlayer {
  if (!singleton) singleton = new TtsPlaceholderPlayer();
  return singleton;
}
