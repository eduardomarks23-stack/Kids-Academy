// =============================================================
// /chapter/[chapterId] — mapa do capítulo (escolha de sessão)
// =============================================================

import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase/server';

interface PageProps {
  params: Promise<{ chapterId: string }>;
}

export default async function ChapterPage({ params }: PageProps) {
  const { chapterId } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: chapter } = await supabase
    .from('chapters')
    .select('id, display_name, description')
    .eq('id', chapterId)
    .single();

  const { data: sessions } = await supabase
    .from('sessions')
    .select('id, display_name, learning_objective, display_order')
    .eq('chapter_id', chapterId)
    .eq('active', true)
    .order('display_order');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const list = ((sessions as any) ?? []) as Array<{
    id: string;
    display_name: string;
    learning_objective: string;
    display_order: number;
  }>;

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-medium text-purple-900">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {(chapter as any)?.display_name ?? 'Capítulo'}
      </h1>
      <p className="text-gray-600">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {(chapter as any)?.description ?? ''}
      </p>
      <ol className="mt-8 grid gap-3 sm:grid-cols-2">
        {list.map((s, i) => (
          <li key={s.id}>
            <Link
              href={`/session/${s.id}`}
              className="block rounded-2xl border-2 border-amber-200 bg-amber-50 p-6"
            >
              <span className="text-xs font-medium text-amber-700">
                Sessão {i + 1}
              </span>
              <h2 className="mt-1 text-lg font-medium text-amber-900">
                {s.display_name}
              </h2>
              <p className="mt-1 text-xs text-amber-700">
                {s.learning_objective}
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
