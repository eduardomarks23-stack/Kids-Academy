/**
 * Game Adapter Pattern — contrato unificado para todos os jogos
 * (independente da engine: React, Phaser, PixiJS).
 *
 * Cada jogo implementa esta interface; o GameRunner carrega a
 * engine apropriada via lazy import com base em `engine`.
 */

export type GameEngine = 'react' | 'phaser' | 'pixi';

export interface GameConfig {
  /** ID da criança (perfis_crianca.id) — usado para tracking */
  perfilCriancaId: string;
  /** ID da sessão atual (sessoes.id) */
  sessaoId?: string;
  /** Configurações específicas do jogo (passadas via Supabase jogos.config) */
  customConfig?: Record<string, unknown>;
  /** Locale ativo */
  locale?: 'pt-BR' | 'en' | 'es';
}

export interface GameResult {
  score: number;
  duracaoSegundos: number;
  acertos: number;
  erros: number;
  conceitosTrabalhados: string[];
}

/**
 * Eventos comportamentais — 15 dimensões mapeadas no Supabase
 * (enum tipo_evento_comportamento em 20260508120200_progress_tracking.sql).
 */
export type BehaviorEventType =
  | 'tempo_resposta'
  | 'hesitacao'
  | 'tentativas_multiplas'
  | 'padrao_erro'
  | 'engajamento_foco'
  | 'velocidade_leitura'
  | 'uso_de_dica'
  | 'desistencia'
  | 'retomada'
  | 'conquista_streak'
  | 'erro_conceitual'
  | 'tempo_total_sessao'
  | 'interacao_audio'
  | 'replay_solicitado'
  | 'feedback_emocional';

export interface BehaviorEvent {
  type: BehaviorEventType;
  valor: Record<string, unknown>;
  questaoId?: string;
}

/**
 * Interface mestre — todo jogo Kids Academy implementa este contrato.
 * O GameRunner não conhece a implementação interna; chama apenas estes métodos.
 */
export interface KidsAcademyGame {
  readonly id: string;
  readonly title: string;
  readonly engine: GameEngine;
  readonly conceitos: string[];

  mount(container: HTMLElement, config: GameConfig): Promise<void>;
  unmount(): void;
  pause(): void;
  resume(): void;
  reset(): void;
}

/**
 * Callbacks que o GameRunner passa para o jogo.
 * O jogo invoca estes callbacks para reportar score/conclusão/comportamento.
 */
export interface GameCallbacks {
  onScore: (points: number) => void;
  onComplete: (result: GameResult) => void;
  onBehavior: (event: BehaviorEvent) => void;
}

export interface KidsAcademyGameWithCallbacks extends KidsAcademyGame {
  setCallbacks(callbacks: GameCallbacks): void;
}
