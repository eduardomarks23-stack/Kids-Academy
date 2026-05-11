/**
 * Banco de palavras do Resgate da Primeira Letra.
 *
 * Progressão pedagógica (alfabetização inicial 3-6 anos):
 *   - Rodadas 1-2: palavras curtas e fonemas simples (G,B,S,P,M)
 *   - Rodada 3: vogais como letra inicial (A,E,U)
 *   - Rodada 4: distratores fonéticos (B vs P, F vs V)
 *   - Rodada 5: 4 distratores e palavras um pouco maiores
 *
 * Cada rodada apresenta uma palavra. Distratores são embaralhados
 * com a letra correta nas bolhas.
 */

export interface WordRound {
  /** Palavra completa em maiúsculas (ex: "GATO") */
  readonly word: string;
  /** Letra inicial (= word[0]) */
  readonly correctLetter: string;
  /** Emoji que ilustra a palavra */
  readonly emoji: string;
  /** Letras incorretas a misturar nas bolhas */
  readonly distractors: readonly string[];
  /** Texto pronunciado pelo TTS quando a criança aperta o botão de áudio */
  readonly audioCue: string;
}

export const WORD_ROUNDS: readonly WordRound[] = [
  {
    word: 'GATO',
    correctLetter: 'G',
    emoji: '🐱',
    distractors: ['B', 'T'],
    audioCue: 'Gato. Arraste a letra que começa a palavra gato.',
  },
  {
    word: 'BOLA',
    correctLetter: 'B',
    emoji: '⚽',
    distractors: ['D', 'P'],
    audioCue: 'Bola. Arraste a letra que começa a palavra bola.',
  },
  {
    word: 'SOL',
    correctLetter: 'S',
    emoji: '☀️',
    distractors: ['L', 'M', 'C'],
    audioCue: 'Sol. Arraste a letra que começa a palavra sol.',
  },
  {
    word: 'PATO',
    correctLetter: 'P',
    emoji: '🦆',
    distractors: ['B', 'T', 'D'],
    audioCue: 'Pato. Arraste a letra que começa a palavra pato.',
  },
  {
    word: 'FOCA',
    correctLetter: 'F',
    emoji: '🦭',
    distractors: ['V', 'C', 'O'],
    audioCue: 'Foca. Arraste a letra que começa a palavra foca.',
  },
] as const;

export function displayWord(word: string): string {
  // Substitui a primeira letra por um underline visual mantendo o espaço.
  return '_' + word.slice(1);
}
