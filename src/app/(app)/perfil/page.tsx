import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getPerfilAtivoId } from '@/lib/perfil-ativo';
import { KidsAvatar } from '@/components/kids/avatar';
import { KidsIcon } from '@/components/kids/icons';

export default async function PerfilPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const perfilId = await getPerfilAtivoId(supabase, user.id);
  if (!perfilId) redirect('/onboarding');

  const { data: perfil } = await supabase
    .from('perfis_crianca')
    .select('id, nome, serie, avatar_id, data_nascimento')
    .eq('id', perfilId)
    .maybeSingle();

  if (!perfil) redirect('/pais/dashboard');

  const inicial = String(perfil.nome ?? 'C').slice(0, 1);

  return (
    <div className="min-h-full bg-white">
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-5 py-4">
          <h1 className="text-2xl font-extrabold text-gray-900">Perfil</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 py-6 space-y-6">
        <section className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5">
          <KidsAvatar name={inicial} size={72} />
          <div className="flex-1 min-w-0">
            <p className="text-2xl font-extrabold text-gray-900 truncate">{perfil.nome}</p>
            <p className="text-sm text-gray-500 font-medium">{perfil.serie}</p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-3">Conquistas</h2>
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Conquistas" value="—" Icon={KidsIcon.Trophy} />
            <StatCard label="Estrelas" value="—" Icon={KidsIcon.Star} />
            <StatCard label="Sequência" value="—" Icon={KidsIcon.Bolt} />
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">
            Estatísticas detalhadas chegam na Fase 5.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-3">Para quem cuida</h2>
          <Link
            href="/pais/dashboard"
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 hover:border-purple-400 hover:shadow-md transition-all"
          >
            <span className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <KidsIcon.Parent size={20} />
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-gray-900">Área dos Pais</p>
              <p className="text-xs text-gray-500">Trocar de criança, ver progresso</p>
            </div>
            <span className="text-purple-700 font-bold">→</span>
          </Link>
        </section>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string;
  Icon: (props: { size?: number; className?: string }) => React.ReactElement;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center">
      <span className="inline-flex w-9 h-9 rounded-xl bg-purple-100 text-purple-700 items-center justify-center mb-2">
        <Icon size={18} />
      </span>
      <p className="text-xl font-extrabold text-gray-900">{value}</p>
      <p className="text-[11px] font-bold text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}
