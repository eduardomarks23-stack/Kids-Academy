// =============================================================
// /children/[childId]/audit — audit log viewer
// =============================================================
// SPEC §13: histórico de operações sobre dados da criança.
// Read-only para parent (RLS aplica).
// =============================================================

import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';

interface PageProps {
  params: Promise<{ childId: string }>;
}

const ACTION_LABEL: Record<string, string> = {
  insert: 'Criação',
  update: 'Atualização',
  delete: 'Remoção',
  erasure_requested: 'Erasure solicitado',
  erasure_executed: 'Erasure executado',
  export: 'Exportação',
};

export default async function AuditPage({ params }: PageProps) {
  const { childId } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: child } = await supabase
    .from('children')
    .select('id, display_name')
    .eq('id', childId)
    .maybeSingle();

  if (!child) notFound();

  const { data: rows } = await supabase
    .from('audit_log')
    .select('id, occurred_at, action, entity_table, entity_id')
    .eq('child_id', childId)
    .order('occurred_at', { ascending: false })
    .limit(200);

  return (
    <div>
      <h1 className="text-2xl font-medium">
        Histórico de dados — {child.display_name}
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        Toda operação que toca dados da sua criança é registrada aqui.
        Você pode exportar tudo ou solicitar a exclusão completa em{' '}
        <a className="underline" href="/settings/lgpd">
          Configurações → LGPD
        </a>
        .
      </p>

      {(rows ?? []).length === 0 ? (
        <p className="mt-8 text-gray-600">
          Nenhuma operação registrada ainda.
        </p>
      ) : (
        <table className="mt-8 w-full text-sm">
          <thead className="border-b border-gray-200 text-left">
            <tr>
              <th className="py-2 font-medium">Quando</th>
              <th className="py-2 font-medium">Ação</th>
              <th className="py-2 font-medium">Tabela</th>
            </tr>
          </thead>
          <tbody>
            {(rows ?? []).map((r) => (
              <tr key={String(r.id)} className="border-b border-gray-100">
                <td className="py-2 text-gray-500">
                  {new Date(r.occurred_at).toLocaleString('pt-BR')}
                </td>
                <td className="py-2">
                  {ACTION_LABEL[r.action] ?? r.action}
                </td>
                <td className="py-2 text-gray-500">{r.entity_table}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
