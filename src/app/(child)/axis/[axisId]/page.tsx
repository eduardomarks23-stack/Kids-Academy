// =============================================================
// /axis/[axisId] — mapa do eixo
// =============================================================
// Para Mundos com 4 tiers (Curiosos), pula a tela de capítulo e
// mostra sessões direto. Para Mundos com 5 tiers (Exploradores),
// mostra lista de capítulos.
//
// Próxima sessão sugerida pulsa visualmente.
// =============================================================

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getActiveChildId } from '@/lib/active-child';

interface PageProps {
  params: Promise<{ axisId: string }>;
}

export default async function AxisPage({ params }: PageProps) {
  const { axisId } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: axis } = await supabase
    .from('axes')
    .select('id, slug, display_name, subtitle, world_id')
    .eq('id', axisId)
    .single();

  if (!axis) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const axisData = axis as any;

  // Conta capítulos para determinar se mostra tier capítulo ou pula
  const { data: chapters } = await supabase
    .from('chapters')
    .select('id, display_name, description, display_order')
    .eq('axis_id', axisId)
    .eq('active', true)
    .order('display_order');

  const chapterList = (chapters ?? []) as Array<{
    id: string;
    display_name: string;
    description: string | null;
    display_order: number;
  }>;

  // Curiosos: 1 capítulo default por eixo → pula direto para sessões
  const skipChapters = chapterList.length === 1;

  let sessions: Array<{
    id: string;
    display_name: string;
    learning_objective: string;
    display_order: number;
  }> = [];

  if (skipChapters && chapterList[0]) {
    const { data } = await supabase
      .from('sessions')
      .select('id, display_name, learning_objective, display_order')
      .eq('chapter_id', chapterList[0].id)
      .eq('active', true)
      .order('display_order');
    sessions = (data ?? []) as typeof sessions;
  }

  // Próxima sessão sugerida: primeira não completada (placeholder simples)
  const activeChildId = await getActiveChildId();
  let completedSessionIds = new Set<string>();
  if (activeChildId) {
    const { data: progress } = await supabase
      .from('session_progress')
      .select('session_id')
      .eq('child_id', activeChildId)
      .not('completed_at', 'is', null);
    completedSessionIds = new Set(
      ((progress ?? []) as Array<{ session_id: string }>).map((p) => p.session_id),
    );
  }
  const nextSession = sessions.find((s) => !completedSessionIds.has(s.id));

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header>
        <Link href="/inicio" className="text-sm text-gray-500 hover:text-[#E26B45]">
          ← Voltar
        </Link>
        <h1 className="mt-2 text-3xl font-medium text-[#E26B45]">{axisData.display_name}</h1>
        {axisData.subtitle ? (
          <p className="mt-1 text-base text-gray-600">{axisData.subtitle}</p>
        ) : null}
      </header>

      {skipChapters ? (
        <section className="mt-8">
          <p className="mb-4 text-sm text-gray-500">
            Sessões — escolha uma para começar:
          </p>
          <ol className="space-y-3">
            {sessions.map((s) => {
              const isNext = nextSession?.id === s.id;
              const isCompleted = completedSessionIds.has(s.id);
              return (
                <li key={s.id}>
                  <Link
                    href={`/session/${s.id}`}
                    className={`flex items-center gap-4 rounded-2xl border-2 p-5 transition ${
                      isNext
                        ? 'border-[#E26B45] bg-[#FFEDE5] animate-pulse'
                        : isCompleted
                          ? 'border-gray-200 bg-gray-50'
                          : 'border-gray-200 bg-white hover:border-[#E26B45]'
                    }`}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FCD34D] text-lg font-medium">
                      {s.display_order}
                    </span>
                    <div className="flex-1">
                      <h2 className="text-base font-medium text-gray-900">{s.display_name}</h2>
                      <p className="mt-1 text-xs text-gray-500">{s.learning_objective}</p>
                    </div>
                    {isCompleted ? <span className="text-green-500">✓</span> : null}
                  </Link>
                </li>
              );
            })}
            {sessions.length === 0 ? (
              <p className="text-gray-500">Sem sessões disponíveis ainda.</p>
            ) : null}
          </ol>
        </section>
      ) : (
        <ol className="mt-8 space-y-3">
          {chapterList.map((c) => (
            <li key={c.id}>
              <Link
                href={`/chapter/${c.id}`}
                className="block rounded-2xl border-2 border-purple-200 bg-purple-50 p-6"
              >
                <h2 className="text-lg font-medium text-purple-900">
                  {c.display_name}
                </h2>
                {c.description ? (
                  <p className="mt-1 text-sm text-purple-700">{c.description}</p>
                ) : null}
              </Link>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
