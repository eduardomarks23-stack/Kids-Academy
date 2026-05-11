// =============================================================
// /billing — status da assinatura
// =============================================================

import { createServerSupabaseClient } from '@/lib/supabase/server';

export default async function BillingPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: family } = await supabase
    .from('families')
    .select('id')
    .eq('owner_id', user!.id)
    .maybeSingle();

  let entitlement: {
    product_slug: string;
    expires_at: string | null;
    source: string;
  } | null = null;

  if (family) {
    const { data } = await supabase
      .from('entitlements')
      .select('product_slug, expires_at, source')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .eq('family_id', (family as any).id)
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    entitlement = data as any;
  }

  return (
    <div>
      <h1 className="text-2xl font-medium">Assinatura</h1>
      {entitlement ? (
        <div className="mt-6 rounded-2xl border border-purple-200 bg-purple-50 p-6">
          <p className="text-lg font-medium text-purple-900">
            Plano ativo: {entitlement.product_slug}
          </p>
          {entitlement.expires_at ? (
            <p className="mt-2 text-sm text-purple-700">
              Renova em{' '}
              {new Date(entitlement.expires_at).toLocaleDateString('pt-BR')}
            </p>
          ) : (
            <p className="mt-2 text-sm text-purple-700">Sem expiração</p>
          )}
          <p className="mt-1 text-xs text-purple-600">
            Origem: {entitlement.source}
          </p>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-gray-200 p-6">
          <p className="text-gray-700">Sem plano ativo no momento.</p>
          <a
            href="/planos"
            className="mt-4 inline-block rounded-full bg-purple-700 px-4 py-2 text-sm font-medium text-white"
          >
            Ver planos
          </a>
        </div>
      )}
    </div>
  );
}
