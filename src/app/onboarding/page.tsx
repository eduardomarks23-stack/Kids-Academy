'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { DogBerg } from '@/components/kids/dog-berg';
import { KidsAcademyLogo } from '@/components/kids/kids-academy-logo';
import { KidsIcon } from '@/components/kids/icons';

const AVATARS = [
  { id: 'fox', bg: '#6B46C1', emoji: '🦊' },
  { id: 'panda', bg: '#10B981', emoji: '🐼' },
  { id: 'owl', bg: '#3B82F6', emoji: '🦉' },
  { id: 'cat', bg: '#F87171', emoji: '🐱' },
  { id: 'lion', bg: '#FCD34D', emoji: '🦁' },
  { id: 'frog', bg: '#A855F7', emoji: '🐸' },
] as const;

const SERIES = [
  { id: 'EI_1', label: 'Pré-I' },
  { id: 'EI_2', label: 'Pré-II' },
  { id: 'EI_3', label: 'Pré-III' },
  { id: 'EF_1', label: '1º ano' },
  { id: 'EF_2', label: '2º ano' },
  { id: 'EF_3', label: '3º ano' },
  { id: 'EF_4', label: '4º ano' },
  { id: 'EF_5', label: '5º ano' },
] as const;

const IDADES = [3, 4, 5, 6, 7, 8, 9, 10] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState<'welcome' | 'profile'>('welcome');
  const [name, setName] = useState('');
  const [age, setAge] = useState(8);
  const [serie, setSerie] = useState<typeof SERIES[number]['id']>('EF_3');
  const [avatarId, setAvatarId] = useState<typeof AVATARS[number]['id']>(AVATARS[0].id);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function criarPerfil() {
    if (!user) {
      router.push('/login');
      return;
    }
    if (!name.trim()) {
      setError('Informe o nome da criança.');
      return;
    }
    setSubmitting(true);
    setError(null);
    const supabase = createClient();

    // LGPD Art. 14 §1º — bloqueia criação do perfil sem consentimento parental
    // obrigatório registrado. Defesa em profundidade caso o usuário pule a tela
    // de consentimento via login direto ou navegação manual.
    const { data: consent } = await supabase
      .from('consentimentos_lgpd')
      .select('id')
      .eq('responsavel_id', user.id)
      .eq('tipo', 'tratamento_dados')
      .eq('status', 'concedido')
      .maybeSingle();

    if (!consent) {
      router.push('/consentimento-lgpd?next=/onboarding');
      return;
    }

    const { error: insertError } = await supabase.from('perfis_crianca').insert({
      responsavel_id: user.id,
      nome: name.trim(),
      serie,
      avatar_id: avatarId,
      ativo: true,
    });
    if (insertError) {
      setError('Erro ao criar perfil. Tente novamente.');
      setSubmitting(false);
      return;
    }
    router.push('/home');
  }

  return (
    <div className="min-h-full bg-white px-6 py-10 md:py-16">
      <div className="max-w-xl mx-auto">
        {step === 'welcome' && (
          <div className="flex flex-col items-center text-center">
            <KidsAcademyLogo size="lg" />
            <p className="mt-2 text-sm font-semibold tracking-wide text-purple-500 uppercase">
              Aprender ativamente · BNCC
            </p>

            <div className="relative mt-8 mb-2">
              <div
                className="absolute inset-0 rounded-full -z-0"
                style={{
                  background: 'radial-gradient(closest-side, #FCD34D44, transparent 70%)',
                }}
              />
              <div className="relative">
                <DogBerg size={230} />
              </div>
            </div>

            <h1 className="mt-2 text-[40px] leading-[1.05] font-extrabold text-gray-900">
              Aprender é uma <span style={{ color: '#6B46C1' }}>aventura!</span>
            </h1>
            <p className="mt-3 text-lg text-gray-600 font-medium">
              Trilhas, jogos e desafios para você arrasar na escola.
            </p>

            <button
              type="button"
              onClick={() => setStep('profile')}
              className="mt-8 w-full max-w-sm h-[60px] rounded-3xl text-white font-extrabold text-xl shadow-lg active:scale-[0.98] transition-transform"
              style={{
                background: 'linear-gradient(180deg, #7B52D6 0%, #6B46C1 100%)',
                boxShadow: '0 14px 28px -14px rgba(107,70,193,0.6)',
              }}
            >
              Vamos começar! →
            </button>

            <p className="mt-6 text-xs text-gray-400 font-semibold tracking-wide uppercase">
              Para crianças de 3 a 10 anos
            </p>
          </div>
        )}

        {step === 'profile' && (
          <div>
            <button
              type="button"
              onClick={() => setStep('welcome')}
              className="mb-6 inline-flex items-center gap-1 text-purple-700 font-bold"
            >
              <KidsIcon.ArrowLeft size={22} /> voltar
            </button>

            <div className="flex items-center gap-4 mb-8">
              <DogBerg size={84} />
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900">Vamos te conhecer!</h2>
                <p className="text-gray-500 font-medium">3 perguntinhas rápidas.</p>
              </div>
            </div>

            <label className="block">
              <span className="text-base font-bold text-gray-700">Como podemos te chamar?</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome ou apelido"
                className="mt-2 w-full h-14 rounded-2xl border-2 border-gray-200 px-5 text-lg font-semibold text-gray-900 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none"
              />
            </label>

            <div className="mt-6">
              <span className="text-base font-bold text-gray-700">Quantos anos você tem?</span>
              <div className="mt-3 grid grid-cols-4 sm:grid-cols-8 gap-2">
                {IDADES.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAge(a)}
                    className={`h-14 rounded-2xl font-extrabold text-lg transition-all ${
                      age === a
                        ? 'bg-purple-700 text-white shadow-md scale-[1.04]'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <span className="text-base font-bold text-gray-700">Qual série?</span>
              <div className="mt-3 grid grid-cols-4 sm:grid-cols-8 gap-2">
                {SERIES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSerie(s.id)}
                    className={`h-14 rounded-2xl font-extrabold text-sm transition-all ${
                      serie === s.id
                        ? 'bg-yellow-300 text-gray-900 shadow-md scale-[1.04]'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <span className="text-base font-bold text-gray-700">Escolha um avatar</span>
              <div className="mt-3 grid grid-cols-6 gap-3">
                {AVATARS.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setAvatarId(av.id)}
                    aria-label={`Avatar ${av.id}`}
                    className={`aspect-square rounded-2xl flex items-center justify-center text-3xl transition-all ${
                      avatarId === av.id
                        ? 'ring-4 ring-purple-500 scale-105'
                        : 'ring-2 ring-transparent opacity-90'
                    }`}
                    style={{ background: av.bg }}
                  >
                    <span className="drop-shadow">{av.emoji}</span>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="mt-4 text-sm font-medium text-destructive" role="alert">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={criarPerfil}
              disabled={submitting}
              className="mt-8 w-full h-[60px] rounded-3xl text-white font-extrabold text-xl shadow-lg active:scale-[0.98] transition-transform disabled:opacity-60"
              style={{
                background: 'linear-gradient(180deg, #1FCB8E 0%, #10B981 100%)',
                boxShadow: '0 14px 28px -14px rgba(16,185,129,0.6)',
              }}
            >
              {submitting ? 'Criando…' : 'Criar meu perfil!'}
            </button>

            <p className="mt-6 text-center text-xs text-gray-400">
              Já tem perfil?{' '}
              <Link href="/home" className="text-purple-600 hover:underline">
                Ir para o início
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
