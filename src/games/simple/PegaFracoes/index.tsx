'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FractionPizza, FractionSquare, FractionCircle } from '@/components/kids/fraction-shapes';
import { KidsIcon } from '@/components/kids/icons';
import type { GameComponentProps } from '@/games/core/GameRunner';

/**
 * Pega Frações — jogo simples React + Framer Motion.
 *
 * Mecânica: arrastar carta de fração (1/2, 1/4, 3/4) para a forma visual correta.
 * Captura: tempo de resposta, hesitação, tentativas múltiplas, acerto/erro.
 *
 * Bundle: ~50KB (sem Phaser).
 */

interface Target {
  id: string;
  answer: string;
  node: React.ReactNode;
}

const TARGETS: Target[] = [
  {
    id: 'p2',
    answer: '1/2',
    node: <FractionPizza parts={2} filled={1} size={120} color="#FCD34D" />,
  },
  {
    id: 's4',
    answer: '1/4',
    node: <FractionSquare parts={4} filled={1} size={120} color="#10B981" />,
  },
  {
    id: 'c4',
    answer: '3/4',
    node: <FractionCircle parts={4} filled={3} size={120} color="#3B82F6" />,
  },
];

const CARDS = ['1/2', '1/4', '3/4'];

export default function PegaFracoes({ callbacks }: GameComponentProps) {
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<'right' | 'wrong' | null>(null);
  const [draggedOver, setDraggedOver] = useState<string | null>(null);
  const [tentativas, setTentativas] = useState<Record<string, number>>({});
  const [score, setScore] = useState(0);
  const iniciadoRef = useRef<number>(0);
  const questaoStartRef = useRef<number>(0);

  const allDone = Object.keys(matched).length === TARGETS.length;

  useEffect(() => {
    const now = Date.now();
    iniciadoRef.current = now;
    questaoStartRef.current = now;
  }, []);

  useEffect(() => {
    if (!allDone) return;
    const duracao = Math.floor((Date.now() - iniciadoRef.current) / 1000);
    callbacks.onComplete({
      score,
      duracaoSegundos: duracao,
      acertos: Object.keys(matched).length,
      erros: Object.values(tentativas).reduce((sum, t) => sum + Math.max(0, t - 1), 0),
      conceitosTrabalhados: ['fracoes'],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDone]);

  function handleDrop(targetId: string, frac: string) {
    const target = TARGETS.find((t) => t.id === targetId);
    if (!target) return;

    // eslint-disable-next-line react-hooks/purity
    const tempoRespostaMs = Date.now() - questaoStartRef.current;
    callbacks.onBehavior({
      type: 'tempo_resposta',
      valor: { ms: tempoRespostaMs, fracao: frac },
    });

    const novasTentativas = { ...tentativas, [frac]: (tentativas[frac] ?? 0) + 1 };
    setTentativas(novasTentativas);

    if (target.answer === frac) {
      const novoMatch = { ...matched, [frac]: targetId };
      setMatched(novoMatch);
      const novoScore = score + 20;
      setScore(novoScore);
      callbacks.onScore(novoScore);
      callbacks.onBehavior({
        type: 'conquista_streak',
        valor: { acerto: true, fracao: frac },
      });
      setFeedback('right');
      // eslint-disable-next-line react-hooks/purity
      questaoStartRef.current = Date.now();
    } else {
      callbacks.onBehavior({
        type: 'tentativas_multiplas',
        valor: { fracao: frac, tentativa: novasTentativas[frac] },
      });
      setFeedback('wrong');
    }

    setTimeout(() => setFeedback(null), 1500);
  }

  return (
    <div className="min-h-full bg-white">
      <main className="max-w-3xl mx-auto px-5 pt-6 pb-12">
        <h2 className="text-[26px] md:text-[30px] font-extrabold text-gray-900 leading-tight text-center">
          Arraste cada fração para a imagem certa!
        </h2>
        <p className="text-center text-gray-500 font-semibold mt-1">
          Pega Frações · Nível Médio
        </p>

        <div className="mt-8 grid grid-cols-3 gap-3 md:gap-6">
          {TARGETS.map((t) => {
            const filled = Object.entries(matched).find(([, tid]) => tid === t.id);
            const isOver = draggedOver === t.id;
            return (
              <div
                key={t.id}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDraggedOver(t.id);
                }}
                onDragLeave={() => setDraggedOver(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDraggedOver(null);
                  const frac = e.dataTransfer.getData('text/plain');
                  if (frac) handleDrop(t.id, frac);
                }}
                className={`relative rounded-3xl border-2 border-dashed p-4 flex flex-col items-center justify-center aspect-square transition ${
                  isOver
                    ? 'border-purple-500 bg-purple-50'
                    : filled
                      ? 'border-emerald-400 bg-emerald-50'
                      : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="scale-75 sm:scale-90 md:scale-100">{t.node}</div>
                {filled && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-2 px-3 py-1 rounded-full bg-emerald-500 text-white text-sm font-extrabold flex items-center gap-1"
                  >
                    <KidsIcon.Check size={14} /> {filled[0]}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 grid grid-cols-3 gap-3 md:gap-6">
          {CARDS.map((c) => {
            const used = !!matched[c];
            return (
              <div
                key={c}
                draggable={!used}
                onDragStart={(e) => e.dataTransfer.setData('text/plain', c)}
                onClick={() => {
                  if (used) return;
                  const tg = TARGETS.find((t) => t.answer === c);
                  if (tg) handleDrop(tg.id, c);
                }}
                className={`select-none cursor-grab active:cursor-grabbing rounded-3xl h-24 md:h-28 flex items-center justify-center text-3xl md:text-4xl font-extrabold shadow-lg transition hover:-translate-y-1 active:scale-[0.98] ${
                  used ? 'bg-gray-100 text-gray-300 line-through' : 'bg-white text-purple-700'
                }`}
                style={{
                  border: used ? '2px solid #E5E7EB' : '3px solid #6B46C1',
                  boxShadow: used
                    ? 'none'
                    : '0 12px 0 #4C2A99, 0 18px 30px -10px rgba(107,70,193,0.4)',
                }}
              >
                {c}
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {feedback === 'right' && (
            <motion.div
              key="right"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed left-1/2 -translate-x-1/2 top-28 z-30 px-5 py-3 rounded-2xl bg-emerald-500 text-white font-extrabold shadow-2xl flex items-center gap-2"
            >
              <KidsIcon.Check size={20} /> Mandou bem! +20 XP
            </motion.div>
          )}
          {feedback === 'wrong' && (
            <motion.div
              key="wrong"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed left-1/2 -translate-x-1/2 top-28 z-30 px-5 py-3 rounded-2xl bg-rose-400 text-white font-extrabold shadow-2xl"
            >
              Quase! Tenta de novo 💪
            </motion.div>
          )}
        </AnimatePresence>

        {allDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-10 mx-auto block w-full max-w-md text-center"
          >
            <p className="text-2xl font-extrabold text-emerald-600 mb-2">🎉 Você acertou tudo!</p>
            <p className="text-gray-600">Score final: {score} XP</p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
