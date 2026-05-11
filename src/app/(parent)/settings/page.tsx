// =============================================================
// /settings — configurações da conta
// =============================================================
// Inclui ponto de acesso para LGPD self-service.
// =============================================================

import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-medium">Configurações</h1>

      <section className="mt-8 space-y-2">
        <h2 className="text-lg font-medium">Privacidade e dados (LGPD)</h2>
        <p className="text-sm text-gray-600">
          Você pode exportar ou solicitar a exclusão dos dados das suas
          crianças a qualquer momento.
        </p>
        <div className="mt-4 flex gap-4">
          <Link
            href="/settings/lgpd"
            className="rounded-full border border-purple-700 px-4 py-2 text-sm font-medium text-purple-700"
          >
            Gerenciar dados
          </Link>
        </div>
      </section>
    </div>
  );
}
