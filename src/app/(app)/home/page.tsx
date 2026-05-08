'use client';

import Link from 'next/link';
import { KidsAvatar } from '@/components/kids/avatar';
import { DogBerg } from '@/components/kids/dog-berg';
import { SpeechBubble } from '@/components/kids/speech-bubble';
import { KidsIcon } from '@/components/kids/icons';

interface Trilha {
  id: string;
  name: string;
  color: string;
  soft: string;
  Icon: (props: { size?: number; className?: string }) => React.ReactElement;
  progress: number;
  status: 'done' | 'active' | 'locked';
  stars?: number;
  current?: boolean;
}

// TODO Fase 4: substituir por dados reais do Supabase via useTrilhas hook
const TRILHAS: Trilha[] = [
  { id: 'port', name: 'Português', color: '#F87171', soft: '#FEE2E2', Icon: KidsIcon.Book, progress: 60, status: 'done', stars: 3 },
  { id: 'mat', name: 'Matemática', color: '#3B82F6', soft: '#DBEAFE', Icon: KidsIcon.Calc, progress: 35, status: 'active', stars: 1, current: true },
  { id: 'cie', name: 'Ciências', color: '#10B981', soft: '#D1FAE5', Icon: KidsIcon.Lupa, progress: 0, status: 'locked' },
  { id: 'his', name: 'História', color: '#B45309', soft: '#FEF3C7', Icon: KidsIcon.Scroll, progress: 0, status: 'locked' },
  { id: 'geo', name: 'Geografia', color: '#0E7490', soft: '#CFFAFE', Icon: KidsIcon.Globe, progress: 0, status: 'locked' },
  { id: 'ing', name: 'Inglês', color: '#6B46C1', soft: '#EDE9FE', Icon: KidsIcon.Speak, progress: 0, status: 'locked' },
];

const POSITIONS = [
  { x: 14, y: 18 },
  { x: 50, y: 12 },
  { x: 82, y: 28 },
  { x: 76, y: 60 },
  { x: 38, y: 70 },
  { x: 12, y: 82 },
];

export default function HomePage() {
  return (
    <div className="min-h-full bg-white">
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center gap-4">
          <KidsAvatar name="L" color="#6B46C1" size={48} />
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-gray-900 truncate">Oi, Lucas!</span>
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                Nível 7
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: '62%', background: 'linear-gradient(90deg,#FCD34D,#F59E0B)' }}
                />
              </div>
              <span className="text-xs font-bold text-gray-600">1.247 XP</span>
            </div>
          </div>
          <button
            type="button"
            className="relative w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700"
          >
            <KidsIcon.Bell size={22} />
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 pt-6">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h1 className="text-[28px] leading-tight font-extrabold text-gray-900">Sua jornada</h1>
            <p className="text-gray-500 font-medium">Toque em uma trilha pra continuar.</p>
          </div>
          <span className="text-sm font-bold text-purple-700 bg-purple-50 rounded-full px-3 py-1">
            🔥 5 dias seguidos
          </span>
        </div>

        <div
          className="relative w-full rounded-[28px] overflow-hidden border border-gray-100 shadow-[0_2px_0_rgba(0,0,0,0.02)]"
          style={{
            aspectRatio: '1 / 1.05',
            background: 'linear-gradient(180deg,#FAF7FF 0%,#FFFDF5 100%)',
          }}
        >
          <svg className="absolute inset-0 w-full h-full opacity-40" aria-hidden="true">
            <defs>
              <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="#E5DEFC" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>

          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 105"
            preserveAspectRatio="none"
          >
            <path
              d="M14,18 C30,8 38,18 50,12 C66,4 74,20 82,28 C90,38 84,50 76,60 C66,72 50,62 38,70 C24,80 22,76 12,82"
              stroke="#E5DEFC"
              strokeWidth="2.2"
              strokeDasharray="1.6 1.4"
              strokeLinecap="round"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {TRILHAS.map((t, i) => {
            const p = POSITIONS[i];
            if (!p) return null;
            const Icon = t.Icon;
            const locked = t.status === 'locked';
            const TrailNode = (
              <div className="flex flex-col items-center" style={{ width: '108px' }}>
                <div className="relative">
                  {t.current && (
                    <span
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ background: t.color, opacity: 0.25 }}
                    />
                  )}
                  <div
                    className="relative w-[78px] h-[78px] rounded-full flex items-center justify-center text-white shadow-lg"
                    style={{
                      background: locked ? '#E5E7EB' : t.color,
                      filter: locked ? 'grayscale(0.4)' : 'none',
                      boxShadow: locked
                        ? 'inset 0 -4px 0 rgba(0,0,0,0.08)'
                        : `inset 0 -6px 0 rgba(0,0,0,0.18), 0 12px 22px -10px ${t.color}80`,
                    }}
                  >
                    {locked ? <KidsIcon.Lock size={32} /> : <Icon size={36} />}
                  </div>
                  {t.stars !== undefined && !locked && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5 bg-white rounded-full px-1.5 py-0.5 shadow">
                      {[0, 1, 2].map((s) => (
                        <KidsIcon.Star
                          key={s}
                          size={12}
                          fill={s < (t.stars ?? 0) ? '#FCD34D' : '#E5E7EB'}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <span
                  className={`mt-3 text-[13px] font-extrabold leading-tight text-center ${
                    locked ? 'text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {t.name}
                </span>
                {!locked ? (
                  <span className="text-[11px] font-bold mt-0.5" style={{ color: t.color }}>
                    {t.progress}%
                  </span>
                ) : (
                  <span className="text-[11px] font-bold mt-0.5 text-gray-400">Bloqueada</span>
                )}
              </div>
            );

            return locked ? (
              <button
                key={t.id}
                type="button"
                disabled
                className="absolute"
                style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%,-50%)' }}
              >
                {TrailNode}
              </button>
            ) : (
              <Link
                key={t.id}
                href={`/trilha/${t.id}`}
                className="absolute"
                style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%,-50%)' }}
              >
                {TrailNode}
              </Link>
            );
          })}

          <div className="absolute right-3 bottom-3 flex items-end gap-2">
            <SpeechBubble side="right" className="text-sm font-bold text-gray-700">
              Bora aprender? 🐾
            </SpeechBubble>
            <DogBerg size={92} />
          </div>
        </div>

        <div
          className="mt-5 flex items-center gap-3 rounded-2xl border-2 border-yellow-200 p-4"
          style={{ background: '#FFFBEB' }}
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-yellow-600 bg-yellow-200">
            <KidsIcon.Bolt size={26} fill="#B45309" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-extrabold text-gray-900">Missão do dia</p>
            <p className="text-[13px] text-gray-600 font-medium">
              Complete 1 jogo de Matemática · +50 XP
            </p>
          </div>
          <span className="text-xs font-bold text-yellow-700">2/3</span>
        </div>
      </main>
    </div>
  );
}
