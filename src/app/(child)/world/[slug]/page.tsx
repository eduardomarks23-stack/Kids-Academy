// =============================================================
// /world/[slug] — mapa do Mundo: lista os 4 eixos
// =============================================================
// Layout 2x2 grande (180px+ por botão), personagens-guia
// (placeholders) acenam no rodapé. Card flutuante da casinha
// com contador de colecionáveis.
// =============================================================

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getActiveChildId } from '@/lib/active-child';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const AXIS_ICONS: Record<string, string> = {
  'sons-letras': '🎵',
  'contar-comparar': '🔢',
  'formas-cores': '🎨',
  afetos: '💖',
  letras: '🔤',
  numeros: '🔢',
};

const AXIS_COLORS: Record<string, string> = {
  'sons-letras': '#E26B45',
  'contar-comparar': '#60A5FA',
  'formas-cores': '#FCD34D',
  afetos: '#F472B6',
  letras: '#E26B45',
  numeros: '#60A5FA',
};

export default async function WorldPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: world } = await supabase
    .from('worlds')
    .select('id, slug, display_name, description')
    .eq('slug', slug)
    .eq('active', true)
    .single();

  if (!world) notFound();

  const { data: axes } = await supabase
    .from('axes')
    .select('id, slug, display_name, subtitle, icon_name, display_order')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .eq('world_id', (world as any).id)
    .eq('active', true)
    .order('display_order');

  const list = (axes ?? []) as Array<{
    id: string;
    slug: string;
    display_name: string;
    subtitle: string | null;
    icon_name: string | null;
    display_order: number;
  }>;

  // Contagem de colecionáveis da criança ativa (se houver)
  let collectibleCount = 0;
  const activeChildId = await getActiveChildId();
  if (activeChildId) {
    const { count } = await supabase
      .from('child_collectibles')
      .select('*', { count: 'exact', head: true })
      .eq('child_id', activeChildId);
    collectibleCount = count ?? 0;
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <header className="text-center">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <h1 className="text-3xl font-medium text-[#E26B45]">{(world as any).display_name}</h1>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {(world as any).description ? (
          <p className="mt-2 text-base text-gray-600">{
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            (world as any).description
          }</p>
        ) : null}
      </header>

      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        {list.map((axis) => {
          const color = AXIS_COLORS[axis.slug] ?? '#E26B45';
          const icon = AXIS_ICONS[axis.slug] ?? '🎯';
          return (
            <Link
              key={axis.id}
              href={`/axis/${axis.id}`}
              className="group block rounded-3xl border-4 p-8 text-center transition-transform hover:scale-105"
              style={{ borderColor: color, background: '#FFFCF7', minHeight: 200 }}
            >
              <div className="text-6xl">{icon}</div>
              <h2 className="mt-4 text-xl font-medium text-gray-900">{axis.display_name}</h2>
              {axis.subtitle ? (
                <p className="mt-2 text-sm text-gray-600">{axis.subtitle}</p>
              ) : null}
            </Link>
          );
        })}
      </section>

      {/* Rodapé: personagens-guia (placeholders) */}
      <div className="mt-10 flex items-end justify-center gap-12">
        <div className="text-center">
          <div className="text-5xl">🐶</div>
          <p className="mt-1 text-xs text-gray-500">Garuzinho</p>
        </div>
        <div className="text-center">
          <div className="text-5xl">🐕</div>
          <p className="mt-1 text-xs text-gray-500">Lolinha</p>
        </div>
      </div>

      {/* Casinha card flutuante */}
      <Link
        href="/casinha"
        className="fixed bottom-6 right-6 flex items-center gap-2 rounded-2xl bg-[#FCD34D] px-4 py-3 text-sm font-medium text-gray-900 shadow-lg hover:bg-[#FDE68A]"
      >
        🏠 Casinha
        <span className="rounded-full bg-white px-2 text-xs">{collectibleCount}</span>
      </Link>
    </main>
  );
}
