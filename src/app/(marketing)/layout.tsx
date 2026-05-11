// =============================================================
// (marketing) layout — público, não-autenticado
// =============================================================

import type { ReactNode } from 'react';

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="min-h-dvh bg-white text-gray-900">{children}</div>;
}
