// =============================================================
// /children — listagem dos filhos da família
// =============================================================

import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { activateChildAction } from '@/features/children/actions';

export default async function ChildrenPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: family } = await supabase
    .from('families')
    .select('id')
    .eq('owner_id', user!.id)
    .maybeSingle();

  let children: Array<{ id: string; display_name: string; birth_year: number }> =
    [];
  if (family) {
    const { data } = await supabase
      .from('children')
      .select('id, display_name, birth_year')
      .eq('family_id', family.id)
      .is('deleted_at', null);
    children = (data ?? []) as typeof children;
  }

  return (
    <div>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Meus filhos</h1>
        <Link
          href="/children/new"
          className="rounded-full bg-purple-700 px-4 py-2 text-sm font-medium text-white"
        >
          Adicionar criança
        </Link>
      </header>
      {children.length === 0 ? (
        <p className="mt-8 text-gray-600">
          Nenhum filho cadastrado ainda. Comece adicionando uma criança.
        </p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {children.map((c) => (
            <li
              key={c.id}
              className="flex flex-col gap-3 rounded-2xl border border-gray-200 p-6"
            >
              <Link href={`/children/${c.id}`} className="block">
                <h2 className="text-lg font-medium">{c.display_name}</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Nascido em {c.birth_year}
                </p>
              </Link>
              <form action={activateChildAction}>
                <input type="hidden" name="childId" value={c.id} />
                <button
                  type="submit"
                  className="w-full rounded-full bg-purple-700 px-4 py-2 text-sm font-medium text-white"
                >
                  Ativar perfil para a criança
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
