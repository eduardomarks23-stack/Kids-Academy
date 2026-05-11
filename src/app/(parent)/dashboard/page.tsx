// =============================================================
// /dashboard — visão geral do painel do pai
// =============================================================

import { createServerSupabaseClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Buscar família do owner
  const { data: family } = await supabase
    .from('families')
    .select('id, display_name')
    .eq('owner_id', user!.id)
    .maybeSingle();

  return (
    <div>
      <h1 className="text-2xl font-medium">Olá!</h1>
      <p className="mt-2 text-gray-600">
        {family?.display_name
          ? `Família ${family.display_name}`
          : 'Configure sua família para começar.'}
      </p>
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card title="Tempo desta semana" value="—" hint="Em construção" />
        <Card title="Sessões completadas" value="—" hint="Em construção" />
        <Card title="Conceitos dominados" value="—" hint="Em construção" />
      </section>
    </div>
  );
}

function Card({
  title,
  value,
  hint,
}: {
  title: string;
  value: string;
  hint?: string;
}) {
  return (
    <article className="rounded-2xl border border-gray-200 p-6">
      <h2 className="text-sm font-medium text-gray-500">{title}</h2>
      <p className="mt-2 text-3xl font-medium text-gray-900">{value}</p>
      {hint ? <p className="mt-2 text-xs text-gray-400">{hint}</p> : null}
    </article>
  );
}
