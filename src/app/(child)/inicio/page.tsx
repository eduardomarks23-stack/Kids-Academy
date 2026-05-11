// =============================================================
// /inicio (child) — mapa do Mundo ativo da criança (spec v1)
// =============================================================
// Renomeado de /home para evitar conflito com legacy (app)/home.
// Mantém intenção do spec: tela inicial da criança com lista de
// Mundos disponíveis. Visual placeholder até design tokens.
// =============================================================

import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export default async function ChildInicioPage() {
  const supabase = await createServerSupabaseClient();

  const { data: worlds } = await supabase
    .from('worlds')
    .select('id, slug, display_name, theme_color')
    .eq('active', true);

  const list = (worlds ?? []).map((w) => ({
    id: w.id,
    slug: w.slug,
    display_name: w.display_name,
    theme_color: w.theme_color,
  }));

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-medium text-purple-900">
        Vamos brincar?
      </h1>
      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        {list.map((w) => (
          <Link
            key={w.id}
            href={`/world/${w.slug}`}
            className="block rounded-3xl border-2 p-8"
            style={{ borderColor: w.theme_color ?? '#E26B45' }}
          >
            <h2 className="text-xl font-medium">{w.display_name}</h2>
          </Link>
        ))}
        {list.length === 0 ? (
          <p className="text-gray-500">Nenhum mundo disponível ainda.</p>
        ) : null}
      </section>
    </main>
  );
}
