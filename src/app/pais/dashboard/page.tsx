import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { KidsAvatar } from '@/components/kids/avatar';
import { KidsIcon } from '@/components/kids/icons';

export default async function PaisDashboardPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: filhos } = await supabase
    .from('perfis_crianca')
    .select('id, nome, serie, avatar_id, ativo')
    .eq('responsavel_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Bem-vindo</h1>
        <p className="text-gray-600 mt-1">Acompanhe o aprendizado dos seus filhos.</p>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-gray-900">Crianças cadastradas</h2>
          <Link
            href="/onboarding"
            className="text-sm font-bold text-purple-700 hover:underline"
          >
            + Nova criança
          </Link>
        </div>

        {!filhos || filhos.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center">
            <p className="text-gray-600">Nenhum perfil de criança ainda.</p>
            <Link
              href="/onboarding"
              className="mt-4 inline-flex h-12 px-6 rounded-2xl bg-purple-700 text-white font-extrabold items-center"
            >
              Criar primeiro perfil
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {filhos.map((f) => (
              <div
                key={String(f.id)}
                className="rounded-2xl border border-gray-200 bg-white p-5 flex items-center gap-4"
              >
                <KidsAvatar name={String(f.nome ?? 'C').slice(0, 1)} size={56} />
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-gray-900 truncate">{String(f.nome)}</p>
                  <p className="text-sm text-gray-500">{String(f.serie)}</p>
                </div>
                {!f.ativo && (
                  <span className="text-xs font-bold text-gray-400">inativo</span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="grid sm:grid-cols-3 gap-4">
        <StatCard label="Tempo total" value="—" Icon={KidsIcon.Clock} />
        <StatCard label="Conquistas" value="—" Icon={KidsIcon.Trophy} />
        <StatCard label="Sessões" value="—" Icon={KidsIcon.Sparkle} />
      </section>

      <p className="text-xs text-gray-400 mt-12">
        Estatísticas detalhadas, histórico de progresso e relatório MENTOR virão na Fase 5.
      </p>
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
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
          <Icon size={18} />
        </span>
        <p className="text-sm font-bold text-gray-500">{label}</p>
      </div>
      <p className="text-3xl font-extrabold text-gray-900">{value}</p>
    </div>
  );
}
