'use client';

import { createClient } from '@/lib/supabase/client';
import type { Json } from '@/types/database.types';
import type { BehaviorEvent, BehaviorEventType } from './types';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const isUuid = (v: string | undefined): v is string => !!v && UUID_RE.test(v);

/**
 * BehaviorTracker — captura eventos comportamentais com debounce/batch
 * e persiste em `eventos_comportamento` no Supabase.
 *
 * Uso típico:
 *   const tracker = new BehaviorTracker({ perfilCriancaId, sessaoId, jogoId });
 *   tracker.track({ type: 'tempo_resposta', valor: { ms: 2400 }, questaoId: '...' });
 *   await tracker.flush();
 *   tracker.dispose();
 */

interface TrackerConfig {
  perfilCriancaId: string;
  sessaoId?: string;
  jogoId?: string;
  aulaId?: string;
  /** Intervalo de flush automático (ms). 0 desabilita. */
  flushIntervalMs?: number;
  /** Tamanho do batch antes de flush automático. */
  batchSize?: number;
}

interface QueuedEvent {
  type: BehaviorEventType;
  valor: Record<string, unknown>;
  questao_id?: string;
  registrado_em: string;
}

export class BehaviorTracker {
  private config: Required<Omit<TrackerConfig, 'jogoId' | 'aulaId' | 'sessaoId'>> &
    Pick<TrackerConfig, 'jogoId' | 'aulaId' | 'sessaoId'>;
  private queue: QueuedEvent[] = [];
  private flushTimer?: ReturnType<typeof setInterval>;
  private hesitacaoTimer?: ReturnType<typeof setTimeout>;
  private blurListener?: () => void;
  private focusListener?: () => void;
  private disposed = false;

  constructor(config: TrackerConfig) {
    this.config = {
      perfilCriancaId: config.perfilCriancaId,
      sessaoId: config.sessaoId,
      jogoId: config.jogoId,
      aulaId: config.aulaId,
      flushIntervalMs: config.flushIntervalMs ?? 5000,
      batchSize: config.batchSize ?? 20,
    };

    if (this.config.flushIntervalMs > 0) {
      this.flushTimer = setInterval(() => {
        void this.flush();
      }, this.config.flushIntervalMs);
    }

    this.attachEngagementListeners();
  }

  /** Adiciona evento à fila. Flush automático ao bater batchSize. */
  track(event: BehaviorEvent): void {
    if (this.disposed) return;

    this.queue.push({
      type: event.type,
      valor: event.valor,
      questao_id: event.questaoId,
      registrado_em: new Date().toISOString(),
    });

    if (this.queue.length >= this.config.batchSize) {
      void this.flush();
    }
  }

  /** Helper: registra hesitação (mouse parado >3s na questão atual). */
  resetHesitacaoTimer(questaoId?: string): void {
    if (this.hesitacaoTimer) clearTimeout(this.hesitacaoTimer);
    this.hesitacaoTimer = setTimeout(() => {
      this.track({
        type: 'hesitacao',
        valor: { duracao_ms: 3000 },
        questaoId,
      });
    }, 3000);
  }

  /** Persiste fila no Supabase. */
  async flush(): Promise<void> {
    if (this.queue.length === 0) return;

    const batch = this.queue.splice(0);
    const supabase = createClient();

    // FK columns esperam UUID. Slugs (ex: 'encaixe-formas') são preservados em valor.jogo_slug.
    const sessaoId = isUuid(this.config.sessaoId) ? this.config.sessaoId : null;
    const jogoId = isUuid(this.config.jogoId) ? this.config.jogoId : null;
    const aulaId = isUuid(this.config.aulaId) ? this.config.aulaId : null;
    const jogoSlug = !jogoId && this.config.jogoId ? this.config.jogoId : null;

    const rows = batch.map((e) => ({
      perfil_crianca_id: this.config.perfilCriancaId,
      sessao_id: sessaoId,
      jogo_id: jogoId,
      aula_id: aulaId,
      tipo: e.type,
      valor: { ...e.valor, ...(jogoSlug ? { jogo_slug: jogoSlug } : {}) } as Json,
      questao_id: isUuid(e.questao_id) ? e.questao_id : null,
      registrado_em: e.registrado_em,
    }));

    const { error } = await supabase.from('eventos_comportamento').insert(rows);
    if (error) {
      // Re-enqueue em caso de erro (com cap pra evitar loop infinito).
      if (this.queue.length < 100) {
        this.queue.unshift(...batch);
      }
      console.warn('[BehaviorTracker] flush failed', error);
    }
  }

  /** Limpa timers e desconecta listeners. */
  dispose(): void {
    this.disposed = true;
    if (this.flushTimer) clearInterval(this.flushTimer);
    if (this.hesitacaoTimer) clearTimeout(this.hesitacaoTimer);
    this.detachEngagementListeners();
    void this.flush();
  }

  /** Listeners de engajamento (foco vs distração). */
  private attachEngagementListeners(): void {
    if (typeof window === 'undefined') return;

    this.blurListener = () => {
      this.track({ type: 'engajamento_foco', valor: { foco: false } });
    };
    this.focusListener = () => {
      this.track({ type: 'engajamento_foco', valor: { foco: true } });
    };

    window.addEventListener('blur', this.blurListener);
    window.addEventListener('focus', this.focusListener);
  }

  private detachEngagementListeners(): void {
    if (typeof window === 'undefined') return;
    if (this.blurListener) window.removeEventListener('blur', this.blurListener);
    if (this.focusListener) window.removeEventListener('focus', this.focusListener);
  }
}
