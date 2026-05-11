/**
 * readingGameConfig.ts
 * Configuração centralizada do Phaser 3 para o micro-jogo "Resgate da Primeira Letra".
 * 
 * Design decisions:
 * - Canvas transparente para permitir overlay de UI React (glassmorphism).
 * - Physics Arcade para movimentação suave das bolhas flutuantes.
 * - Scale RESIZE garante responsividade nativa em tablets e smartphones.
 * - Parent vinculado a um container DOM gerenciado pelo React.
 */

import { Types } from 'phaser';
import { ReadingScene } from './ReadingScene';

export const PHASER_PARENT_CONTAINER_ID = 'reading-phaser-container';

/**
 * Evento customizado emitido pela Scene Phaser quando o treino é concluído.
 * Usado como ponte de comunicação Phaser → React via EventTarget nativo.
 */
export const ON_TRAINING_COMPLETE = 'reading:training-complete';

/**
 * Evento customizado emitido quando uma palavra é acertada.
 * Payload: { wordIndex: number, word: string }
 */
export const ON_WORD_COMPLETED = 'reading:word-completed';

/**
 * Evento customizado emitido quando uma tentativa incorreta ocorre.
 * Payload: { letter: string }
 */
export const ON_WRONG_ATTEMPT = 'reading:wrong-attempt';

/**
 * Configuração de palavras do treino.
 * Cada item representa uma rodada do jogo.
 */
export interface TrainingWord {
  readonly id: string;
  readonly word: string;           // Palavra completa (ex: "GATO")
  readonly displayWord: string;    // Como aparece na tela (ex: "_ATO")
  readonly correctLetter: string;  // Letra inicial correta
  readonly imageEmoji: string;     // Emoji representando o objeto/animal
  readonly distractors: readonly string[]; // Letras incorretas para as bolhas
  readonly audioCue: string;       // Descrição textual do áudio (placeholder para TTS)
}

export const TRAINING_WORDS: readonly TrainingWord[] = [
  {
    id: 'word-001',
    word: 'GATO',
    displayWord: '_ATO',
    correctLetter: 'G',
    imageEmoji: '🐱',
    distractors: ['B', 'T'],
    audioCue: 'Gato! Arraste a letra que começa a palavra gato.',
  },
  {
    id: 'word-002',
    word: 'BOLA',
    displayWord: '_OLA',
    correctLetter: 'B',
    imageEmoji: '⚽',
    distractors: ['D', 'P'],
    audioCue: 'Bola! Arraste a letra que começa a palavra bola.',
  },
  {
    id: 'word-003',
    word: 'SOL',
    displayWord: '_OL',
    correctLetter: 'S',
    imageEmoji: '☀️',
    distractors: ['L', 'M'],
    audioCue: 'Sol! Arraste a letra que começa a palavra sol.',
  },
] as const;

/**
 * Configuração do jogo Phaser.
 * Nota: O parent é definido dinamicamente no componente React,
 * mas aqui deixamos a estrutura tipada para referência.
 */
export const getPhaserConfig = (
  parentElementId: string
): Types.Core.GameConfig => ({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: parentElementId,
  transparent: true, // Permite ver o fundo React por baixo do canvas
  backgroundColor: 'rgba(0,0,0,0)',
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 }, // Sem gravidade — as bolhas flutuam livremente
      debug: process.env.NODE_ENV === 'development',
    },
  },
  scene: [ReadingScene],
  // Desabilita interações padrão que possam conflitar com gestos touch do React
  input: {
    touch: {
      capture: true,
    },
  },
});
