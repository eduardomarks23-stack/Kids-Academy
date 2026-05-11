'use client';

// =============================================================
// CreateChildForm — multi-step com calibração (Curiosos 3-4)
// =============================================================
// Step 1: dados básicos
// Step 2: consentimento LGPD
// Step 3: calibração inicial (3 perguntas)
// =============================================================

import { useActionState, useState } from 'react';
import { createChildAction } from '@/features/children/actions';

const initialState: { error?: string; ok?: boolean } = {};

export function CreateChildForm() {
  const [state, formAction, isPending] = useActionState(
    createChildAction,
    initialState,
  );
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const currentYear = new Date().getFullYear();

  return (
    <form action={formAction} className="mt-8 space-y-6">
      {state.error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      ) : null}

      <nav className="flex items-center gap-3 text-xs text-gray-500">
        <StepDot active={step === 1} done={step > 1} label="Dados" />
        <StepDot active={step === 2} done={step > 2} label="Consentimento" />
        <StepDot active={step === 3} done={false} label="Calibração" />
      </nav>

      {/* Step 1: Dados básicos */}
      <fieldset
        className="space-y-4"
        style={{ display: step === 1 ? 'block' : 'none' }}
      >
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
            placeholder="Ex: 2022"
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

        <button
          type="button"
          onClick={() => setStep(2)}
          className="rounded-full bg-purple-700 px-6 py-3 text-sm font-medium text-white"
        >
          Próximo →
        </button>
      </fieldset>

      {/* Step 2: Consentimento */}
      <fieldset
        className="space-y-3 rounded-2xl border border-purple-200 bg-purple-50 p-6"
        style={{ display: step === 2 ? 'block' : 'none' }}
      >
        <legend className="px-2 text-sm font-medium text-purple-900">
          Consentimento (LGPD)
        </legend>

        <label className="flex items-start gap-3">
          <input type="checkbox" name="consentBasic" required className="mt-1" />
          <span className="text-sm text-purple-900">
            <strong>Obrigatório:</strong> autorizo o tratamento dos dados
            mínimos necessários para o funcionamento do app (apelido, ano de
            nascimento, progresso). Sem isso o perfil não pode ser criado.
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
            <strong>Opcional:</strong> aceito receber novidades sobre o Nexus
            Kids Academy por email.
          </span>
        </label>

        <p className="mt-2 text-xs text-purple-800">
          <a
            href="/legal/privacy-pt-BR.md"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Ler política de privacidade completa
          </a>
        </p>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="rounded-full border border-purple-300 px-6 py-3 text-sm font-medium text-purple-700"
          >
            ← Voltar
          </button>
          <button
            type="button"
            onClick={() => setStep(3)}
            className="rounded-full bg-purple-700 px-6 py-3 text-sm font-medium text-white"
          >
            Próximo →
          </button>
        </div>
      </fieldset>

      {/* Step 3: Calibração */}
      <fieldset
        className="space-y-4"
        style={{ display: step === 3 ? 'block' : 'none' }}
      >
        <legend className="text-lg font-medium">Calibração inicial</legend>
        <p className="text-sm text-gray-600">
          3 perguntas curtas — ajudam o Garuzinho e a Lolinha a saber por onde
          começar. Tudo pode mudar depois.
        </p>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            Ela já reconhece números até quanto?
          </span>
          <select
            name="calibrationNumbers"
            className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2"
            defaultValue="nao_sei"
          >
            <option value="nao_sei">Não sei dizer ainda</option>
            <option value="ate_3">Até 3</option>
            <option value="ate_5">Até 5</option>
            <option value="ate_10">Até 10</option>
            <option value="mais_de_10">Mais de 10</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            Ela já fala todas as cores básicas?
          </span>
          <select
            name="calibrationColors"
            className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2"
            defaultValue="nao_sei"
          >
            <option value="nao_sei">Não sei dizer ainda</option>
            <option value="poucas">Reconhece poucas</option>
            <option value="basicas">As 4 básicas (vermelho, azul, amarelo, verde)</option>
            <option value="muitas">Muitas cores</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            Ela já reconhece algumas letras?
          </span>
          <select
            name="calibrationLetters"
            className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2"
            defaultValue="nao_sei"
          >
            <option value="nao_sei">Não sei dizer ainda</option>
            <option value="nenhuma">Nenhuma</option>
            <option value="algumas">Algumas vogais</option>
            <option value="todas_vogais">Todas as vogais</option>
            <option value="varias_consoantes">Vogais + várias consoantes</option>
          </select>
        </label>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700"
          >
            ← Voltar
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-[#E26B45] px-6 py-3 font-medium text-white disabled:opacity-60"
          >
            {isPending ? 'Criando…' : 'Criar perfil'}
          </button>
        </div>
      </fieldset>
    </form>
  );
}

function StepDot({
  active,
  done,
  label,
}: {
  active: boolean;
  done: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
          active
            ? 'bg-[#E26B45] text-white'
            : done
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-500'
        }`}
      >
        {done ? '✓' : ''}
      </span>
      <span className={active ? 'font-medium text-[#E26B45]' : ''}>{label}</span>
    </div>
  );
}
