// =============================================================
// /children/[childId]/reports — relatório detalhado
// =============================================================
// Tabela de últimas sessões + conceitos dominados (via tentativas)
// + colecionáveis adquiridos com timestamp.
// =============================================================

import Link from 'next/link';
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childData = child as any;

  // Sessões recentes
  const { data: progressRows } = await supabase
    .from('session_progress')
    .select('id, session_id, started_at, completed_at, success_score')
    .eq('child_id', childId)
    .order('started_at', { ascending: false })
    .limit(50);

  const sessionIds = ((progressRows ?? []) as Array<{ session_id: string }>)
    .map((p) => p.session_id)
    .filter(Boolean);

  const { data: sessionRows } = sessionIds.length
    ? await supabase
        .from('sessions')
        .select('id, display_name, chapter_id')
        .in('id', sessionIds)
    : { data: [] as Array<{ id: string; display_name: string; chapter_id: string }> };

  const sessionsById = new Map(
    ((sessionRows ?? []) as Array<{ id: string; display_name: string; chapter_id: string }>).map(
      (s) => [s.id, s] as const,
    ),
  );

  // Conceitos com tentativas (proxy para "dominados" enquanto repetition_queue
  // não está completamente populada — agrega success rate por conceito)
  const { data: attempts } = await supabase
    .from('atom_attempts')
    .select('atom_id, success')
    .eq('child_id', childId)
    .limit(2000);

  const attemptsList = (attempts ?? []) as Array<{ atom_id: string; success: boolean | null }>;

  // Para cada atom, achar conceitos linkados
  const atomIds = Array.from(new Set(attemptsList.map((a) => a.atom_id)));
  const { data: atomConcepts } = atomIds.length
    ? await supabase
        .from('atom_concepts')
        .select('atom_id, concept_id')
        .in('atom_id', atomIds)
    : { data: [] as Array<{ atom_id: string; concept_id: string }> };

  const atomConceptList = (atomConcepts ?? []) as Array<{ atom_id: string; concept_id: string }>;
  const conceptIds = Array.from(new Set(atomConceptList.map((c) => c.concept_id)));
  const { data: concepts } = conceptIds.length
    ? await supabase
        .from('concepts')
        .select('id, slug, display_name, bncc_code')
        .in('id', conceptIds)
    : { data: [] as Array<{ id: string; slug: string; display_name: string; bncc_code: string | null }> };

  const conceptsById = new Map(
    ((concepts ?? []) as Array<{ id: string; slug: string; display_name: string; bncc_code: string | null }>).map(
      (c) => [c.id, c] as const,
    ),
  );

  // Agrega: conceito → { successes, total }
  const conceptStats = new Map<string, { successes: number; total: number }>();
  for (const attempt of attemptsList) {
    const linkedConcepts = atomConceptList.filter((ac) => ac.atom_id === attempt.atom_id);
    for (const link of linkedConcepts) {
      const stats = conceptStats.get(link.concept_id) ?? { successes: 0, total: 0 };
      stats.total++;
      if (attempt.success) stats.successes++;
      conceptStats.set(link.concept_id, stats);
    }
  }

  // Classifica conceitos
  const dominated: Array<{ id: string; name: string; bncc: string | null; rate: number }> = [];
  const inProgress: Array<{ id: string; name: string; bncc: string | null; rate: number }> = [];
  for (const [conceptId, stats] of conceptStats) {
    if (stats.total < 1) continue;
    const concept = conceptsById.get(conceptId);
    if (!concept) continue;
    const rate = stats.successes / stats.total;
    const entry = { id: conceptId, name: concept.display_name, bncc: concept.bncc_code, rate };
    if (rate >= 0.7) dominated.push(entry);
    else inProgress.push(entry);
  }
  dominated.sort((a, b) => b.rate - a.rate);
  inProgress.sort((a, b) => a.rate - b.rate);

  // Colecionáveis recentes
  const { data: collectibles } = await supabase
    .from('child_collectibles')
    .select('collectible_slug, acquired_at')
    .eq('child_id', childId)
    .order('acquired_at', { ascending: false })
    .limit(10);

  const collectiblesList = (collectibles ?? []) as Array<{
    collectible_slug: string;
    acquired_at: string;
  }>;

  return (
    <div className="space-y-10">
      <header>
        <Link
          href={`/children/${childId}`}
          className="text-sm text-gray-500 hover:text-purple-700"
        >
          ← Voltar para perfil
        </Link>
        <h1 className="mt-2 text-2xl font-medium">Relatório — {childData.display_name}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {progressRows?.length ?? 0} sessões iniciadas · {attemptsList.length} tentativas de
          átomo · {conceptStats.size} conceitos com dados
        </p>
      </header>

      {/* Conceitos dominados */}
      <section>
        <h2 className="text-lg font-medium text-green-700">
          Conceitos dominados (≥ 70% de acerto)
        </h2>
        {dominated.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500">Ainda sem dados suficientes.</p>
        ) : (
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {dominated.slice(0, 20).map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-3"
              >
                <div>
                  <span className="text-sm font-medium text-green-900">{c.name}</span>
                  {c.bncc ? <span className="ml-2 text-xs text-green-700">{c.bncc}</span> : null}
                </div>
                <span className="text-xs text-green-700">{Math.round(c.rate * 100)}%</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Conceitos em construção */}
      <section>
        <h2 className="text-lg font-medium text-amber-700">
          Conceitos em construção (&lt; 70%)
        </h2>
        {inProgress.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500">Tudo dominado ou sem dados ainda.</p>
        ) : (
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {inProgress.slice(0, 20).map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 p-3"
              >
                <div>
                  <span className="text-sm font-medium text-amber-900">{c.name}</span>
                  {c.bncc ? <span className="ml-2 text-xs text-amber-700">{c.bncc}</span> : null}
                </div>
                <span className="text-xs text-amber-700">{Math.round(c.rate * 100)}%</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Colecionáveis recentes */}
      {collectiblesList.length > 0 ? (
        <section>
          <h2 className="text-lg font-medium">Últimas conquistas</h2>
          <ul className="mt-3 space-y-2">
            {collectiblesList.map((c) => (
              <li
                key={c.collectible_slug}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3"
              >
                <span className="text-sm">{c.collectible_slug}</span>
                <span className="text-xs text-gray-500">
                  {new Date(c.acquired_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Tabela de sessões */}
      <section>
        <h2 className="text-lg font-medium">Sessões recentes</h2>
        {(progressRows ?? []).length === 0 ? (
          <p className="mt-2 text-sm text-gray-500">Sem sessões registradas ainda.</p>
        ) : (
          <table className="mt-4 w-full text-sm">
            <thead className="border-b border-gray-200 text-left">
              <tr>
                <th className="py-2 font-medium">Sessão</th>
                <th className="py-2 font-medium">Iniciada</th>
                <th className="py-2 font-medium">Concluída</th>
                <th className="py-2 font-medium text-right">Pontuação</th>
              </tr>
            </thead>
            <tbody>
              {((progressRows ?? []) as Array<{
                id: string;
                session_id: string;
                started_at: string;
                completed_at: string | null;
                success_score: number | null;
              }>).map((p) => {
                const s = p.session_id ? sessionsById.get(p.session_id) : null;
                return (
                  <tr key={p.id} className="border-b border-gray-100">
                    <td className="py-2">{s?.display_name ?? p.session_id}</td>
                    <td className="py-2 text-gray-500">
                      {new Date(p.started_at).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-2 text-gray-500">
                      {p.completed_at
                        ? new Date(p.completed_at).toLocaleString('pt-BR', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
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
      </section>
    </div>
  );
}
