/**
 * store/useReadingStore.ts
 * Store Zustand para gerenciamento de estado do treino de leitura.
 * 
 * Responsabilidades:
 * - Rastrear progresso do treino (palavra atual, acertos)
 * - Controlar estado ativo/inativo do treino
 * - Registrar histórico de tentativas para analytics pedagógico
 * - Persistir estado de conclusão para recompensas/achievement
 * 
 * Integração com TanStack Query:
 * - O store é consumido diretamente pelos componentes React.
 * - Para persistência em servidor (progresso do aluno), use TanStack Query
 *   em conjunto com as actions deste store.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// ─── Tipos ───

/** Representa uma tentativa do aluno (acerto ou erro) */
export interface AttemptRecord {
  readonly wordIndex: number;
  readonly letter: string;
  readonly isCorrect: boolean;
  readonly timestamp: number;
}

/** Estado completo do treino */
interface ReadingTrainingState {
  // ─── Estado Core ───
  /** Índice da palavra atual sendo apresentada (0-based) */
  currentWordIndex: number;

  /** Quantidade de palavras respondidas corretamente */
  correctAnswers: number;

  /** Se o treino está em andamento */
  isTrainingActive: boolean;

  /** Se o treino foi concluído com sucesso */
  trainingCompleted: boolean;

  /** Histórico de todas as tentativas do treino atual */
  attempts: readonly AttemptRecord[];

  // ─── Estado de UI ───
  /** Se o modal de conclusão está visível */
  isCompletionModalOpen: boolean;

  /** Palavra que acabou de ser completada (para animação de UI) */
  lastCompletedWord: string | null;

  // ─── Ações ───
  startTraining: () => void;
  completeWord: (word: string, wordIndex: number) => void;
  registerAttempt: (attempt: Omit<AttemptRecord, 'timestamp'>) => void;
  completeTraining: () => void;
  resetTraining: () => void;
  closeCompletionModal: () => void;
}

// ─── Estado Inicial (para reset) ───
const initialState: Omit<
  ReadingTrainingState,
  | 'startTraining'
  | 'completeWord'
  | 'registerAttempt'
  | 'completeTraining'
  | 'resetTraining'
  | 'closeCompletionModal'
> = {
  currentWordIndex: 0,
  correctAnswers: 0,
  isTrainingActive: false,
  trainingCompleted: false,
  attempts: [],
  isCompletionModalOpen: false,
  lastCompletedWord: null,
};

// ─── Store ───
export const useReadingStore = create<ReadingTrainingState>()(
  devtools(
    (set) => ({
      ...initialState,

      /**
       * Inicia um novo treino.
       * Reseta todo o estado e marca como ativo.
       */
      startTraining: () =>
        set(
          {
            ...initialState,
            isTrainingActive: true,
          },
          false,
          'reading/startTraining'
        ),

      /**
       * Registra o acerto de uma palavra.
       * Atualiza índice e contador de acertos.
       */
      completeWord: (word: string, _wordIndex: number) =>
        set(
          (state) => ({
            currentWordIndex: state.currentWordIndex + 1,
            correctAnswers: state.correctAnswers + 1,
            lastCompletedWord: word,
          }),
          false,
          'reading/completeWord'
        ),

      /**
       * Registra uma tentativa (acerto ou erro) no histórico.
       * Útil para analytics e acompanhamento pedagógico.
       */
      registerAttempt: (attempt) =>
        set(
          (state) => ({
            attempts: [
              ...state.attempts,
              { ...attempt, timestamp: Date.now() },
            ],
          }),
          false,
          'reading/registerAttempt'
        ),

      /**
       * Marca o treino como concluído e abre o modal de sucesso.
       */
      completeTraining: () =>
        set(
          {
            isTrainingActive: false,
            trainingCompleted: true,
            isCompletionModalOpen: true,
            lastCompletedWord: null,
          },
          false,
          'reading/completeTraining'
        ),

      /**
       * Reseta o estado para permitir rejogar o treino.
       */
      resetTraining: () =>
        set(
          {
            ...initialState,
          },
          false,
          'reading/resetTraining'
        ),

      /**
       * Fecha o modal de conclusão sem resetar o treino.
       */
      closeCompletionModal: () =>
        set(
          { isCompletionModalOpen: false },
          false,
          'reading/closeCompletionModal'
        ),
    }),
    { name: 'ReadingTrainingStore' }
  )
);
