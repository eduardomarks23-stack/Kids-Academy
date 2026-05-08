'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { KidsIcon } from '@/components/kids/icons';

const PONTOS = [
  'Metade é dividir em 2 partes iguais.',
  '1/2 é igual a 50% — é a mesma metade.',
  'Pizza, bolo, dinheiro... tudo pode ter metade!',
];

export default function AulaPage() {
  const router = useRouter();
  const [playing, setPlaying] = useState(false);
  const progress = 0.89;

  return (
    <div className="min-h-full bg-white pb-10">
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <KidsIcon.ArrowLeft size={22} />
          </button>
          <div className="flex-1">
            <p className="text-[12px] font-bold uppercase tracking-wide text-purple-600">
              Matemática · Frações
            </p>
            <h1 className="text-[22px] font-extrabold text-gray-900 leading-tight">
              Frações: o que é metade?
            </h1>
          </div>
          <span className="hidden md:inline-flex text-xs font-bold bg-purple-50 text-purple-700 rounded-full px-3 py-1">
            Microlearning · 6 min
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 pt-5 space-y-5">
        <div
          className="relative rounded-3xl overflow-hidden aspect-video shadow-[0_30px_50px_-30px_rgba(107,70,193,0.5)]"
          style={{ background: 'linear-gradient(135deg,#6B46C1 0%,#3B82F6 100%)' }}
        >
          <svg
            className="absolute inset-0 w-full h-full opacity-30"
            viewBox="0 0 200 120"
            preserveAspectRatio="none"
          >
            <circle cx="30" cy="30" r="24" fill="#FCD34D" />
            <circle cx="170" cy="90" r="30" fill="#10B981" />
            <rect x="80" y="80" width="40" height="20" rx="4" fill="#F87171" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setPlaying(!playing)}
              aria-label={playing ? 'Pausar' : 'Reproduzir'}
              className="w-24 h-24 rounded-full bg-white/95 text-purple-700 flex items-center justify-center shadow-2xl active:scale-95 transition"
            >
              {playing ? <KidsIcon.Pause size={44} /> : <KidsIcon.Play size={44} />}
            </button>
          </div>
          <div className="absolute left-4 top-4 bg-black/30 backdrop-blur text-white text-xs font-bold rounded-full px-3 py-1">
            ● pré-gravado
          </div>
          <div className="absolute right-4 bottom-4 bg-black/40 backdrop-blur text-white text-sm font-extrabold rounded-full px-3 py-1">
            5:23 / 6:00
          </div>
        </div>

        <div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress * 100}%`,
                background: 'linear-gradient(90deg,#FCD34D,#F59E0B)',
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[12px] font-bold text-gray-500">
            <span>5:23</span>
            <span>capítulo 3 de 4</span>
            <span>6:00</span>
          </div>
        </div>

        <div
          className="rounded-3xl p-5 border-2"
          style={{ background: '#FEF9C3', borderColor: '#FDE68A' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-9 h-9 rounded-xl bg-yellow-300 text-yellow-900 flex items-center justify-center">
              <KidsIcon.Sparkle size={20} />
            </span>
            <h3 className="text-lg font-extrabold text-yellow-900">Pontos importantes</h3>
          </div>
          <ul className="space-y-2.5">
            {PONTOS.map((p, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 w-6 h-6 rounded-full bg-yellow-400 text-yellow-900 flex items-center justify-center text-[12px] font-extrabold shrink-0">
                  {i + 1}
                </span>
                <span className="text-[15px] font-semibold text-gray-800">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-purple-50 border border-purple-100">
          <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
            <KidsIcon.Sparkle size={16} />
          </span>
          <p className="text-sm font-semibold text-purple-900">
            <strong className="font-extrabold">MENTOR</strong> está aprendendo como você aprende.
          </p>
        </div>

        <Link
          href="/jogo/pega-fracoes"
          className="w-full h-[60px] rounded-3xl text-white font-extrabold text-xl shadow-lg active:scale-[0.99] flex items-center justify-center"
          style={{
            background: 'linear-gradient(180deg,#7B52D6 0%,#6B46C1 100%)',
            boxShadow: '0 14px 28px -14px rgba(107,70,193,0.6)',
          }}
        >
          Próximo passo: vamos jogar! 🎮
        </Link>
      </main>
    </div>
  );
}
