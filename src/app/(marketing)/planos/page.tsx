// =============================================================
// /planos — pricing page (marketing)
// =============================================================
// Skeleton. Conteúdo final + integração de assinatura via
// RevenueCat ficam no Sprint 8.
// =============================================================

export default function PlanosPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-medium text-gray-900">Planos</h1>
      <p className="mt-4 text-gray-600">
        Acesso completo ao Nexus Kids Academy para sua família.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-gray-200 p-6">
          <h2 className="text-xl font-medium">Mensal</h2>
          <p className="mt-2 text-gray-600">Acesso ilimitado, cancele quando quiser.</p>
          <p className="mt-4 text-3xl font-medium">— por mês</p>
        </article>
        <article className="rounded-2xl border border-gray-200 p-6">
          <h2 className="text-xl font-medium">Anual</h2>
          <p className="mt-2 text-gray-600">Mais econômico no longo prazo.</p>
          <p className="mt-4 text-3xl font-medium">— por ano</p>
        </article>
      </div>
      <p className="mt-8 text-sm text-gray-500">
        Valores serão definidos antes do soft launch.
      </p>
    </main>
  );
}
