"use client";

/**
 * ReadingTrainingModule.tsx
 * Componente React (Next.js App Router) que orquestra o micro-jogo
 * "Resgate da Primeira Letra".
 * 
 * ARQUITETURA DE INTEGRAÇÃO:
 * ──────────────────────────
 * Este componente atua como a camada de "Glue" entre três mundos:
 * 
 *   1. Phaser 3 (Game Engine)   → Renderiza o canvas com bolhas, drag & drop, partículas
 *   2. Zustand (State Manager)  → Centraliza estado do treino (progresso, acertos)
 *   3. React (UI Layer)         → Overlay de HUD, modais, botões (shadcn/ui + Framer Motion)
 * 
 * PONTE DE COMUNICAÇÃO (Event Emitter Pattern):
 * ─────────────────────────────────────────────
 * Como Phaser e React vivem em ciclos de vida diferentes, usamos o EventTarget
 * nativo do DOM (window) como barramento de eventos desacoplado:
 * 
 *   Phaser (ReadingScene) ──dispatchEvent──► window
 *                                        │
 *                                        ▼
 *   React (useEffect) ◄──addEventListener──┘
 * 
 * Vantagens desta abordagem:
 * - Zero acoplamento direto entre Scene e Componente
 * - Não há passagem de refs ou callbacks que causariam stale closures
 * - Fácil de testar unitariamente (basta disparar CustomEvents)
 * - Compatível com SSR (eventos só são registrados no client)
 * 
 * GESTÃO DE MEMÓRIA:
 * ──────────────────
 * O Phaser Game deve ser destruído explicitamente no cleanup do useEffect
 * para evitar memory leaks de WebGL contexts e listeners de input.
 * O array de dependências vazio [] garante que isso só ocorra uma vez
 * por montagem do componente.
 */

import { useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Volume2, RotateCcw, ArrowRight } from "lucide-react";

// ─── Phaser (importação dinâmica para evitar SSR) ───
import Phaser from "phaser";

// ─── Configuração e Store ───
import {
  getPhaserConfig,
  PHASER_PARENT_CONTAINER_ID,
  ON_TRAINING_COMPLETE,
  ON_WORD_COMPLETED,
  ON_WRONG_ATTEMPT,
  TRAINING_WORDS,
} from "./readingGameConfig";
import { useReadingStore } from "./store/useReadingStore";

