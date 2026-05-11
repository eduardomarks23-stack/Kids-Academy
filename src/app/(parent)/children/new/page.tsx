// =============================================================
// /children/new — criar perfil de criança + consent LGPD
// =============================================================
// SPEC §13: consentimento parental obrigatório (basic_usage)
// antes de criar perfil. Granularidade de ano (não data).
// =============================================================

import { CreateChildForm } from './form';

export default function NewChildPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-medium">Adicionar criança</h1>
      <p className="mt-2 text-gray-600">
        Antes de continuar, leia o resumo de privacidade e marque os
        consentimentos. Você pode revogar ou exportar dados a qualquer
        momento.
      </p>
      <CreateChildForm />
    </div>
  );
}
