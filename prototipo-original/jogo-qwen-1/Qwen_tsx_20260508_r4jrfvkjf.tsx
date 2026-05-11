"use client";

import { useEffect, useRef, useCallback } from 'react';
import Phaser from 'phaser';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGameStore } from '@/store/useGameStore';
import { createGameConfig } from './gameConfig';

export default function GameComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  
  const { isPlaying, score, isVictory, startGame, updateScore, setVictory, resetGame } = useGameStore();

  const handleRestart = useCallback(() => {
    resetGame();
    if (gameRef.current) {
      const scene = gameRef.current.scene.getScene('MainScene');
      if (scene) scene.scene.restart();
    }
  }, [resetGame]);

  useEffect(() => {
    // 🔒 SSR Safety: Phaser só é instanciado no cliente
    if (!containerRef.current || gameRef.current) return;

    const config = createGameConfig(containerRef.current.id);
    const game = new Phaser.Game(config);
    gameRef.current = game;

    // 🔗 Ponte React -> Phaser: Escuta eventos da cena quando estiver pronta
    game.events.on('sceneReady', (scene: Phaser.Scene) => {
      if (scene.scene.key === 'MainScene') {
        scene.events.on('scoreUpdate', (newScore: number) => updateScore(newScore));
        scene.events.on('victory', () => setVictory());
      }
    });

    startGame();

    // 🧹 Cleanup rigoroso para evitar múltiplos canvas e memory leaks
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [startGame, updateScore, setVictory]);

  return (
    <div className="relative w-full max-w-3xl mx-auto select-none">
      {/* Container do Phaser: Responsivo e otimizado para toque */}
      <div
        id="phaser-game-container"
        ref={containerRef}
        className="w-full h-full aspect-video rounded-xl shadow-lg overflow-hidden bg-sky-50 touch-manipulation"
      />

      {/* Indicador de progresso (UI React sobreposta) */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-md text-sm font-bold text-slate-700 border border-slate-200">
        ✨ Formas: {score}/3
      </div>

      {/* 🎉 Overlay de Vitória com Framer Motion + shadcn/ui */}
      <AnimatePresence>
        {isVictory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-xl z-50"
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <Card className="w-80 border-2 border-yellow-400 bg-white shadow-2xl">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl font-extrabold text-yellow-600 tracking-tight">
                    🌟 Parabéns! 🌟
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                  <p className="text-base text-slate-600 text-center leading-relaxed">
                    Você encaixou todas as formas mágicas!
                  </p>
                  <div className="flex gap-3 text-4xl animate-bounce">
                    <span>🔴</span><span>🟦</span><span>🔺</span>
                  </div>
                  <Button
                    onClick={handleRestart}
                    className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold text-lg py-6 rounded-full shadow-md transition-all active:scale-95"
                  >
                    Jogar Novamente 🔄
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}