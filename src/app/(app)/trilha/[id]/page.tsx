'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { KidsIcon } from '@/components/kids/icons';

type ItemState = 'done' | 'active' | 'locked';

interface NivelItem {
  label: string;
  state: ItemState;
}

interface Nivel {
  id: string;
  title: string;
  state: ItemState;
  bg: string;
  accent: string;
  stars: number;
  progress?: number;
  items: NivelItem[];
}

// TODO Fase 4: dados via Supabase
const NIVEIS: Nivel[] = [
  {
    id: 'facil',
    title: 'Nível Fácil',
    state: 'done',
    bg: '#D1FAE5',
    accent: '#10B981',
    stars: 3,
    items: [
      { label: 'Videoaula', state: 'done' },
      { label: '2 jogos', state: 'done' },
      { label: 'Quiz', state: 'done' },
    ],
  },
  {
    id: 'medio',
    title: 'Nível Médio',
    state: 'active',
    bg: '#DBEAFE',
    accent: '#3B82F6',
    stars: 1,
    progress: 50,
    items: [
      { label: 'Videoaula', state: 'done' },
      { label: 'Jogo · Pega Frações', state: 'done' },
      { label: 'Jogo · Bolha Math', state: 'locked' },
      { label: 'Quiz Matemática', state: 'locked' },
    ],
  },
  {
    id: 'dificil',
    title: 'Nível Difícil',
    state: 'locked',
    bg: '#F3F4F6',
    accent: '#9CA3AF',
    stars: 0,
    items: [
      { label: 'Videoaula', state: 'locked' },
      { label: 'Jogo Matemágica', state: 'locked' },
      { label: 'Jogo Equação Express', state: 'locked' },
      { label: 'Quiz final', state: 'locked' },
    ],
  },
];

export default function TrilhaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const trilhaName = id === 'mat' ? 'Matemática' : id === 'port' ? 'Português' : 'Trilha';

  return (
    <div className="min-h-full bg-white pb-8">
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700"
          >
            <KidsIcon.ArrowLeft size={22} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-extrabold text-gray-900">{trilhaName}</h1>
            <p className="text-[13px] text-gray-500 font-bold">4º ano · Frações</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-500">Progresso</p>
            <p className="text-base font-extrabold text-blue-600">35%</p>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-5 pb-4">
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: '35%', background: 'linear-gradient(90deg,#60A5FA,#3B82F6)' }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 pt-6 space-y-5">
        {NIVEIS.map((n, i) => (
          <NivelCard key={n.id} nivel={n} indent={i} />
        ))}
      </main>
    </div>
  );
}

function NivelCard({ nivel, indent }: { nivel: Nivel; indent: number }) {
  const locked = nivel.state === 'locked';
  const active = nivel.state === 'active';
  const done = nivel.state === 'done';

  return (
    <div
      className="relative rounded-3xl border-2 p-5 md:p-6"
      style={{
        marginLeft: `${indent * 16}px`,
        background: nivel.bg,
        borderColor: active ? nivel.accent : 'transparent',
        opacity: locked ? 0.85 : 1,
      }}
    >
      {active && (
        <span
          className="absolute inset-0 rounded-3xl pointer-events-none animate-pulse"
          style={{ boxShadow: `0 0 0 3px ${nivel.accent}30, 0 0 0 8px ${nivel.accent}15` }}
        />
      )}

      <div className="flex items-start gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shrink-0"
          style={{ background: locked ? '#9CA3AF' : nivel.accent }}
        >
          {locked ? (
            <KidsIcon.Lock size={28} />
          ) : done ? (
            <KidsIcon.Star size={32} fill="#FCD34D" />
          ) : (
            <span className="text-2xl font-extrabold">{nivel.id === 'medio' ? 'II' : 'I'}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className={`text-xl font-extrabold ${locked ? 'text-gray-500' : 'text-gray-900'}`}
            >
              {nivel.title}
            </h3>
            {done && (
              <span className="text-xs font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800">
                ✓ completo
              </span>
            )}
            {active && (
              <span className="text-xs font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full bg-blue-200 text-blue-800">
                em andamento — {nivel.progress}%
              </span>
            )}
            {locked && (
              <span className="text-xs font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full bg-gray-300 text-gray-600">
                bloqueado
              </span>
            )}
          </div>

          {!locked && (
            <div className="mt-2 flex gap-1">
              {[0, 1, 2].map((s) => (
                <KidsIcon.Star
                  key={s}
                  size={20}
                  fill={s < nivel.stars ? '#FCD34D' : '#FFFFFF'}
                />
              ))}
            </div>
          )}

          {locked && (
            <p className="mt-2 text-sm font-semibold text-gray-500">
              Complete o nível Médio para desbloquear.
            </p>
          )}

          <ul className="mt-4 space-y-2">
            {nivel.items.map((it, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/70 border border-white"
              >
                {it.state === 'done' ? (
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <KidsIcon.Check size={16} />
                  </span>
                ) : it.state === 'locked' ? (
                  <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                    <KidsIcon.Lock size={14} />
                  </span>
                ) : (
                  <span className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    <KidsIcon.Play size={12} />
                  </span>
                )}
                <span
                  className={`text-sm font-bold ${it.state === 'locked' ? 'text-gray-400' : 'text-gray-800'}`}
                >
                  {it.label}
                </span>
              </li>
            ))}
          </ul>

          {active && (
            <Link
              href="/aula/aula-1"
              className="mt-5 w-full h-14 rounded-2xl text-white font-extrabold text-lg shadow-md active:scale-[0.99] flex items-center justify-center"
              style={{
                background: 'linear-gradient(180deg,#7B52D6,#6B46C1)',
                boxShadow: '0 12px 24px -12px rgba(107,70,193,0.5)',
              }}
            >
              Continuar de onde parei →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
