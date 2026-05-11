// =============================================================
// VideoAdapter — Cloudflare Stream player
// =============================================================
// Embed via iframe customer code. SPEC §3 vídeo: criança precisa
// assistir ao menos minDurationSeconds antes de completion.
//
// Atenção: o iframe não expõe eventos detalhados via mensagem
// postMessage padrão; usamos a Stream Web SDK (importada
// dinamicamente) para captar 'ended' e 'timeupdate'.
// =============================================================

import type { VideoAtomConfig, AtomResult, SuccessCriteria } from '@/types/domain';
import type { GameAdapter, GameInstance } from './adapter';
import { GameError } from './adapter';

interface MountConfig extends VideoAtomConfig {
  successCriteria?: SuccessCriteria;
}

export class VideoAdapter
  implements GameAdapter<MountConfig, AtomResult>
{
  readonly engine = 'video' as const;

  async mount(
    container: HTMLElement,
    config: MountConfig,
  ): Promise<GameInstance<AtomResult>> {
    container.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'h-full w-full bg-white';

    const iframe = document.createElement('iframe');
    iframe.src = `https://customer-${getStreamCustomerCode()}.cloudflarestream.com/${config.streamId}/iframe?poster=${encodeURIComponent(config.poster ?? '')}`;
    iframe.allow =
      'accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;';
    iframe.allowFullscreen = true;
    iframe.className = 'h-full w-full border-0';
    wrapper.appendChild(iframe);
    container.appendChild(wrapper);

    return new VideoInstance(
      iframe,
      container,
      config.successCriteria?.minDurationSeconds ?? 0,
    );
  }
}

function getStreamCustomerCode(): string {
  return process.env.NEXT_PUBLIC_CLOUDFLARE_STREAM_CUSTOMER_CODE ?? '';
}

class VideoInstance implements GameInstance<AtomResult> {
  private completeCb: ((result: AtomResult) => void) | null = null;
  private errorCb: ((error: GameError) => void) | null = null;
  private progressCb: ((progress: number) => void) | null = null;
  private messageHandler: ((event: MessageEvent) => void) | null = null;
  private start = performance.now();
  private secondsWatched = 0;
  private completed = false;

  constructor(
    private iframe: HTMLIFrameElement,
    private container: HTMLElement,
    private minDurationSeconds: number,
  ) {
    this.bindPlayer();
  }

  private bindPlayer(): void {
    const handler = (event: MessageEvent) => {
      const data = event.data;
      if (typeof data !== 'object' || data === null) return;
      const msg = data as {
        type?: string;
        currentTime?: number;
        duration?: number;
        error?: string;
      };
      if (msg.type === 'timeupdate' && typeof msg.currentTime === 'number') {
        this.secondsWatched = msg.currentTime;
        if (typeof msg.duration === 'number' && msg.duration > 0) {
          this.progressCb?.(msg.currentTime / msg.duration);
        }
      }
      if (msg.type === 'ended' && !this.completed) {
        this.handleEnded();
      }
      if (msg.type === 'error') {
        this.errorCb?.(
          new GameError(
            msg.error ?? 'Video player error',
            'VIDEO_PLAYER_ERROR',
          ),
        );
      }
    };
    this.messageHandler = handler;
    window.addEventListener('message', handler);
  }

  private handleEnded(): void {
    this.completed = true;
    const success = this.secondsWatched >= this.minDurationSeconds;
    this.completeCb?.({
      success,
      durationMs: performance.now() - this.start,
      attempts: 1,
      difficultyLevel: 1,
      conceptsScored: [],
      raw: { secondsWatched: this.secondsWatched },
    });
  }

  pause(): void {
    this.iframe.contentWindow?.postMessage({ type: 'pause' }, '*');
  }
  resume(): void {
    this.iframe.contentWindow?.postMessage({ type: 'play' }, '*');
  }
  async destroy(): Promise<void> {
    if (this.messageHandler) {
      window.removeEventListener('message', this.messageHandler);
      this.messageHandler = null;
    }
    this.container.innerHTML = '';
  }
  onComplete(cb: (result: AtomResult) => void): void {
    this.completeCb = cb;
  }
  onError(cb: (error: GameError) => void): void {
    this.errorCb = cb;
  }
  onProgress(cb: (progress: number) => void): void {
    this.progressCb = cb;
  }
}
