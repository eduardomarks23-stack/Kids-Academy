// =============================================================
// NarrationPlayer — playback de áudio pré-renderizado
// =============================================================
// Hosteado em Cloudflare R2; URL vem de atoms.config.
// Usado como fallback quando TTSService.isAvailable() === false.
// =============================================================

export class NarrationPlayer {
  private audio: HTMLAudioElement | null = null;

  async play(url: string): Promise<void> {
    this.stop();
    return new Promise((resolve, reject) => {
      const audio = new Audio(url);
      audio.preload = 'auto';
      audio.onended = () => {
        this.audio = null;
        resolve();
      };
      audio.onerror = () => {
        this.audio = null;
        reject(new Error(`Falha ao carregar áudio: ${url}`));
      };
      this.audio = audio;
      void audio.play();
    });
  }

  pause(): void {
    this.audio?.pause();
  }

  resume(): void {
    void this.audio?.play();
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
  }

  get isPlaying(): boolean {
    return this.audio !== null && !this.audio.paused;
  }
}

let instance: NarrationPlayer | null = null;
export function getNarrationPlayer(): NarrationPlayer {
  if (!instance) instance = new NarrationPlayer();
  return instance;
}
