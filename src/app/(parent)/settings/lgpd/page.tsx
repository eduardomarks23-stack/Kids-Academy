// =============================================================
// /settings/lgpd — self-service LGPD por criança
// =============================================================
// SPEC §13: parent pode exportar (Art. 18) e solicitar erasure
// (Art. 18) a qualquer momento.
// =============================================================

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { LgpdActions } from './lgpd-actions';

interface ChildSummary {
  id: string;
  display_name: string;
}

export default async function LgpdSettingsPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let children: ChildSummary[] = [];
  if (user) {
    const { data: family } = await supabase
      .from('families')
      .select('id')
      .eq('owner_id', user.id)
      .maybeSingle();
    if (family) {
      const { data } = await supabase
        .from('children')
        .select('id, display_name')
        .eq('family_id', family.id)
        .is('deleted_at', null);
      children = (data ?? []) as ChildSummary[];
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-medium">
        Gerenciamento de dados (LGPD)
      </h1>
      <p className="mt-2 text-gray-600">
        Você tem o direito de exportar todos os dados de cada uma das
        suas crianças e solicitar a remoção permanente a qualquer momento.
      </p>

      <section className="mt-8 space-y-4">
        {children.length === 0 ? (
          <p className="text-gray-600">
            Você ainda não cadastrou nenhuma criança.
          </p>
        ) : (
          children.map((c) => (
            <article
              key={c.id}
              className="rounded-2xl border border-gray-200 p-6"
            >
              <h2 className="text-lg font-medium">{c.display_name}</h2>
              <LgpdActions childId={c.id} displayName={c.display_name} />
            </article>
          ))
        )}
      </section>

      <section className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-sm font-medium text-amber-900">
          Como funciona a exclusão
        </h2>
        <ul className="mt-2 list-inside list-disc text-sm text-amber-900">
          <li>
            A criança é marcada como removida imediatamente — fica
            inacessível pelo app.
          </li>
          <li>
            Você tem <strong>30 dias</strong> para mudar de ideia entrando
            em contato com suporte.
          </li>
          <li>
            Após 30 dias, todos os dados são apagados de forma definitiva
            (Art. 18 LGPD).
          </li>
        </ul>
      </section>
    </div>
  );
}
