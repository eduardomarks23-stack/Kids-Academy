'use client';

import { useRouter } from 'next/navigation';
import { DogBerg } from '@/components/kids/dog-berg';
import { KidsIcon } from '@/components/kids/icons';

/**
 * Tela MENTOR — placeholder visual.
 * Conteúdo dinâmico (insights gerados pelo Claude Haiku) virá na Fase 5.
 */
export default function MentorPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-full relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, rgba(107,70,193,0.05) 0%, rgba(255,255,255,1) 35%, rgba(252,211,77,0.10) 100%)',
      }}
    >
      <span
        className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full"
        style={{ background: '#EDE9FE', filter: 'blur(20px)' }}
      />
      <span
        className="pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 rounded-full"
        style={{ background: '#FEF3C7', filter: 'blur(20px)' }}
      />

      <div className="relative max-w-3xl mx-auto px-5 pt-10 pb-16">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-7 h-7 rounded-full bg-purple-700 text-white flex items-center justify-center">
            <KidsIcon.Sparkle size={14} />
          </span>
          <p className="text-sm font-extrabold tracking-wide uppercase text-purple-700">
            Mensagem do MENTOR
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 items-start">
          <div className="flex md:block justify-center">
            <div className="relative">
              <span
                className="absolute inset-2 rounded-full"
                style={{
                  background: 'radial-gradient(closest-side,#FCD34D55,transparent 70%)',
                }}
              />
              <div className="relative">
                <DogBerg size={150} />
              </div>
            </div>
          </div>

          <div className="relative bg-white rounded-3xl p-6 md:p-7 shadow-[0_24px_50px_-30px_rgba(107,70,193,0.4)] border border-purple-100">
            <span className="hidden md:block absolute -left-3 top-12 w-0 h-0 border-y-[12px] border-y-transparent border-r-[16px] border-r-white" />
            <p className="text-2xl font-extrabold text-gray-900">Oi! 👋</p>
            <p className="mt-3 text-lg font-semibold text-gray-700 leading-relaxed">
              Eu vi que você tá indo{' '}
              <span className="text-emerald-600 font-extrabold">super bem em frações!</span>
            </p>
            <p className="mt-3 text-lg font-semibold text-gray-700 leading-relaxed">
              Mas notei que tá tendo um pouquinho de dúvida em{' '}
              <span className="text-purple-700 font-extrabold">multiplicação</span>...
            </p>
            <p className="mt-3 text-lg font-semibold text-gray-700 leading-relaxed">
              Que tal a gente treinar isso juntos por{' '}
              <span className="bg-yellow-200 px-1.5 rounded">10 minutos</span>?
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
              <button
                type="button"
                onClick={() => router.push('/home')}
                className="h-[60px] rounded-3xl text-white font-extrabold text-xl active:scale-[0.99]"
                style={{
                  background: 'linear-gradient(180deg,#1FCB8E,#10B981)',
                  boxShadow: '0 14px 28px -14px rgba(16,185,129,0.55)',
                }}
              >
                Bora! 🚀
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="h-[60px] px-6 rounded-3xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-lg"
              >
                Agora não
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-white border border-gray-100 p-4 md:p-5">
          <p className="text-[12px] font-extrabold uppercase tracking-wide text-gray-400">
            O MENTOR já aprendeu sobre você
          </p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-2xl font-extrabold text-purple-700">47</p>
              <p className="text-xs font-bold text-gray-500">conceitos</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <p className="text-2xl font-extrabold text-emerald-600">78%</p>
              <p className="text-xs font-bold text-gray-500">acertos</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-extrabold text-gray-800 leading-tight">
                Frações<br />Geometria
              </p>
              <p className="text-xs font-bold text-gray-500 mt-1">pontos fortes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
