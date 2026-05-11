/**
 * Sons procedurais via Web Audio API + helper TTS.
 *
 * Sons do jogo (acerto, erro, vitória) são sintetizados — sem assets HTTP,
 * cabíveis em qualquer bundle. TTS é Web Speech API (acessibilidade).
 */

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    try {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      audioCtx = new Ctor();
    } catch {
      return null;
    }
  }
  return audioCtx;
}

function tone(freq: number, durMs: number, type: OscillatorType = 'sine', gain = 0.15) {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = gain;
  osc.connect(g);
  g.connect(ctx.destination);
  const now = ctx.currentTime;
  osc.start(now);
  g.gain.exponentialRampToValueAtTime(0.0001, now + durMs / 1000);
  osc.stop(now + durMs / 1000 + 0.02);
}

export function playSuccess() {
  tone(880, 120, 'sine', 0.18);
  setTimeout(() => tone(1320, 100, 'sine', 0.14), 60);
}

export function playWrong() {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(220, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.25);
  g.gain.value = 0.12;
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.27);
}

export function playRoundComplete() {
  tone(659, 100, 'sine', 0.15);
  setTimeout(() => tone(784, 100, 'sine', 0.15), 90);
}

export function playVictory() {
  tone(523, 150, 'sine', 0.2);
  setTimeout(() => tone(659, 150, 'sine', 0.2), 130);
  setTimeout(() => tone(784, 180, 'sine', 0.2), 260);
  setTimeout(() => tone(1047, 250, 'sine', 0.18), 410);
}

/**
 * Lista de nomes femininos comuns em vozes pt-BR (varia por navegador/SO):
 *   - Microsoft (Windows): Maria, Francisca
 *   - Google (Chrome): Google português do Brasil (geralmente feminina)
 *   - Apple (Mac/iOS): Luciana
 *   - Outras: Camila, Vitoria, Helena
 */
const FEMININE_VOICE_HINTS = [
  'maria',
  'francisca',
  'luciana',
  'camila',
  'vitoria',
  'helena',
  'fernanda',
  'female',
];

let cachedVoice: SpeechSynthesisVoice | null = null;

function pickVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice) return cachedVoice;
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  const ptBR = voices.filter((v) => v.lang === 'pt-BR' || v.lang === 'pt_BR');
  const ptAny = voices.filter((v) => v.lang.toLowerCase().startsWith('pt'));

  // 1. pt-BR + nome feminino conhecido
  for (const hint of FEMININE_VOICE_HINTS) {
    const match = ptBR.find((v) => v.name.toLowerCase().includes(hint));
    if (match) {
      cachedVoice = match;
      return match;
    }
  }

  // 2. Google português do Brasil (Chrome) — geralmente feminina
  const google = ptBR.find((v) => v.name.toLowerCase().includes('google'));
  if (google) {
    cachedVoice = google;
    return google;
  }

  // 3. Qualquer pt-BR
  if (ptBR[0]) {
    cachedVoice = ptBR[0];
    return ptBR[0];
  }

  // 4. Qualquer pt-*
  if (ptAny[0]) {
    cachedVoice = ptAny[0];
    return ptAny[0];
  }

  return null;
}

// Pré-carrega vozes (em alguns browsers getVoices() retorna [] na 1ª chamada
// até o evento `voiceschanged` disparar).
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null; // força reseleção
    pickVoice();
  };
  // Tentativa síncrona (Chrome às vezes funciona; Firefox costuma falhar até voiceschanged)
  pickVoice();
}

/** Pronuncia o texto via Web Speech API com voz feminina pt-BR. */
export function speak(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'pt-BR';
    utter.rate = 0.85;
    utter.pitch = 1.25; // mais alto reforça feminilidade quando voz neutra
    const voice = pickVoice();
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
  } catch {
    // ignora silenciosamente — TTS é nice-to-have
  }
}
