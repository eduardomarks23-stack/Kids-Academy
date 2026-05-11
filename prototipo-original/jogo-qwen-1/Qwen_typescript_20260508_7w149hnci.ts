import { create } from 'zustand';

export interface GameStoreState {
  isPlaying: boolean;
  score: number;
  isVictory: boolean;
  startGame: () => void;
  updateScore: (score: number) => void;
  setVictory: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStoreState>((set) => ({
  isPlaying: false,
  score: 0,
  isVictory: false,
  startGame: () => set({ isPlaying: true, score: 0, isVictory: false }),
  updateScore: (score) => set({ score }),
  setVictory: () => set({ isVictory: true, isPlaying: false }),
  resetGame: () => set({ isPlaying: true, score: 0, isVictory: false }),
}));