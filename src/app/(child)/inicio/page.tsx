// =============================================================
// /inicio — mapa do Mundo ativo da criança
// =============================================================
// Lista os mundos disponíveis. Se houver criança ativa com
// active_world_id, vai direto para o mundo dela. Caso contrário,
// mostra grid de mundos para escolher (modo dev).
// =============================================================

import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export default async function ChildInicioPage() {
  const supabase = await createServerSupabaseClient();

  const { data: worlds } = await supabase
    .from('worlds')
    .select('id, slug, display_name, age_min, age_max, theme_color, description')
    .eq('active', true)
    .order('age_min');

  const list = (worlds ?? []) as Array<{
    id: string;
    slug: string;
    display_name: string;
    age_min: number;
    age_max: number;
    theme_color: string | null;
    description: string | null;
  }>;

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header className="text-center">
        <h1 className="text-4xl font-medium text-[#E26B45]">Oi, amiguinho!</h1>
        <p className="mt-2 text-lg text-gray-600">Escolhe um mundo pra brincar.</p>
      </header>

      <section className="mt-12 grid gap-6 sm:grid-cols-2">
        {list.map((w) => (
          <Link
            key={w.id}
            href={`/world/${w.slug}`}
            className="group block rounded-3xl border-4 p-8 transition-transform hover:scale-105"
            style={{ borderColor: w.theme_color ?? '#E26B45', background: '#FFFCF7' }}
          >
            <div className="flex flex-col items-start gap-3">
              <span className="text-5xl">
                {w.slug === 'curiosos' ? '🐶' : w.slug === 'exploradores' ? '🧭' : '🚀'}
              </span>
              <h2 className="text-2xl font-medium text-gray-900">{w.display_name}</h2>
              <p className="text-sm text-gray-600">
                Idade {w.age_min}-{w.age_max} anos
              </p>
              {w.description ? (
                <p className="text-sm text-gray-500">{w.description}</p>
              ) : null}
            </div>
          </Link>
        ))}
        {list.length === 0 ? (
          <p className="text-gray-500">Nenhum mundo disponível ainda.</p>
        ) : null}
      </section>

      <div className="mt-12 flex justify-center">
        <Link
          href="/casinha"
          className="rounded-2xl border-2 border-[#FCD34D] bg-[#FEF3C7] px-6 py-3 text-base font-medium text-gray-800 hover:bg-[#FDE68A]"
        >
          🏠 Minha casinha
        </Link>
      </div>
    </main>
  );
}
