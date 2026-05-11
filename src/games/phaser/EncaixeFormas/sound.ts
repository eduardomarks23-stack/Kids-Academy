/**
 * Sons procedurais via Web Audio API — sem assets HTTP.
 *
 * - acerto: beep agudo (880Hz) com decay rápido
 * - erro: beep grave (200Hz) com modulação descendente
 * - vitória: arpejo C-E-G
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
  // Decay suave
  g.gain.exponentialRampToValueAtTime(0.0001, now + durMs / 1000);
  osc.stop(now + durMs / 1000 + 0.02);
}

export function playSuccess() {
  // Ding agudo
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

export function playVictory() {
  // Arpejo C-E-G-C8va
  tone(523, 150, 'sine', 0.2); // C5
  setTimeout(() => tone(659, 150, 'sine', 0.2), 130); // E5
  setTimeout(() => tone(784, 180, 'sine', 0.2), 260); // G5
  setTimeout(() => tone(1047, 250, 'sine', 0.18), 410); // C6
}

export function playRoundComplete() {
  tone(659, 100, 'sine', 0.15);
  setTimeout(() => tone(784, 100, 'sine', 0.15), 90);
}