// ─── shadcn/ui components ───
// Nota: Ajuste os imports conforme a estrutura do seu projeto shadcn
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// ═══════════════════════════════════════════════════
//  COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════
export default function ReadingTrainingModule(): JSX.Element {
  // Ref para armazenar a instância do Phaser Game (persiste entre renders)
  const gameRef = useRef<Phaser.Game | null>(null);

  // Ref para garantir inicialização única (estrit mode safety)
  const initializedRef = useRef<boolean>(false);

  // ─── Estado do Zustand ───
  const {
    currentWordIndex,
    correctAnswers,
    isTrainingActive,
    trainingCompleted,
    isCompletionModalOpen,
    lastCompletedWord,
    startTraining,
    completeWord,
    registerAttempt,
    completeTraining,
    resetTraining,
    closeCompletionModal,
  } = useReadingStore();

  // ═══════════════════════════════════════════════════
  //  INICIALIZAÇÃO DO PHASER (CLIENT-SIDE ONLY)
  // ═══════════════════════════════════════════════════
  useEffect(() => {
    // Guarda contra StrictMode double-mount e SSR
    if (initializedRef.current || typeof window === "undefined") return;
    initializedRef.current = true;

    // Inicia o estado do treino
    startTraining();

    // Cria a instância do jogo Phaser
    const config = getPhaserConfig(PHASER_PARENT_CONTAINER_ID);
    gameRef.current = new Phaser.Game(config);

    // ─── Cleanup: destrói o jogo ao desmontar ───
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
      initializedRef.current = false;
    };
  }, [startTraining]);

  // ═══════════════════════════════════════════════════
  //  PONTE DE EVENTOS: Phaser → React
  // ═══════════════════════════════════════════════════
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Handler para quando uma palavra é completada
    const handleWordCompleted = (event: Event) => {
      const customEvent = event as CustomEvent<{
        wordIndex: number;
        word: string;
        letter: string;
      }>;
      const { word, wordIndex } = customEvent.detail;
      completeWord(word, wordIndex);
    };

    // Handler para tentativas incorretas
    const handleWrongAttempt = (event: Event) => {
      const customEvent = event as CustomEvent<{
        letter: string;
        wordIndex: number;
      }>;
      const { letter, wordIndex } = customEvent.detail;
      registerAttempt({
        wordIndex,
        letter,
        isCorrect: false,
      });
    };

    // Handler para conclusão do treino
    const handleTrainingComplete = (_event: Event) => {
      completeTraining();
    };

    // Registra os listeners no window (barramento global)
    window.addEventListener(ON_WORD_COMPLETED, handleWordCompleted);
    window.addEventListener(ON_WRONG_ATTEMPT, handleWrongAttempt);
    window.addEventListener(ON_TRAINING_COMPLETE, handleTrainingComplete);

    // Cleanup: remove listeners ao desmontar
    return () => {
      window.removeEventListener(ON_WORD_COMPLETED, handleWordCompleted);
      window.removeEventListener(ON_WRONG_ATTEMPT, handleWrongAttempt);
      window.removeEventListener(ON_TRAINING_COMPLETE, handleTrainingComplete);
    };
  }, [completeWord, registerAttempt, completeTraining]);

  // ═══════════════════════════════════════════════════
  //  HANDLERS DE UI
  // ═══════════════════════════════════════════════════
  const handleRestartTraining = useCallback(() => {
    resetTraining();
    closeCompletionModal();

    // Reinicia a cena do Phaser
    if (gameRef.current) {
      const scene = gameRef.current.scene.getScene("ReadingScene");
      if (scene) {
        scene.scene.restart();
      }
    }

    // Re-inicia o treino no store após um breve delay
    setTimeout(() => startTraining(), 100);
  }, [resetTraining, closeCompletionModal, startTraining]);

  const handleNextTraining = useCallback(() => {
    // Aqui você integraria com a navegação da plataforma
    // Exemplo: router.push('/treinos/proximo')
    closeCompletionModal();
  }, [closeCompletionModal]);

  // ═══════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      {/* 
        ═══════════════════════════════════════════════
        LAYER 1: Container do Phaser Canvas
        ───────────────────────────────────────────────
        O canvas do Phaser é renderizado dentro deste div.
        Tailwind garante responsividade em qualquer dispositivo.
        O canvas é transparente (ver readingGameConfig.ts),
        permitindo que o gradiente de fundo apareça por baixo.
      */}
      <div
        id={PHASER_PARENT_CONTAINER_ID}
        className="absolute inset-0 w-full h-full touch-none"
        aria-label="Área do jogo de leitura"
        role="application"
      />

      {/* 
        ═══════════════════════════════════════════════
        LAYER 2: HUD React (Overlay sobre o Canvas)
        ───────────────────────────────────────────────
        UI leve e não-intrusiva que acompanha o progresso
        sem interferir nas interações do Phaser.
      */}
      <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
        {/* Barra de progresso superior */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          {/* Badge de progresso */}
          <div className="pointer-events-auto">
            <Badge
              variant="secondary"
              className="bg-white/70 backdrop-blur-sm text-slate-700 font-semibold px-3 py-1.5 text-sm shadow-sm border border-white/50"
            >
              <Star className="w-3.5 h-3.5 mr-1.5 text-amber-500 fill-amber-500" />
              Palavra {Math.min(currentWordIndex + 1, TRAINING_WORDS.length)} de{" "}
              {TRAINING_WORDS.length}
            </Badge>
          </div>

          {/* Indicador de acertos */}
          <div className="pointer-events-auto">
            <Badge
              variant="secondary"
              className="bg-white/70 backdrop-blur-sm text-emerald-700 font-semibold px-3 py-1.5 text-sm shadow-sm border border-white/50"
            >
              <Trophy className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
              {correctAnswers} acerto{correctAnswers !== 1 ? "s" : ""}
            </Badge>
          </div>
        </div>

        {/* Barra de progresso visual */}
        <div className="mx-4 sm:mx-6 h-2 bg-white/40 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{
              width: `${(currentWordIndex / TRAINING_WORDS.length) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* 
        ═══════════════════════════════════════════════
        LAYER 3: Notificação de Palavra Completada
        ───────────────────────────────────────────────
        Toast flutuante que aparece brevemente quando
        o aluno acerta uma palavra.
      */}
      <AnimatePresence>
        {lastCompletedWord && (
          <motion.div
            key={lastCompletedWord}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          >
            <div className="bg-emerald-500/90 backdrop-blur-md text-white px-6 py-3 rounded-2xl shadow-lg border border-emerald-400/50 font-bold text-lg">
              🎉 {lastCompletedWord}! Muito bem!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        ═══════════════════════════════════════════════
        LAYER 4: Modal de Conclusão (Glassmorphism)
        ───────────────────────────────────────────────
        Aparece quando o treino é finalizado com sucesso.
        Design Glassmorphism com Framer Motion para animações
        fluidas e reforço positivo ao aluno.
      */}
      <AnimatePresence>
        {isCompletionModalOpen && trainingCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop com blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
              onClick={closeCompletionModal}
            />

            {/* Card Glassmorphism */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: 0.1,
              }}
              className="relative z-10 w-full max-w-md"
            >
              <Card className="border border-white/40 shadow-2xl overflow-hidden">
                {/* Header com gradiente */}
                <div className="bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-md bg-white/10 p-8 text-center">
                  {/* Ícone animado de troféu */}
                  <motion.div
                    initial={{ rotate: -20, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.3,
                    }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 shadow-lg mb-4"
                  >
                    <Trophy className="w-10 h-10 text-white" />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2"
                  >
                    Treino Concluído! 🎉
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-slate-600 text-base"
                  >
                    Você completou todas as palavras do treino de leitura!
                  </motion.p>
                </div>

                <CardContent className="p-6 space-y-4 bg-white/60 backdrop-blur-md">
                  {/* Badge de conquista */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center justify-center"
                  >
                    <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 px-4 py-2 text-sm font-bold shadow-md hover:from-amber-500 hover:to-orange-600 transition-colors">
                      <Star className="w-4 h-4 mr-1.5 fill-white" />
                      Conquista: Leitor Iniciante
                    </Badge>
                  </motion.div>

                  {/* Resumo do treino */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="grid grid-cols-2 gap-3"
                  >
                    <div className="bg-white/50 rounded-xl p-3 text-center border border-white/60">
                      <div className="text-2xl font-bold text-blue-600">
                        {correctAnswers}
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        Palavras acertadas
                      </div>
                    </div>
                    <div className="bg-white/50 rounded-xl p-3 text-center border border-white/60">
                      <div className="text-2xl font-bold text-emerald-600">
                        {TRAINING_WORDS.length}
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        Total de palavras
                      </div>
                    </div>
                  </motion.div>

                  {/* Botões de ação */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-3 pt-2"
                  >
                    <Button
                      variant="outline"
                      className="flex-1 bg-white/70 hover:bg-white/90 backdrop-blur-sm border-slate-300 text-slate-700 font-semibold"
                      onClick={handleRestartTraining}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Refazer Treino
                    </Button>

                    <Button
                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-blue-500/25"
                      onClick={handleNextTraining}
                    >
                      Próximo Treino
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        ═══════════════════════════════════════════════
        LAYER 5: Botão de Áudio (Acessibilidade)
        ───────────────────────────────────────────────
        Permite que a criança (ou responsável) ouça
        novamente a instrução do treino atual.
      */}
      {isTrainingActive && currentWordIndex < TRAINING_WORDS.length && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="absolute bottom-6 right-6 z-10 w-14 h-14 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/60 flex items-center justify-center text-blue-600 hover:bg-white hover:scale-110 transition-all active:scale-95"
          onClick={() => {
            // Integração com TTS (Web Speech API)
            const word = TRAINING_WORDS[currentWordIndex];
            if ("speechSynthesis" in window) {
              const utterance = new SpeechSynthesisUtterance(word.audioCue);
              utterance.lang = "pt-BR";
              utterance.rate = 0.85; // Mais lento para crianças
              utterance.pitch = 1.2; // Tom mais amigável
              window.speechSynthesis.speak(utterance);
            }
          }}
          aria-label="Ouvir instrução"
        >
          <Volume2 className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
}
