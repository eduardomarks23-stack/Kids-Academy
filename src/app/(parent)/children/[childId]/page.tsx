// =============================================================
// /children/[childId] — perfil + progresso da criança
// =============================================================
// Dashboard com: stats agregados, progresso por eixo (Curiosos),
// colecionáveis adquiridos e CTAs para reports/LGPD.
// =============================================================

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { activateChildAction } from '@/features/children/actions';

interface PageProps {
  params: Promise<{ childId: string }>;
}

export default async function ChildDetailPage({ params }: PageProps) {
  const { childId } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: child } = await supabase
    .from('children')
    .select(
      'id, display_name, birth_year, hand_preference, active_world_id, preferred_voice, created_at',
    )
    .eq('id', childId)
    .is('deleted_at', null)
    .maybeSingle();

  if (!child) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childData = child as any;

  // Stats agregados
  const [
    { count: sessionsCount },
    { count: attemptsCount },
    { count: collectiblesCount },
  ] = await Promise.all([
    supabase
      .from('session_progress')
      .select('id', { count: 'exact', head: true })
      .eq('child_id', childId)
      .not('completed_at', 'is', null),
    supabase
      .from('atom_attempts')
      .select('id', { count: 'exact', head: true })
      .eq('child_id', childId),
    supabase
      .from('child_collectibles')
      .select('child_id', { count: 'exact', head: true })
      .eq('child_id', childId),
  ]);

  // Progresso por eixo: para cada eixo no mundo ativo da criança
  const axisProgress: Array<{
    slug: string;
    displayName: string;
    completed: number;
    total: number;
  }> = [];

  if (childData.active_world_id) {
    const { data: axes } = await supabase
      .from('axes')
      .select('id, slug, display_name')
      .eq('world_id', childData.active_world_id)
      .eq('active', true)
      .order('display_order');

    const axisList = (axes ?? []) as Array<{ id: string; slug: string; display_name: string }>;

    for (const axis of axisList) {
      // Total de sessões do eixo
      const { data: chapters } = await supabase
        .from('chapters')
        .select('id')
        .eq('axis_id', axis.id)
        .eq('active', true);
      const chapterIds = (chapters ?? []).map((c) => (c as { id: string }).id);

      let total = 0;
      let completed = 0;
      if (chapterIds.length > 0) {
        const { count: t } = await supabase
          .from('sessions')
          .select('id', { count: 'exact', head: true })
          .in('chapter_id', chapterIds)
          .eq('active', true);
        total = t ?? 0;

        const { data: sessions } = await supabase
          .from('sessions')
          .select('id')
          .in('chapter_id', chapterIds)
          .eq('active', true);
        const sessionIds = ((sessions ?? []) as Array<{ id: string }>).map((s) => s.id);

        if (sessionIds.length > 0) {
          const { count: c } = await supabase
            .from('session_progress')
            .select('id', { count: 'exact', head: true })
            .eq('child_id', childId)
            .in('session_id', sessionIds)
            .not('completed_at', 'is', null);
          completed = c ?? 0;
        }
      }

      axisProgress.push({
        slug: axis.slug,
        displayName: axis.display_name,
        completed,
        total,
      });
    }
  }

  return (
    <div>
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-medium">{childData.display_name}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Nascido em {childData.birth_year}
            {childData.hand_preference
              ? ` · ${childData.hand_preference === 'left' ? 'canhoto' : 'destro'}`
              : ''}
          </p>
        </div>
        <form action={activateChildAction}>
          <input type="hidden" name="childId" value={childId} />
          <button
            type="submit"
            className="rounded-full bg-purple-700 px-4 py-2 text-sm font-medium text-white"
          >
            Ativar perfil
          </button>
        </form>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat title="Sessões completas" value={sessionsCount ?? 0} />
        <Stat title="Atividades feitas" value={attemptsCount ?? 0} />
        <Stat title="Amigos na casinha" value={collectiblesCount ?? 0} />
      </section>

      {axisProgress.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-lg font-medium">Progresso por eixo</h2>
          <ul className="mt-3 space-y-2">
            {axisProgress.map((a) => {
              const pct = a.total > 0 ? Math.round((a.completed / a.total) * 100) : 0;
              return (
                <li key={a.slug} className="rounded-2xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium">{a.displayName}</span>
                    <span className="text-sm text-gray-500">
                      {a.completed} / {a.total} ({pct}%)
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-[#E26B45]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <section className="mt-8 flex flex-wrap gap-3">
        <Link
          href={`/children/${childId}/reports`}
          className="rounded-full border border-purple-700 px-4 py-2 text-sm font-medium text-purple-700"
        >
          Relatório detalhado
        </Link>
        <Link
          href={`/children/${childId}/settings`}
          className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
        >
          Configurações da criança
        </Link>
        <Link
          href={`/children/${childId}/audit`}
          className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
        >
          Histórico de dados (LGPD)
        </Link>
      </section>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: number | string }) {
  return (
    <article className="rounded-2xl border border-gray-200 p-6">
      <h2 className="text-sm font-medium text-gray-500">{title}</h2>
      <p className="mt-2 text-3xl font-medium">{value}</p>
    </article>
  );
}
