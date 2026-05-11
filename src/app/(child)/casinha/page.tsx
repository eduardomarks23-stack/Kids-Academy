// =============================================================
// /casinha — coleção visual dos colecionáveis adquiridos
// =============================================================
// Mostra grid de bichinhos/objetos. Itens afetivos (folha
// respirante, sininho ajuda, mão amiga, coração brilhante)
// têm interatividade especial — abrem overlays correspondentes
// no client component.
// =============================================================

import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getActiveChildId } from '@/lib/active-child';
import { CasinhaGrid } from './casinha-grid';

export default async function CasinhaPage() {
  const supabase = await createServerSupabaseClient();
  const childId = await getActiveChildId();

  let collectibles: Array<{ slug: string; acquired_at: string }> = [];
  if (childId) {
    const { data } = await supabase
      .from('child_collectibles')
      .select('collectible_slug, acquired_at')
      .eq('child_id', childId)
      .order('acquired_at', { ascending: false });
    collectibles = ((data ?? []) as Array<{ collectible_slug: string; acquired_at: string }>).map(
      (c) => ({ slug: c.collectible_slug, acquired_at: c.acquired_at }),
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <header>
        <Link href="/inicio" className="text-sm text-gray-500 hover:text-[#E26B45]">
          ← Voltar
        </Link>
        <h1 className="mt-2 text-3xl font-medium text-[#E26B45]">Minha casinha</h1>
        <p className="mt-1 text-gray-600">
          Você tem {collectibles.length} {collectibles.length === 1 ? 'amigo' : 'amigos'} aqui.
        </p>
      </header>

      <CasinhaGrid collectibles={collectibles} />
    </main>
  );
}
