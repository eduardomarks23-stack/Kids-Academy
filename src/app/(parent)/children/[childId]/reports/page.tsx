// =============================================================
// /children/[childId]/reports — relatório de progresso
// =============================================================
// Agregado por sessão concluída + tentativas por átomo.
// Detalhes finos virão com queries dedicadas; este é V0.
// =============================================================

import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';

interface PageProps {
  params: Promise<{ childId: string }>;
}

export default async function ReportsPage({ params }: PageProps) {
  const { childId } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: child } = await supabase
    .from('children')
    .select('id, display_name')
    .eq('id', childId)
    .is('deleted_at', null)
    .maybeSingle();

  if (!child) notFound();

  const { data: progressRows } = await supabase
    .from('session_progress')
    .select('id, session_id, started_at, completed_at, success_score')
    .eq('child_id', childId)
    .order('started_at', { ascending: false })
    .limit(50);

  const sessionIds = (progressRows ?? [])
    .map((p) => p.session_id)
    .filter(Boolean) as string[];

  const { data: sessionRows } = sessionIds.length
    ? await supabase
        .from('sessions')
        .select('id, display_name, chapter_id')
        .in('id', sessionIds)
    : { data: [] as Array<{ id: string; display_name: string; chapter_id: string }> };

  const sessionsById = new Map(
    (sessionRows ?? []).map((s) => [s.id, s] as const),
  );

  return (
    <div>
      <h1 className="text-2xl font-medium">
        Relatório — {child.display_name}
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Últimas {progressRows?.length ?? 0} sessões.
      </p>

      {(progressRows ?? []).length === 0 ? (
        <p className="mt-8 text-gray-600">Sem sessões registradas ainda.</p>
      ) : (
        <table className="mt-8 w-full text-sm">
          <thead className="border-b border-gray-200 text-left">
            <tr>
              <th className="py-2 font-medium">Sessão</th>
              <th className="py-2 font-medium">Iniciada</th>
              <th className="py-2 font-medium">Concluída</th>
              <th className="py-2 font-medium text-right">Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {(progressRows ?? []).map((p) => {
              const s = p.session_id ? sessionsById.get(p.session_id) : null;
              return (
                <tr key={p.id} className="border-b border-gray-100">
                  <td className="py-2">{s?.display_name ?? p.session_id}</td>
                  <td className="py-2 text-gray-500">
                    {new Date(p.started_at).toLocaleString('pt-BR')}
                  </td>
                  <td className="py-2 text-gray-500">
                    {p.completed_at
                      ? new Date(p.completed_at).toLocaleString('pt-BR')
                      : '—'}
                  </td>
                  <td className="py-2 text-right">
                    {p.success_score !== null
                      ? `${Math.round((p.success_score ?? 0) * 100)}%`
                      : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
