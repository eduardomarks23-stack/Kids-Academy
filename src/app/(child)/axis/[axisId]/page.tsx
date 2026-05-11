// =============================================================
// /axis/[axisId] — mapa do eixo (escolha de capítulo)
// =============================================================

import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase/server';

interface PageProps {
  params: Promise<{ axisId: string }>;
}

export default async function AxisPage({ params }: PageProps) {
  const { axisId } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: axis } = await supabase
    .from('axes')
    .select('id, display_name, subtitle')
    .eq('id', axisId)
    .single();

  const { data: chapters } = await supabase
    .from('chapters')
    .select('id, display_name, description, display_order')
    .eq('axis_id', axisId)
    .eq('active', true)
    .order('display_order');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const list = ((chapters as any) ?? []) as Array<{
    id: string;
    display_name: string;
    description: string | null;
    display_order: number;
  }>;

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-medium text-purple-900">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {(axis as any)?.display_name ?? 'Eixo'}
      </h1>
      <p className="text-gray-600">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {(axis as any)?.subtitle ?? ''}
      </p>
      <ol className="mt-8 space-y-3">
        {list.map((c) => (
          <li key={c.id}>
            <Link
              href={`/chapter/${c.id}`}
              className="block rounded-2xl border-2 border-purple-200 bg-purple-50 p-6"
            >
              <h2 className="text-lg font-medium text-purple-900">
                {c.display_name}
              </h2>
              {c.description ? (
                <p className="mt-1 text-sm text-purple-700">{c.description}</p>
              ) : null}
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
