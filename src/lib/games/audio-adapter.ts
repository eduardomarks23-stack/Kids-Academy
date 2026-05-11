// =============================================================
// AudioAdapter — átomo do tipo `presentation` em modo áudio puro
// =============================================================
// Cria um <audio> dentro do container, toca, emite onComplete
// quando termina. Bem simples; usado para apresentações de
// conceito narradas (sem visual).
// =============================================================

import type { AudioAtomConfig, AtomResult } from '@/types/domain';
import type { GameAdapter, GameInstance } from './adapter';
import { GameError } from './adapter';

export class AudioAdapter
  implements GameAdapter<AudioAtomConfig, AtomResult>
{
  readonly engine = 'audio' as const;

  async mount(
    container: HTMLElement,
    config: AudioAtomConfig,
  ): Promise<GameInstance<AtomResult>> {
    container.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className =
      'flex h-full w-full flex-col items-center justify-center gap-6 bg-white p-6';

    const text = document.createElement('p');
    text.className = 'max-w-md text-center text-xl text-purple-900';
    text.textContent = config.transcript ?? '';

    const audio = document.createElement('audio');
    audio.src = config.url;
    audio.controls = false;
    audio.preload = 'auto';

    const playBtn = document.createElement('button');
    playBtn.type = 'button';
    playBtn.className =
      'rounded-full bg-purple-700 px-6 py-3 text-lg font-medium text-white';
    playBtn.textContent = 'Ouvir';

    wrapper.appendChild(text);
    wrapper.appendChild(playBtn);
    wrapper.appendChild(audio);
    container.appendChild(wrapper);

    return new AudioInstance(audio, playBtn, container);
  }
}

class AudioInstance implements GameInstance<AtomResult> {
  private completeCb: ((result: AtomResult) => void) | null = null;
  private errorCb: ((error: GameError) => void) | null = null;
  private start = performance.now();

  constructor(
    private audio: HTMLAudioElement,
    private playBtn: HTMLButtonElement,
    private container: HTMLElement,
  ) {
    this.playBtn.onclick = () => {
      void this.audio.play().catch((err) => {
        this.errorCb?.(
          new GameError('Falha ao tocar áudio', 'AUDIO_PLAY_ERROR', err),
        );
      });
    };
    this.audio.onended = () => this.handleEnded();
    this.audio.onerror = () => {
      this.errorCb?.(new GameError('Falha de áudio', 'AUDIO_ERROR'));
    };
    // Tenta autoplay; se browser bloquear, usuário toca o botão
    void this.audio.play().catch(() => undefined);
  }

  private handleEnded(): void {
    const result: AtomResult = {
      success: true,
      durationMs: performance.now() - this.start,
      attempts: 1,
      difficultyLevel: 1,
      conceptsScored: [],
      raw: { url: this.audio.src },
    };
    this.completeCb?.(result);
  }

  pause(): void {
    this.audio.pause();
  }
  resume(): void {
    void this.audio.play().catch(() => undefined);
  }
  async destroy(): Promise<void> {
    this.audio.pause();
    this.audio.src = '';
    this.container.innerHTML = '';
  }
  onComplete(cb: (result: AtomResult) => void): void {
    this.completeCb = cb;
  }
  onError(cb: (error: GameError) => void): void {
    this.errorCb = cb;
  }
}
