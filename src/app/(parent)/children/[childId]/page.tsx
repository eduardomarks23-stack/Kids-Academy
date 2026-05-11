// =============================================================
// /children/[childId] — perfil + progresso da criança
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

  const [{ count: sessionsCount }, { count: attemptsCount }] =
    await Promise.all([
      supabase
        .from('session_progress')
        .select('id', { count: 'exact', head: true })
        .eq('child_id', childId)
        .not('completed_at', 'is', null),
      supabase
        .from('atom_attempts')
        .select('id', { count: 'exact', head: true })
        .eq('child_id', childId),
    ]);

  return (
    <div>
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-medium">{child.display_name}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Nascido em {child.birth_year}
            {child.hand_preference
              ? ` · ${child.hand_preference === 'left' ? 'canhoto' : 'destro'}`
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
        <Stat
          title="Cadastrado em"
          value={
            child.created_at
              ? new Date(child.created_at).toLocaleDateString('pt-BR')
              : '—'
          }
        />
      </section>

      <section className="mt-8 flex flex-wrap gap-3">
        <Link
          href={`/children/${childId}/reports`}
          className="rounded-full border border-purple-700 px-4 py-2 text-sm font-medium text-purple-700"
        >
          Relatório detalhado
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
