'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FractionPizza } from '@/components/kids/fraction-shapes';
import { KidsIcon } from '@/components/kids/icons';

const OPTIONS = [
  { k: 'A', label: '1/2', parts: 2, filled: 1 },
  { k: 'B', label: '1/4', parts: 4, filled: 1 },
  { k: 'C', label: '1/1', parts: 1, filled: 1 },
  { k: 'D', label: '1/3', parts: 3, filled: 1 },
];

export default function QuizPage() {
  const router = useRouter();
  const [variant, setVariant] = useState<'right' | 'wrong'>('right');

  return (
    <div className="min-h-full bg-white pb-10">
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <KidsIcon.ArrowLeft size={22} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-extrabold text-gray-900">Quiz — Frações</h1>
            <p className="text-[13px] font-bold text-gray-500">Pergunta 3 de 10</p>
          </div>
          <div className="hidden sm:flex bg-gray-100 rounded-full p-1 text-xs font-extrabold">
            <button
              type="button"
              onClick={() => setVariant('right')}
              className={`px-3 py-1.5 rounded-full transition ${variant === 'right' ? 'bg-emerald-500 text-white' : 'text-gray-500'}`}
            >
              acerto
            </button>
            <button
              type="button"
              onClick={() => setVariant('wrong')}
              className={`px-3 py-1.5 rounded-full transition ${variant === 'wrong' ? 'bg-rose-400 text-white' : 'text-gray-500'}`}
            >
              erro
            </button>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-5 pb-3 flex gap-1.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="h-1.5 flex-1 rounded-full"
              style={{ background: i < 3 ? '#6B46C1' : '#E5E7EB' }}
            />
          ))}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 pt-8">
        <h2 className="text-[28px] md:text-[34px] font-extrabold text-gray-900 leading-[1.1] text-center text-balance">
          Qual fração representa metade de uma pizza?
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {OPTIONS.map((o) => {
            const correct = o.k === 'A';
            const isPicked =
              (variant === 'right' && o.k === 'A') || (variant === 'wrong' && o.k === 'C');
            const showCorrect = variant === 'wrong' && correct;

            let ring = 'border-gray-200 bg-white';
            let badge: React.ReactNode = null;
            if (isPicked && correct) {
              ring = 'border-emerald-500 bg-emerald-50';
              badge = (
                <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <KidsIcon.Check size={18} />
                </span>
              );
            } else if (isPicked && !correct) {
              ring = 'border-rose-400 bg-rose-50';
              badge = (
                <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-rose-400 text-white text-xl font-extrabold flex items-center justify-center">
                  ×
                </span>
              );
            } else if (showCorrect) {
              ring = 'border-emerald-400 bg-emerald-50/60 ring-4 ring-emerald-100';
              badge = (
                <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <KidsIcon.Check size={18} />
                </span>
              );
            }

            return (
              <div
                key={o.k}
                className={`relative rounded-3xl border-2 p-5 flex flex-col items-center text-center ${ring}`}
              >
                <span className="absolute top-3 left-3 w-8 h-8 rounded-full bg-gray-100 text-gray-700 text-sm font-extrabold flex items-center justify-center">
                  {o.k}
                </span>
                {badge}
                <div className="mt-3">
                  <FractionPizza parts={o.parts} filled={o.filled} size={100} />
                </div>
                <p className="mt-3 text-2xl font-extrabold text-gray-900">{o.label}</p>
              </div>
            );
          })}
        </div>

        {variant === 'right' ? (
          <div className="mt-8">
            <div
              className="rounded-3xl p-5 flex items-center gap-4"
              style={{ background: '#D1FAE5' }}
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <KidsIcon.Check size={26} />
              </div>
              <div className="flex-1">
                <p className="text-lg font-extrabold text-emerald-900">Mandou bem!</p>
                <p className="text-sm font-semibold text-emerald-800">
                  Metade = 1 parte de 2 iguais. +25 XP
                </p>
              </div>
              <span className="text-2xl font-extrabold text-emerald-700">+25 XP</span>
            </div>
            <button
              type="button"
              className="mt-4 w-full h-14 rounded-2xl text-white font-extrabold text-lg"
              style={{ background: 'linear-gradient(180deg,#1FCB8E,#10B981)' }}
            >
              Próxima pergunta →
            </button>
          </div>
        ) : (
          <div className="mt-8">
            <div
              className="rounded-3xl p-5 flex items-center gap-4"
              style={{ background: '#FEE2E2' }}
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-400 text-white flex items-center justify-center shrink-0">
                <span className="text-2xl font-extrabold">!</span>
              </div>
              <div className="flex-1">
                <p className="text-lg font-extrabold text-rose-900">Quase!</p>
                <p className="text-sm font-semibold text-rose-800">
                  A resposta certa é <strong>1/2</strong>. Vamos revisar?
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="h-14 rounded-2xl text-white font-extrabold text-base"
                style={{ background: '#3B82F6' }}
              >
                Ver explicação
              </button>
              <button
                type="button"
                className="h-14 rounded-2xl bg-gray-100 text-gray-700 font-extrabold text-base"
              >
                Próxima pergunta
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
