'use client';

// =============================================================
// CreateChildForm — server action + useActionState
// =============================================================

import { useActionState } from 'react';
import { createChildAction } from '@/features/children/actions';

const initialState: { error?: string; ok?: boolean } = {};

export function CreateChildForm() {
  const [state, formAction, isPending] = useActionState(
    createChildAction,
    initialState,
  );

  const currentYear = new Date().getFullYear();

  return (
    <form action={formAction} className="mt-8 space-y-6">
      {state.error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      ) : null}

      <fieldset className="space-y-4">
        <legend className="text-lg font-medium">Dados da criança</legend>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            Apelido (não use nome completo)
          </span>
          <input
            name="displayName"
            type="text"
            required
            maxLength={40}
            className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2"
            placeholder="Ex: Lia"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            Ano de nascimento
          </span>
          <input
            name="birthYear"
            type="number"
            required
            min={currentYear - 14}
            max={currentYear}
            className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2"
            placeholder="Ex: 2020"
          />
          <span className="mt-1 block text-xs text-gray-500">
            Só o ano — não pedimos dia ou mês (LGPD).
          </span>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            Mão preferida (opcional)
          </span>
          <select
            name="handPreference"
            className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2"
            defaultValue=""
          >
            <option value="">Prefiro não informar</option>
            <option value="right">Direita</option>
            <option value="left">Esquerda</option>
          </select>
        </label>
      </fieldset>

      <fieldset className="space-y-3 rounded-2xl border border-purple-200 bg-purple-50 p-6">
        <legend className="px-2 text-sm font-medium text-purple-900">
          Consentimento (LGPD)
        </legend>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="consentBasic"
            required
            className="mt-1"
          />
          <span className="text-sm text-purple-900">
            <strong>Obrigatório:</strong> autorizo o tratamento dos dados
            mínimos necessários para o funcionamento do app (apelido, ano
            de nascimento, progresso). Sem isso o perfil não pode ser
            criado.
          </span>
        </label>

        <label className="flex items-start gap-3">
          <input type="checkbox" name="consentImprovement" className="mt-1" />
          <span className="text-sm text-purple-900">
            <strong>Opcional:</strong> autorizo o uso de dados agregados e
            anônimos para melhorar o produto.
          </span>
        </label>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="consentCommunications"
            className="mt-1"
          />
          <span className="text-sm text-purple-900">
            <strong>Opcional:</strong> aceito receber novidades sobre o
            Nexus Kids Academy por email.
          </span>
        </label>
      </fieldset>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-purple-700 px-6 py-3 font-medium text-white disabled:opacity-60"
      >
        {isPending ? 'Criando…' : 'Criar perfil'}
      </button>
    </form>
  );
}
