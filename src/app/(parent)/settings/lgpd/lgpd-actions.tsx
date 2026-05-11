'use client';

// =============================================================
// LgpdActions — export + erasure UI por criança
// =============================================================

import { useState } from 'react';

interface Props {
  childId: string;
  displayName: string;
}

export function LgpdActions({ childId, displayName }: Props) {
  const [busy, setBusy] = useState<'export' | 'erasure' | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleExport() {
    setBusy('export');
    setFeedback(null);
    try {
      const res = await fetch('/api/lgpd/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ childId }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nexus-kids-${childId}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setFeedback('Download iniciado.');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'erro';
      setFeedback(`Falha: ${msg}`);
    } finally {
      setBusy(null);
    }
  }

  async function handleErasure() {
    const ok = window.confirm(
      `Confirma a remoção permanente dos dados de ${displayName}? ` +
        `Você terá 30 dias para reverter entrando em contato com o suporte.`,
    );
    if (!ok) return;
    const reason = window.prompt(
      'Por que está removendo? (opcional, ajuda a melhorar)',
    );

    setBusy('erasure');
    setFeedback(null);
    try {
      const res = await fetch('/api/lgpd/erasure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ childId, reason: reason ?? undefined }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      const body = await res.json();
      setFeedback(
        `Solicitação registrada. Remoção definitiva em ${new Date(
          body.hardDeleteScheduledFor,
        ).toLocaleDateString('pt-BR')}.`,
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'erro';
      setFeedback(`Falha: ${msg}`);
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={handleExport}
        disabled={busy !== null}
        className="rounded-full border border-purple-700 px-4 py-2 text-sm font-medium text-purple-700 disabled:opacity-60"
      >
        {busy === 'export' ? 'Preparando…' : 'Exportar dados'}
      </button>
      <button
        type="button"
        onClick={handleErasure}
        disabled={busy !== null}
        className="rounded-full border border-red-600 px-4 py-2 text-sm font-medium text-red-600 disabled:opacity-60"
      >
        {busy === 'erasure' ? 'Solicitando…' : 'Apagar permanentemente'}
      </button>
      {feedback ? (
        <p className="self-center text-sm text-gray-700">{feedback}</p>
      ) : null}
    </div>
  );
}
